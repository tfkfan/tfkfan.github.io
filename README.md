# Artem Baltser — black IDE-style portfolio

A single-page, dependency-free portfolio built as a **slide deck with a terminal
accent**: seven full-screen sections, animated counters, command-style section
prompts, a command-line boot sequence and one black canvas. Available in
**English, Spanish, German, French and Portuguese** — the visitor's browser
language is detected, and the choice is remembered.

Content source: `CV_EN_Golang_V2.pdf` (Oct 2026) plus the open-source work
(Orbital, Tanks).

```
index.html                 # shell, SEO/OG meta, JSON-LD, boot overlay, no-JS fallback
styles/site.css            # design system, slides, motion, language menu, print styles
scripts/content.js         # identity, UI strings, metrics        (en·es·de·fr·pt)
scripts/content-services.js# the eight services and nine roles
scripts/content-rest.js    # stack and open-source work
scripts/app.js             # rendering, slide activation, counters, typing
assets/                    # favicon, social card, CV PDF, project screenshots
tools/og-card.html         # source of assets/og-card.png (re-render with headless Chrome)
serve.sh                   # local preview helper
```

### Adding a language

Two ways, both cheap:

* **Latin-script languages** — add an argument to `SITE.T(en, es, de, fr, pt, …)`
  and an entry in `SITE.langs`. German, Spanish, French and Portuguese work this way.
* **Anything else** — drop in an overlay file like `scripts/i18n-zh.js`: a plain
  object keyed by the **English source string**, registered as
  `SITE.i18n.<code>`. The lookup in `t()` checks the language slot first, then the
  overlay, then falls back to English, so a missing entry degrades to English
  instead of rendering an empty element. Chinese and Japanese work this way, which
  is why they needed no changes to the 219 existing strings.

A quick coverage check (should list only language-neutral strings such as date
ranges):

```js
// in the console, after the page loads
Object.keys(SITE.i18n.zh).length   // translated entries
```

## Run it

```bash
./serve.sh          # → http://127.0.0.1:8080
```

No build step and no `node_modules`; opening `index.html` from disk also works.

## Deploy

Any static host — copy `index.html`, `styles/`, `scripts/`, `assets/`,
`robots.txt`, `sitemap.xml`, `site.webmanifest` (e.g. to a GitHub Pages branch).
Update the canonical URL and `sitemap.xml` if the domain changes.

## The seven slides

| # | Prompt | Content |
| --- | --- | --- |
| 1 | `whoami` | Name, rotating role, one-line pitch, five CTAs |
| 2 | `./impact --summary` | Eight animated counters + a company marquee |
| 3 | `services --list` | Eight services, each expanding to bullets, proof and stack |
| 4 | `career --timeline` | Nine roles, newest first, each expanding to what changed |
| 5 | `skills --all` | Six stack groups, live filter, click a technology for where it shipped |
| 6 | `open --projects` | Orbital, Tanks and asyncapi-generator cards with links |
| 7 | `contact --now` | Direct channels, brief form that builds an email |

## Interactivity

* **Language menu** in the top bar: five languages, detected from the browser on
  first visit and stored in `localStorage`; the whole deck re-renders instantly.
* **Slides** snap on scroll, activate with staggered slide-in animations, and
  type their own prompt line when they come into view; rail dots and arrow keys
  (↑/↓, PageUp/PageDown, Home/End) navigate.
* **Counters** count up every time the numbers slide is entered.
* **Rows and timeline entries** expand in place (grid-rows animation).
* **Skills** filter as you type and reveal where each technology shipped.
* **Marquee** of companies scrolls continuously, pausing on hover.
* Copy-to-clipboard toasts in the brief builder, a mail-client form that composes
  the email for you, a print/PDF stylesheet, and a five-language switch that
  re-renders everything.

## Accessibility & performance

* Semantic landmarks, `aria-expanded` on every expander, focus-visible rings,
  skip link, `?`-free keyboard-only navigation.
* `prefers-reduced-motion` disables the boot animation, typing, counters,
  transitions and scroll snapping — everything still appears, immediately.
* No frameworks and no webfont blocking; screenshots are pre-optimised WebP and
  lazy-load; the whole site is under 250 KB excluding images and the CV.
* Without JavaScript a `<noscript>` summary with the CV link and contact details is still shown.

## Mobile hardening (why the code looks paranoid)

* **No `will-change`** on reveal elements. Wrapping 46 elements in their own GPU
  layer exhausts layer memory on phones, which shows up as unpainted (black)
  regions that never reproduce on a desktop or in a headless test.
* **No `backdrop-filter`** on the fixed top bar — blur + `position: fixed` over a
  very long page is a known iOS Safari paint bug; on black it looks identical.
* **No scroll snapping below 860 px**: sections are two to three screens tall on
  a phone, where snapping is quirky on both iOS and Android.
* **Tracking listens to `scroll`, `touchstart`, `touchmove` and `wheel`** (phones
  throttle `scroll` during momentum scrolling), plus `resize`, `pageshow`
  (back-forward cache), `orientationchange` and `visibilitychange`, plus a 350 ms
  poll.
* **Two fail-safes**: any uncaught error reveals the whole page and force-hides
  the boot overlay; and if the tracker never ran at all after 3 s, everything is
  revealed too. Content can never stay invisible.
* **Cache busting**: `index.html` requests every asset with `?v=N`, and `<html
  data-build="N">` plus `window.PORTFOLIO_BUILD` identify the running build.
  Bump both when you deploy, or a phone will happily keep running the old bundle.

Sections carry two independent states: `is-active` (has been on screen — never
removed) and the rail/typing/counters, which follow `trackSlides()`'s idea of the
current section (the last one whose top passed 35 % of the viewport).

## How the reveal works (worth knowing before editing)

Each section carries two independent states:

* `is-active` — the section has been on screen at least once. It is **never
  removed**, so content cannot vanish while it is still visible (a tall section
  spans two or three phone screens; a threshold-based reveal used to hide it as
  soon as the next section peeked in — the "long black screen" bug).
* rail highlight / typing / counters follow the *current* section only, computed
  by `trackSlides()` from the section that has passed the reading line at 35% of
  the viewport height. That works for any section height, unlike a percentage
  visibility threshold.

`trackSlides()` runs on scroll (throttled with a timer, not rAF, so it still
fires when animation frames are throttled), on resize, and on a 350 ms poll as a
safety net for environments that swallow scroll events.

## Suggested next steps

1. **Photo** — drop a portrait in `assets/` and it can go next to the name.
2. **Testimonials** — the strongest missing conversion element; needs two or
   three real quotes from GitLab/Siemens/N26 people.
3. **Booking link** — a Cal.com/Calendly button next to "hire me".
4. **Rates or a fixed-price entry point** — e.g. "2-week architecture review".
5. **Analytics** — see which slides clients actually reach; that data should
   drive the next iteration.
