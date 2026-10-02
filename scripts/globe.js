/* =============================================================================
   globe.js — the spinning Earth on the hero slide.

   Canvas 2D, no dependencies. 21 500 land points from earth-data.js (1° grid)
   drawn as anti-aliased sprites, with an orthographic projection, a 16° axial
   tilt, a 22° roll so the axis leans to the right, an atmosphere halo, a
   terminator, a graticule, a starfield and city markers.

   Budget: 60 fps target, device pixel ratio capped at 2, and a stride that
   adapts to the measured frame cost (so phones draw a coarser globe). The loop
   stops entirely when the hero is off screen or the tab is hidden, and under
   prefers-reduced-motion only one static frame is drawn.
   ========================================================================== */

(function () {
  var CITIES = [
    { name: 'London', lat: 51.51, lon: -0.13 },
    { name: 'Berlin', lat: 52.52, lon: 13.40 },
    { name: 'Barcelona', lat: 41.39, lon: 2.17 }
  ];

  var DEG = Math.PI / 180;
  var TILT = 16 * DEG;         /* northern hemisphere towards the viewer */
  var ROLL = -22 * DEG;        /* slants the planet to the right */
  var SPIN = 0.15;             /* radians per second → ~42 s per revolution */
  var MAX_FPS = 60;
  var BUCKETS = 10;            /* alpha steps: one globalAlpha change each */
  var COS_ROLL = Math.cos(ROLL), SIN_ROLL = Math.sin(ROLL);
  var COS_TILT = Math.cos(TILT), SIN_TILT = Math.sin(TILT);

  var g = {
    canvas: null,
    ctx: null,
    dpr: 1,
    size: 0,
    points: null,
    sprite: null,
    buckets: null,
    stars: null,
    angle: 0,
    stride: 1,
    dotSize: 3,
    running: false,
    raf: null,
    last: 0,
    acc: 0,
    cost: 16,
    lastQualityCheck: 0,
    mounted: false
  };

  /* ---------------------------------------------------------------------------
     Data: land mask → point cloud (sin/cos precomputed so a frame needs no trig)
     ------------------------------------------------------------------------ */
  function buildPoints() {
    var earth = SITE.earth;
    if (!earth || g.points) return;
    var raw = atob(earth.mask);
    var bytes = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

    var pts = [];
    var half = earth.step / 2;
    for (var row = 0; row < earth.rows; row++) {
      var lat = (90 - half - earth.step * row) * DEG;
      var sinLat = Math.sin(lat), cosLat = Math.cos(lat);
      for (var col = 0; col < earth.cols; col++) {
        var bit = row * earth.cols + col;
        if (!((bytes[bit >> 3] >> (7 - (bit & 7))) & 1)) continue;
        var lon = (-180 + half + earth.step * col) * DEG;
        pts.push({ sinLat: sinLat, cosLat: cosLat, sinLon: Math.sin(lon), cosLon: Math.cos(lon) });
      }
    }
    g.points = pts;
    g.buckets = [];
    for (var b = 0; b < BUCKETS; b++) g.buckets.push([]);
  }

  /* one soft dot, reused for every land point */
  function buildSprite() {
    var s = 32;
    var c = document.createElement('canvas');
    c.width = s; c.height = s;
    var x = c.getContext('2d');
    var grad = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(178, 255, 205, 1)');
    grad.addColorStop(0.42, 'rgba(150, 250, 190, 0.92)');
    grad.addColorStop(0.72, 'rgba(124, 240, 175, 0.42)');
    grad.addColorStop(1, 'rgba(110, 235, 170, 0)');
    x.fillStyle = grad;
    x.beginPath();
    x.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    x.fill();
    g.sprite = c;
  }

  function buildStars() {
    g.stars = [];
    for (var i = 0; i < 150; i++) {
      g.stars.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() < 0.86 ? 1 : 1.7,
        a: 0.1 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  /* ---------------------------------------------------------------------------
     Sizing and quality
     ------------------------------------------------------------------------ */
  function resize() {
    if (!g.canvas) return;
    var rect = g.canvas.getBoundingClientRect();
    var cssSize = Math.max(160, Math.round(Math.min(rect.width, rect.height)));
    g.dpr = Math.min(window.devicePixelRatio || 1, 2);
    g.size = cssSize;
    var px = Math.round(cssSize * g.dpr);
    if (g.canvas.width !== px) {
      g.canvas.width = px;
      g.canvas.height = px;
    }
    g.dotSize = Math.max(1.5, Math.min(3.4, cssSize / 210)) * g.dpr;
    g.stride = cssSize >= 560 ? 1 : cssSize >= 420 ? 2 : 3;
  }

  function adaptQuality(dtMs) {
    g.cost = g.cost * 0.8 + dtMs * 0.2;
    var now = Date.now();
    if (now - g.lastQualityCheck < 1200) return;
    var maxStride = g.size >= 560 ? 4 : 6;
    if (g.cost > 20 && g.stride < maxStride) { g.stride++; g.lastQualityCheck = now; }
    else if (g.cost < 9 && g.stride > 1) { g.stride--; g.lastQualityCheck = now; }
  }

  /* ---------------------------------------------------------------------------
     Projection: orthographic, then tilt, then roll
     ------------------------------------------------------------------------ */
  function frameVectors() {
    return {
      cosA: Math.cos(g.angle), sinA: Math.sin(g.angle),
      cosT: COS_TILT, sinT: SIN_TILT,
      cosR: COS_ROLL, sinR: SIN_ROLL
    };
  }

  function place(x, y, z, f) {
    var y1 = y * f.cosT - z * f.sinT;
    var z1 = y * f.sinT + z * f.cosT;
    var xr = x * f.cosR - y1 * f.sinR;
    var yr = x * f.sinR + y1 * f.cosR;
    var R = g.size * 0.425 * g.dpr;
    return {
      x: g.ctx.canvas.width / 2 + xr * R,
      y: g.ctx.canvas.height / 2 - yr * R,
      z: z1,
      R: R
    };
  }

  function projectLatLon(lat, lon, f) {
    var la = lat * DEG, lo = lon * DEG;
    var sinLat = Math.sin(la), cosLat = Math.cos(la);
    var sl = Math.sin(lo) * f.cosA + Math.cos(lo) * f.sinA;
    var cl = Math.cos(lo) * f.cosA - Math.sin(lo) * f.sinA;
    return place(cosLat * sl, sinLat, cosLat * cl, f);
  }

  /* ---------------------------------------------------------------------------
     Drawing
     ------------------------------------------------------------------------ */
  function drawStars(t) {
    var ctx = g.ctx, w = ctx.canvas.width, h = ctx.canvas.height;
    ctx.fillStyle = '#fff';
    for (var i = 0; i < g.stars.length; i++) {
      var s = g.stars[i];
      ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(t * 0.5 + s.tw));
      ctx.fillRect(s.x * w, s.y * h, s.r * g.dpr, s.r * g.dpr);
    }
    ctx.globalAlpha = 1;
  }

  function drawBody(f) {
    var ctx = g.ctx;
    var c = place(0, 0, 0, f);
    var R = c.R;

    var halo = ctx.createRadialGradient(c.x, c.y, R * 0.9, c.x, c.y, R * 1.18);
    halo.addColorStop(0, 'rgba(80, 200, 255, 0.24)');
    halo.addColorStop(1, 'rgba(80, 200, 255, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(c.x, c.y, R * 1.18, 0, Math.PI * 2);
    ctx.fill();

    var grad = ctx.createRadialGradient(c.x - R * 0.35, c.y - R * 0.4, R * 0.03, c.x, c.y, R);
    grad.addColorStop(0, 'rgba(60, 140, 158, 0.55)');
    grad.addColorStop(0.45, 'rgba(24, 66, 78, 0.5)');
    grad.addColorStop(0.8, 'rgba(8, 26, 32, 0.44)');
    grad.addColorStop(1, 'rgba(4, 10, 14, 0.5)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
    ctx.fill();

    var shade = ctx.createLinearGradient(c.x - R * 0.75, c.y - R * 0.75, c.x + R, c.y + R);
    shade.addColorStop(0, 'rgba(0,0,0,0)');
    shade.addColorStop(0.6, 'rgba(0,0,0,0)');
    shade.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.save();
    ctx.beginPath();
    ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = shade;
    ctx.fillRect(c.x - R, c.y - R, R * 2, R * 2);
    ctx.restore();

    ctx.strokeStyle = 'rgba(120, 235, 190, 0.34)';
    ctx.lineWidth = Math.max(1, g.dpr * 1.2);
    ctx.beginPath();
    ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawGraticule(f) {
    var ctx = g.ctx;
    ctx.strokeStyle = 'rgba(180, 230, 255, 0.10)';
    ctx.lineWidth = Math.max(1, g.dpr * 0.8);
    var lat, lon, p, started;
    for (lat = -60; lat <= 60; lat += 30) {
      started = false;
      ctx.beginPath();
      for (lon = -180; lon <= 180; lon += 3) {
        p = projectLatLon(lat, lon, f);
        if (p.z <= 0.02) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (lon = -180; lon < 180; lon += 30) {
      started = false;
      ctx.beginPath();
      for (lat = -90; lat <= 90; lat += 3) {
        p = projectLatLon(lat, lon, f);
        if (p.z <= 0.02) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
  }

  function drawLand(f) {
    var ctx = g.ctx, pts = g.points, n = pts.length;
    var b, arr;
    for (b = 0; b < BUCKETS; b++) g.buckets[b].length = 0;

    var half = g.dotSize / 2;
    var stride = g.stride;
    for (var i = 0; i < n; i += stride) {
      var pt = pts[i];
      var sl = pt.sinLon * f.cosA + pt.cosLon * f.sinA;
      var cl = pt.cosLon * f.cosA - pt.sinLon * f.sinA;
      var z = pt.cosLat * cl;
      if (z <= 0.02) continue;
      var p = place(pt.cosLat * sl, pt.sinLat, z, f);
      var limb = z < 0.28 ? z / 0.28 : 1;
      var alpha = (0.34 + 0.66 * z) * limb;
      b = (alpha * (BUCKETS - 1)) | 0;
      g.buckets[b].push(p.x - half, p.y - half);
    }

    for (b = 0; b < BUCKETS; b++) {
      arr = g.buckets[b];
      if (!arr.length) continue;
      ctx.globalAlpha = 0.14 + 0.86 * (b / (BUCKETS - 1));
      for (var j = 0; j < arr.length; j += 2) {
        ctx.drawImage(g.sprite, arr[j], arr[j + 1], g.dotSize, g.dotSize);
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawCities(f, t) {
    var ctx = g.ctx;
    var showLabels = g.size >= 520;
    var pulse = (t % 2.6) / 2.6;
    for (var i = 0; i < CITIES.length; i++) {
      var c = CITIES[i];
      var p = projectLatLon(c.lat, c.lon, f);
      if (p.z <= 0.12) continue;
      var fade = Math.min(1, p.z / 0.35);

      ctx.fillStyle = 'rgba(74, 222, 128,' + (0.95 * fade).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.8 * g.dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(74, 222, 128,' + (0.5 * fade * (1 - pulse)).toFixed(3) + ')';
      ctx.lineWidth = Math.max(1, g.dpr);
      ctx.beginPath();
      ctx.arc(p.x, p.y, (4 + pulse * 18) * g.dpr, 0, Math.PI * 2);
      ctx.stroke();

      if (!showLabels) continue;
      var lx = p.x + 11 * g.dpr, ly = p.y - 9 * g.dpr;
      ctx.strokeStyle = 'rgba(74, 222, 128,' + (0.45 * fade).toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(p.x + 3 * g.dpr, p.y - 3 * g.dpr);
      ctx.lineTo(lx, ly + 3 * g.dpr);
      ctx.stroke();
      ctx.font = (11 * g.dpr) + 'px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = 'rgba(255,255,255,' + (0.75 * fade).toFixed(3) + ')';
      ctx.fillText(c.name, lx + 3 * g.dpr, ly + 4 * g.dpr);
    }
  }

  function render(t) {
    var started = (window.performance || Date).now();
    var f = frameVectors();
    var ctx = g.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawStars(t);
    drawBody(f);
    drawGraticule(f);
    drawLand(f);
    drawCities(f, t);
    return (window.performance || Date).now() - started;
  }

  function draw(dt, t) {
    if (dt) g.angle += SPIN * dt;
    var cost = render(t);
    if (dt) adaptQuality(cost);
  }

  /* ---------------------------------------------------------------------------
     Loop
     ------------------------------------------------------------------------ */
  function loop(ts) {
    if (!g.running) return;
    g.raf = requestAnimationFrame(loop);
    if (!g.last) { g.last = ts; return; }
    var dt = (ts - g.last) / 1000;
    g.acc += dt;
    if (g.acc < 1 / MAX_FPS) return;
    g.last = ts;
    var step = Math.min(dt, 0.1);
    g.acc = 0;
    draw(step, ts / 1000);
  }

  function start() {
    if (!g.mounted || g.running) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(0, 0); return; }
    if (!window.requestAnimationFrame) { draw(0, 0); return; }
    g.running = true;
    g.last = 0;
    g.acc = 0;
    g.raf = requestAnimationFrame(loop);
  }

  function stop() {
    g.running = false;
    if (g.raf) cancelAnimationFrame(g.raf);
    g.raf = null;
  }

  /* ---------------------------------------------------------------------------
     Public API
     ------------------------------------------------------------------------ */
  SITE.globe = {
    mount: function (canvas) {
      if (!canvas || !canvas.getContext || !SITE.earth) return false;
      g.canvas = canvas;
      g.ctx = canvas.getContext('2d');
      buildPoints();
      if (!g.sprite) buildSprite();
      if (!g.stars) buildStars();
      resize();
      g.mounted = true;
      render(0);
      return true;
    },
    setActive: function (on) { on ? start() : stop(); },
    resize: function () { if (!g.mounted) return; resize(); render(0); },
    running: function () { return g.running; },
    ready: function () { return !!(g.points && g.points.length); },
    points: function () { return g.points ? g.points.length : 0; },
    stride: function () { return g.stride; },
    frameCost: function () { return Math.round(g.cost * 100) / 100; },
    angle: function () { return g.angle; },
    /* where a latitude/longitude lands on the canvas right now */
    project: function (lat, lon) {
      if (!g.mounted) return null;
      var f = frameVectors();
      var p = projectLatLon(lat, lon, f);
      return { x: p.x, y: p.y, z: p.z, cx: g.ctx.canvas.width / 2, cy: g.ctx.canvas.height / 2, r: p.R };
    },
    /* test hook: spin and redraw without the animation loop */
    step: function (dt) { if (g.mounted) draw(dt, g.angle * 20); }
  };

  window.addEventListener('resize', function () { SITE.globe.resize(); });
})();
