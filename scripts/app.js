/* =============================================================================
   app.js — rendering, slide deck, motion and the command bar.
   No frameworks. One page, seven slides, one black canvas.
   ========================================================================== */

(function () {
  var t = function (v) { return v == null ? '' : (typeof v === 'string' ? v : (v[SITE.lang] || v.en)); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  var attr = function (s) { return esc(s).replace(/"/g, '&quot;'); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; };

  var LANG_KEY = 'artem-lang';
  var state = { lang: 'en', index: -1, typed: {} };
  var slides = [];

  function resolveLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved && SITE.langs.some(function (l) { return l.id === saved; })) return saved;
    } catch (e) { /* private mode — fall through to the browser language */ }
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SITE.langs.some(function (l) { return l.id === nav; }) ? nav : 'en';
  }

  function langShort(id) {
    var found = SITE.langs.filter(function (l) { return l.id === id; })[0];
    return found ? found.short : 'EN';
  }

  /* ---------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  function toast(msg, kind) {
    var wrap = $('#toasts');
    var el = document.createElement('div');
    el.className = 'toast' + (kind ? ' toast--' + kind : '');
    el.innerHTML = '<span class="toast__p">$</span><span>' + esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add('is-out'); }, 2400);
    setTimeout(function () { el.remove(); }, 2750);
  }

  function copy(text) {
    function ok() { toast(t(SITE.ui.copied)); }
    function fail() { toast(t(SITE.ui.copyFailed), 'err'); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, legacy);
    } else { legacy(); }
    function legacy() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        var done = document.execCommand('copy');
        ta.remove();
        done ? ok() : fail();
      } catch (e) { fail(); }
    }
  }

  function mailto(subject, body) {
    var url = 'mailto:' + SITE.meta.email + '?subject=' + encodeURIComponent(subject || t(SITE.ui.mailSubject));
    if (body) url += '&body=' + encodeURIComponent(body);
    window.location.href = url;
  }

  /* ---------------------------------------------------------------------------
     Renderers
     ------------------------------------------------------------------------ */
  function renderChrome() {
    document.documentElement.lang = state.lang;
    $('#avail-text').textContent = t(SITE.ui.avail);
    $('#btn-lang').innerHTML = langShort(state.lang) + ' <i class="caret-d"></i>';
    $('#btn-lang').setAttribute('title', t(SITE.ui.langLabel));
    renderLangMenu();
    $('#btn-mail').textContent = t(SITE.ui.hire);
    $('#btn-mail').href = 'mailto:' + SITE.meta.email + '?subject=' + encodeURIComponent(t(SITE.ui.mailSubject));
    $('#impact-title').textContent = t(SITE.ui.impactTitle);
    $('#delivered-label').textContent = t(SITE.ui.delivered);
    $('#services-title').textContent = t(SITE.ui.servicesTitle);
    $('#services-lead').textContent = t(SITE.ui.servicesLead);
    $('#exp-title').textContent = t(SITE.ui.expTitle);
    $('#exp-lead').textContent = t(SITE.ui.expLead);
    $('#skills-title').textContent = t(SITE.ui.skillsTitle);
    $('#work-title').textContent = t(SITE.ui.workTitle);
    $('#contact-title').textContent = t(SITE.ui.contactTitle);
    $('#contact-lead').textContent = t(SITE.ui.contactLead);
    $('#foot').textContent = t(SITE.ui.foot);
    $('#skill-filter').placeholder = t(SITE.ui.skillsFilter);
    var hint = $('.scroll-hint span');
    if (hint) hint.textContent = t(SITE.ui.scroll);
  }

  function renderLangMenu() {
    var panel = $('#lang-panel');
    if (!panel) return;
    panel.innerHTML = SITE.langs.map(function (l) {
      return '<button class="langmenu__item' + (l.id === state.lang ? ' is-on' : '') + '" type="button" data-lang="' + l.id + '" role="menuitemradio" aria-checked="' + (l.id === state.lang) + '">' +
        '<span class="langmenu__short">' + l.short + '</span><span>' + l.label + '</span>' +
        (l.id === state.lang ? '<span class="langmenu__tick">✓</span>' : '') + '</button>';
    }).join('');
  }

  function setLang(id) {
    if (!SITE.langs.some(function (l) { return l.id === id; })) return false;
    state.lang = id;
    SITE.lang = id;
    document.documentElement.lang = id;
    try { localStorage.setItem(LANG_KEY, id); } catch (e) { /* ignore */ }
    closeLangMenu();
    renderAll();
    return true;
  }

  function openLangMenu() {
    var panel = $('#lang-panel');
    if (panel) { panel.hidden = false; $('#btn-lang').setAttribute('aria-expanded', 'true'); }
  }

  function closeLangMenu() {
    var panel = $('#lang-panel');
    if (panel) { panel.hidden = true; $('#btn-lang').setAttribute('aria-expanded', 'false'); }
  }

  function toggleLangMenu() {
    var panel = $('#lang-panel');
    if (!panel) return;
    panel.hidden ? openLangMenu() : closeLangMenu();
  }

  function renderHero() {
    $('#hero-pitch').textContent = t(SITE.meta.pitch);
    $('#hero-facts').textContent = t(SITE.meta.facts);

    var cta = $('#hero-cta');
    cta.innerHTML =
      '<a class="btn btn--solid" href="mailto:' + SITE.meta.email + '?subject=' + encodeURIComponent(t(SITE.ui.mailSubject)) + '">' + t(SITE.ui.sendEmail) + '<i class="arw">→</i></a>' +
      '<a class="btn btn--ghost" href="' + SITE.meta.github + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a class="btn btn--ghost" href="' + SITE.meta.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>';
  }

  function renderNumbers() {
    $('#counters').innerHTML = SITE.numbers.map(function (n, i) {
      return '<div class="counter reveal" style="--i:' + (2 + i) + '">' +
        '<div class="counter__v"><span class="counter__n" data-target="' + n.v + '">' + n.v + '</span><em>' + n.suffix + '</em></div>' +
        '<div class="counter__l">' + t(n.label) + '</div>' +
        '<div class="counter__s">' + t(n.sub) + '</div>' +
        '</div>';
    }).join('');

    var track = SITE.delivered.concat(SITE.delivered);
    $('#marquee').innerHTML = track.map(function (c) { return '<span class="marquee__item">' + c + '</span><span class="marquee__dot">◆</span>'; }).join('');
  }

  function renderServices() {
    $('#services').innerHTML = SITE.services.map(function (s, i) {
      return '<article class="row reveal-l" style="--i:' + (3 + i) + '">' +
        '<button class="row__head" type="button" aria-expanded="false">' +
          '<span class="row__n">' + s.n + '</span>' +
          '<span class="row__main">' +
            '<span class="row__title">' + t(s.title) + '</span>' +
            '<span class="row__one">' + t(s.one) + '</span>' +
          '</span>' +
          '<span class="row__plus" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="row__body"><div class="row__inner">' +
          '<p class="row__label">' + t(SITE.ui.more) + '</p>' +
          '<ul class="bl">' + s.bullets.map(function (b) { return '<li>' + t(b) + '</li>'; }).join('') + '</ul>' +
          '<p class="row__label">' + t(SITE.ui.proof) + '</p>' +
          '<p class="row__proof">' + t(s.proof) + '</p>' +
          '<div class="chips">' + s.chips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('') + '</div>' +
        '</div></div>' +
      '</article>';
    }).join('');
  }

  function renderExperience() {
    $('#timeline').innerHTML = SITE.experience.map(function (e, i) {
      return '<li class="tl reveal-l" style="--i:' + (3 + i) + '">' +
        '<div class="tl__rail"><span class="tl__dot"></span></div>' +
        '<div class="tl__body">' +
          '<button class="tl__head" type="button" aria-expanded="false">' +
            '<span class="tl__co">' + esc(e.company) + '</span>' +
            '<span class="tl__meta">' + t(e.when) + ' · ' + t(e.where) + '</span>' +
            '<span class="tl__role">' + t(e.role) + '</span>' +
            '<span class="tl__one">' + t(e.one) + '</span>' +
            '<span class="tl__metric">' + t(e.metric) + '</span>' +
            '<span class="row__plus" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="row__body"><div class="row__inner">' +
            '<ul class="bl">' + e.bullets.map(function (b) { return '<li>' + t(b) + '</li>'; }).join('') + '</ul>' +
          '</div></div>' +
        '</div>' +
      '</li>';
    }).join('');
  }

  function renderSkills() {
    var html = SITE.skills.map(function (g, i) {
      return '<div class="sgroup reveal" style="--i:' + (3 + i) + '" data-group="' + g.key + '">' +
        '<div class="sgroup__head"><span class="sgroup__name">' + esc(t(g.label)) + '</span><span class="sgroup__count" data-count-for="' + g.key + '">' + g.items.length + '</span></div>' +
        '<div class="chips">' + g.items.map(function (it) {
          return '<button class="chip chip--btn" type="button" data-skill="' + attr(it.n) + '" data-where="' + attr(it.where ? t(it.where) : '') + '">' + esc(it.n) + '</button>';
        }).join('') + '</div>' +
      '</div>';
    }).join('');
    html += '<div class="sgroup sgroup--wide reveal" style="--i:9"><div class="sgroup__head"><span class="sgroup__name">' + esc(t(SITE.toolboxLabel)) + '</span></div>' +
      '<div class="chips">' + SITE.toolbox.map(function (c) { return '<span class="chip chip--dim">' + esc(c) + '</span>'; }).join('') + '</div></div>';
    $('#skill-groups').innerHTML = html;
    updateSkillCount();
  }

  function renderWork() {
    $('#work-grid').innerHTML = SITE.work.map(function (w, i) {
      return '<article class="wcard reveal" style="--i:' + (2 + i) + '">' +
        (w.img ? '<div class="wcard__shot"><img src="' + w.img + '" alt="' + esc(w.title) + '" loading="lazy" decoding="async" /></div>' : '<div class="wcard__shot wcard__shot--code"><span class="wcard__prompt">$</span><span>vert.x · netty · rooms · matchmaking</span></div>') +
        '<h3 class="wcard__title">' + esc(w.title) + '</h3>' +
        '<p class="wcard__desc">' + t(w.desc) + '</p>' +
        '<p class="wcard__meta">' + esc(w.meta) + '</p>' +
        '<div class="wcard__links">' + w.links.map(function (l) {
          return '<a class="link" href="' + l.href + '" target="_blank" rel="noopener">' + t(l.t) + ' ↗</a>';
        }).join('') + '</div>' +
      '</article>';
    }).join('');
  }

  function renderContact() {
    var rows = [
      { k: 'email', v: SITE.meta.email, mail: true },
      { k: 'linkedin', v: 'linkedin.com/in/tfkfan', href: SITE.meta.linkedin },
      { k: 'github', v: 'github.com/tfkfan', href: SITE.meta.github },
      { k: 'location', v: t(SITE.meta.location) + ' · ' + t(SITE.meta.permit) },
      { k: 'status', v: t(SITE.meta.remote) }
    ];
    $('#contact-links').innerHTML = rows.map(function (r) {
      var inner = '<span class="cl__k">' + r.k + '</span>';
      if (r.mail) {
        inner += '<a class="cl__v" href="mailto:' + r.v + '?subject=' + encodeURIComponent(t(SITE.ui.mailSubject)) + '">' + esc(r.v) +
          ' <span class="cl__hint">' + t(SITE.ui.sendEmail) + ' ↗</span></a>';
      } else if (r.href) {
        inner += '<a class="cl__v" href="' + r.href + '" target="_blank" rel="noopener">' + esc(r.v) + ' ↗</a>';
      } else {
        inner += '<span class="cl__v">' + esc(r.v) + '</span>';
      }
      return '<div class="cl">' + inner + '</div>';
    }).join('');

    $('#brief').innerHTML =
      '<div class="field"><label for="f-name">' + t(SITE.ui.formName) + '</label><input id="f-name" type="text" autocomplete="name" /></div>' +
      '<div class="field"><label for="f-company">' + t(SITE.ui.formCompany) + '</label><input id="f-company" type="text" autocomplete="organization" /></div>' +
      '<div class="field"><label for="f-email">' + t(SITE.ui.formEmail) + '</label><input id="f-email" type="email" autocomplete="email" /></div>' +
      '<div class="field"><label for="f-topic">' + t(SITE.ui.formTopic) + '</label><select id="f-topic">' +
        SITE.ui.topics.map(function (o) { return '<option>' + t(o) + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="field field--wide"><label for="f-msg">' + t(SITE.ui.formMsg) + '</label><textarea id="f-msg" rows="3"></textarea></div>' +
      '<div class="form__actions">' +
        '<button class="btn btn--solid" type="submit">' + t(SITE.ui.formSend) + '<i class="arw">→</i></button>' +
        '<button class="btn" type="button" data-copy-brief>' + t(SITE.ui.formCopy) + '</button>' +
        '<span class="form__hint">' + t(SITE.ui.formHint) + '</span>' +
      '</div>';
  }

  function renderRail() {
    slides = $$('.slide');
    var labels = slides.map(function (s) { return s.getAttribute('data-slide'); });
    $('#rail').innerHTML = slides.map(function (s, i) {
      return '<button class="rail__item' + (i === 0 ? ' is-active' : '') + '" type="button" data-goto="' + i + '" aria-label="' + labels[i] + '">' +
        '<span class="rail__label">' + labels[i] + '</span><span class="rail__dot"></span></button>';
    }).join('');
  }

  function renderAll() {
    renderChrome();
    renderHero();
    renderNumbers();
    renderServices();
    renderExperience();
    renderSkills();
    renderWork();
    renderContact();
    renderRail();
    state.typed = {};
    reobserve();
    activate(slides[state.index >= 0 ? state.index : 0], true);
  }

  /* ---------------------------------------------------------------------------
     Motion: reveals, typed commands, counters

     Two separate states on purpose:
       revealed  — the slide has been on screen at least once (never removed, so
                   content can never disappear while it is still visible)
       current   — the slide the reader is on right now (rail, typing, counters)
     ------------------------------------------------------------------------ */
  var revealed = {};

  function reveal(slide) {
    var i = slides.indexOf(slide);
    if (i === -1 || revealed[i]) return;
    revealed[i] = true;
    slide.classList.add('is-active');
  }

  function activate(slide, force) {
    var idx = slides.indexOf(slide);
    if (idx === -1) return;
    reveal(slide);
    if (!force && idx === state.index) return;
    state.index = idx;
    $$('.rail__item').forEach(function (b, i) { b.classList.toggle('is-active', i === idx); });
    typeCmd(slide, force);
    if (slide.querySelector('.counter')) runCounters(slide);
  }

  /* Which slide is the reader on? The last one whose top has passed the reading
     line. This works for any slide height — including sections far taller than
     the phone viewport, where a percentage threshold would never be reached. */
  function trackSlides() {
    if (!slides.length) return;
    var vh = window.innerHeight;
    var line = vh * 0.35;
    var current = slides[0];
    slides.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > vh * 0.15) reveal(s);
      if (r.top <= line) current = s;
    });
    if (current !== slides[state.index]) activate(current);
  }

  function typeCmd(slide, force) {
    var el = slide.querySelector('.cmd__t');
    if (!el) return;
    var text = el.getAttribute('data-type') || '';
    var key = slide.getAttribute('data-slide') + ':' + state.lang;
    if (!force && state.typed[key]) { el.textContent = text; return; }
    state.typed[key] = true;
    if (reduced()) { el.textContent = text; return; }
    el.textContent = '';
    var i = 0;
    (function tick() {
      if (!slide.classList.contains('is-active')) return;
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 34 + Math.random() * 26);
    })();
  }

  function runCounters(slide) {
    var nodes = $$('.counter__n', slide);
    var raf = window.requestAnimationFrame;
    nodes.forEach(function (n, i) {
      var target = parseFloat(n.getAttribute('data-target'));
      /* The number is already printed in the markup: only animate when we can,
         and always land on the real value. */
      if (reduced() || !raf) { n.textContent = String(target); return; }
      n.textContent = '0';
      setTimeout(function () {
        var start = null;
        var dur = 1100;
        raf(function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          n.textContent = String(Math.round(target * eased));
          if (p < 1) raf(step);
        });
        setTimeout(function () { n.textContent = String(target); }, dur + 400);
      }, i * 60);
    });
  }

  function reobserve() {
    /* Re-apply what has already been revealed (used after a language switch),
       then let the scroll tracker take over. */
    slides.forEach(function (s, i) { if (revealed[i]) s.classList.add('is-active'); });
    trackSlides();
  }

  /* ---------------------------------------------------------------------------
     Interaction
     ------------------------------------------------------------------------ */
  function goTo(i) {
    var s = slides[i];
    if (!s) return;
    activate(s);
    s.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  }

  function bind() {
    document.addEventListener('click', function (e) {
      var langItem = e.target.closest('[data-lang]');
      if (langItem) {
        var id = langItem.getAttribute('data-lang');
        if (setLang(id)) {
          var found = SITE.langs.filter(function (l) { return l.id === id; })[0];
          toast(found ? found.label : id);
        }
        return;
      }
      if (e.target.closest('#btn-lang')) { e.preventDefault(); toggleLangMenu(); return; }
      if (!e.target.closest('#lang-panel')) closeLangMenu();

      var copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) { copy(copyBtn.getAttribute('data-copy')); return; }

      var briefCopy = e.target.closest('[data-copy-brief]');
      if (briefCopy) { var m = briefData(); copy(SITE.meta.email + '\n' + m.subject + '\n\n' + m.body); return; }

      var goto = e.target.closest('[data-goto]');
      if (goto) { goTo(parseInt(goto.getAttribute('data-goto'), 10)); return; }

      var skill = e.target.closest('[data-skill]');
      if (skill) {
        $$('.chip--btn').forEach(function (c) { c.classList.remove('is-on'); });
        skill.classList.add('is-on');
        var note = $('#skill-note');
        var where = skill.getAttribute('data-where');
        note.hidden = false;
        note.innerHTML = '<span class="skill-note__n">' + esc(skill.getAttribute('data-skill')) + '</span>' + esc(where || t(SITE.ui.skillNote));
        return;
      }

      var head = e.target.closest('.row__head, .tl__head');
      if (head) {
        var item = head.closest('.row, .tl');
        var open = item.classList.toggle('is-open');
        head.setAttribute('aria-expanded', String(open));
        return;
      }

      var link = e.target.closest('a[href^="#"]');
      if (link) {
        var target = $(link.getAttribute('href'));
        if (target && target.classList.contains('slide')) { e.preventDefault(); goTo(slides.indexOf(target)); }
      }
    });

    $('#brief').addEventListener('submit', function (e) {
      e.preventDefault();
      var m = briefData();
      mailto(m.subject, m.body);
    });

    $('#skill-filter').addEventListener('input', function (e) {
      var q = e.target.value.trim().toLowerCase();
      $$('#skill-groups .chip').forEach(function (c) {
        var hit = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
        c.classList.toggle('is-dim', !hit);
      });
      $$('#skill-groups .sgroup').forEach(function (g) {
        var any = $$('.chip:not(.is-dim)', g).length > 0;
        g.classList.toggle('is-faded', !any);
      });
      updateSkillCount();
    });

    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === 'Escape') { closeLangMenu(); document.activeElement.blur(); return; }
      if (typing) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(Math.min(state.index + 1, slides.length - 1)); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(Math.max(state.index - 1, 0)); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
    });

    /* Scroll is throttled with a timer rather than rAF: it coalesces bursts the
       same way but still runs when animation frames are throttled (background
       tabs, battery savers, headless), so a section can never stay hidden. */
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      setTimeout(function () {
        ticking = false;
        trackSlides();
        updateProgress();
      }, 16);
    }, { passive: true });

    window.addEventListener('resize', function () { trackSlides(); updateProgress(); });

    /* Safety net: some environments swallow scroll events (embedded webviews,
       background tabs, scripted scrolling). A slow poll guarantees a section can
       never stay invisible — seven rectangle reads twice a second is nothing. */
    setInterval(function () {
      if (!document.hidden) trackSlides();
    }, 350);
  }

  function updateProgress() {
    var bar = $('#progress-bar');
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }

  function updateSkillCount() {
    var total = 0;
    var shown = 0;
    $$('.sgroup').forEach(function (g) {
      var label = g.getAttribute('data-group');
      var chips = $$('.chip', g);
      total += chips.length;
      shown += $$('.chip:not(.is-dim)', g).length;
      var out = label ? $('[data-count-for="' + label + '"]', g) : null;
      if (out) out.textContent = $$('.chip:not(.is-dim)', g).length;
    });
    var badge = $('#skill-count');
    if (badge) badge.textContent = shown + '/' + total;
  }

  function briefData() {
    var name = $('#f-name').value.trim();
    var company = $('#f-company').value.trim();
    var email = $('#f-email').value.trim();
    var topic = $('#f-topic').value;
    var message = $('#f-msg').value.trim();
    return {
      subject: t(SITE.ui.mailSubject) + ' — ' + topic,
      body: 'Name: ' + name + '\nCompany: ' + company + '\nEmail: ' + email + '\nTopic: ' + topic + '\n\n' + message + '\n'
    };
  }

  /* ---------------------------------------------------------------------------
     Boot — the command-line loader, kept on purpose
     ------------------------------------------------------------------------ */
  function boot() {
    var overlay = $('#boot');
    var log = $('#boot-log');
    var lines = SITE.ui.boot.map(function (l, i, arr) { return [t(l), i === arr.length - 1 ? 'ac' : 'ok']; });

    if (reduced() || !overlay) { if (overlay) overlay.hidden = true; return Promise.resolve(); }

    return new Promise(function (resolve) {
      var i = 0;
      (function next() {
        if (i >= lines.length) {
          setTimeout(function () {
            overlay.classList.add('is-out');
            setTimeout(function () { overlay.hidden = true; resolve(); }, 340);
          }, 200);
          return;
        }
        var l = lines[i++];
        var row = document.createElement('div');
        row.className = 'boot__row';
        row.innerHTML = '<span class="boot__p">➜</span><span class="boot__c">' + esc(l[0]) + '</span>' +
          '<span class="boot__ok">' + (l[1] === 'ok' ? '[  ok  ]' : '[ ready ]') + '</span>';
        log.appendChild(row);
        setTimeout(next, 110);
      })();
    });
  }

  /* ---------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */
  function init() {
    state.lang = resolveLang();
    SITE.lang = state.lang;
    document.documentElement.lang = state.lang;
    bind();
    boot().then(function () {
      renderAll();
      goTo(0);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
