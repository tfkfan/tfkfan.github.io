#!/usr/bin/env python3
"""Regenerate scripts/earth-data.js (land mask for the hero globe).

    python3 tools/make-earth-mask.py            # 2-degree grid (default)
    python3 tools/make-earth-mask.py 1          # 1-degree grid (4x the data)

Source: Natural Earth 110m land, public domain.
"""
import base64, json, sys, urllib.request

STEP = int(sys.argv[1]) if len(sys.argv) > 1 else 2
URL = ('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/'
       'geojson/ne_110m_land.geojson')

data = json.loads(urllib.request.urlopen(URL, timeout=60).read())
polys = []
for f in data['features']:
    g = f['geometry']
    if not g:
        continue
    for poly in (g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]):
        rings = [[(float(x), float(y)) for x, y in ring] for ring in poly]
        xs = [p[0] for r in rings for p in r]
        ys = [p[1] for r in rings for p in r]
        polys.append({'rings': rings, 'bbox': (min(xs), min(ys), max(xs), max(ys))})

COLS, ROWS = 360 // STEP, 180 // STEP
bits = bytearray((COLS * ROWS + 7) // 8)
land = 0
for row in range(ROWS):
    lat = 90 - STEP * row - STEP / 2
    for col in range(COLS):
        lon = -180 + STEP * col + STEP / 2
        hit = False
        for p in polys:
            x0, y0, x1, y1 = p['bbox']
            if lon < x0 or lon > x1 or lat < y0 or lat > y1:
                continue
            inside = False
            for r in p['rings']:
                n = len(r)
                for i in range(n):
                    x1_, y1_ = r[i]
                    x2_, y2_ = r[(i + 1) % n]
                    if (y1_ > lat) != (y2_ > lat):
                        if lon < (x2_ - x1_) * (lat - y1_) / (y2_ - y1_) + x1_:
                            inside = not inside
            if inside:
                hit = True
                break
        if hit:
            land += 1
            i = row * COLS + col
            bits[i >> 3] |= 1 << (7 - (i & 7))

b64 = base64.b64encode(bytes(bits)).decode()
out = f"""/* =============================================================================
   earth-data.js — land mask for the hero globe.
   Natural Earth 110m land (public domain), rasterised to a {COLS} x {ROWS} grid of
   {STEP}-degree cells and packed to one bit per cell ({len(bits) / 1024:.1f} KB of data, {len(b64) / 1024:.1f} KB of
   base64). Decoded by scripts/globe.js — row 0 is the north pole side.
   ========================================================================== */

(function () {{
  SITE.earth = {{
    cols: {COLS},
    rows: {ROWS},
    step: {STEP},
    mask: '{b64}'
  }};
}})();
"""
open('scripts/earth-data.js', 'w').write(out)
print(f'{COLS}x{ROWS} grid, {land} land cells, {len(bits)} bytes, {len(b64)} base64 chars')
