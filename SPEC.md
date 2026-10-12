# Full specification of the `tfkfan.github.io` site

> This document describes the site **as it is actually implemented in code** (as-built), not as `README.md` describes it.
> Every divergence between the code and the README is collected in [section 13](#13-discrepancies-dead-code-and-notes).
> Analysis date: the current state of the working copy of the repository (build `6`).

---

## 1. What this is

A personal portfolio site for **Artem Baltser — Backend Engineer** (Go, Java, distributed systems, high-load, event-driven).

| Property | Value |
| --- | --- |
| Type | Single-page static site (one page, 5 full-screen "slides") |
| Hosting | GitHub Pages (user repository `tfkfan.github.io`), canonical URL `https://tfkfan.github.io/` |
| Stack | Plain HTML + CSS + vanilla JavaScript (ES5 style). **No frameworks, no build step, no `node_modules`, no backend, no analytics or trackers** |
| Only external dependency | Google Fonts loading **one family — `Bungee`** (a single 400 face), with `preconnect` and `display=swap` |
| UI languages | 5: English, Español, Deutsch, Français, Português (switched client-side, no reload) |
| Size | 164 lines of HTML, 521 lines of CSS (~26.3 KB), 1137 lines of JS (~65.2 KB), nothing minified |
| Key trait | Content is **generated entirely by JavaScript** from `window.SITE`; the HTML only contains empty containers with `id`s |

Design concept: an "IDE stage" — a bright yellow canvas (`--bg: #fffd00`) carrying near-black section cards, signage capitals (Bungee) throughout, matte white diagonal stripes on the header and the cards, a self-typing command line on every section, and a simulated terminal during load. Every section is rendered as a rounded card, and the cards and their blocks ease in directionally as the reader scrolls.

---

## 2. File map

```
index.html                  164 lines — shell: meta/SEO/OG, JSON-LD, boot overlay, 5 sections, noscript, 4 <script> tags
styles/site.css             521 lines — the whole design system (12 numbered blocks)
scripts/content.js          171 lines — SITE.T(), SITE.langs, SITE.meta, SITE.ui
scripts/content-services.js 168 lines — SITE.services (5)                        (wrapped in an IIFE, uses SITE.T)
scripts/content-rest.js     268 lines — SITE.skills (6 groups), SITE.toolbox (21), SITE.portfolio (2)  (IIFE, uses SITE.T)
scripts/app.js              530 lines — engine: rendering, slides, animation, handlers, boot
assets/favicon.svg          633 B     — SVG icon: yellow rounded tile with a near-black prompt chevron `>` and cursor bar
assets/favicon.ico          2.5 KB    — legacy icon: 16/32/48 px PNG entries of the same mark
assets/og-card.png          87 KB     — 1200×630 social card (source: tools/og-card.html)
assets/preview-tanks-1.webp 24 KB     — Tanks game screenshot (in use)
assets/preview-tanks-2.webp 31 KB     — second screenshot (used NOWHERE)
tools/og-card.html          98 lines  — HTML source of og-card.png, rendered by headless Chrome
serve.sh                    8 lines   — `./serve.sh [port]` → python3 -m http.server bound to 127.0.0.1:8080
robots.txt / sitemap.xml / site.webmanifest — SEO and the PWA manifest
README.md                   128 lines — the author's own documentation (partly out of sync with the code)
```

The script order in `index.html` **matters**:
`content.js` (creates `window.SITE` and `SITE.T`) → `content-services.js` and `content-rest.js` (they call `SITE.T(...)` immediately) → `app.js` (reads everything at init).

### Build number and cache busting

The build number is duplicated in four places and is bumped **by hand**:

| Location | Value |
| --- | --- |
| `index.html` → `<html data-build="6">` | 6 (never read by any JS) |
| `index.html` → `styles/site.css?v=6`, `scripts/*.js?v=6` | 6 |
| `scripts/app.js` → `var BUILD = 6` | 6 (printed in the boot log as "· build 6") |
| `scripts/app.js` → `window.PORTFOLIO_BUILD` | published globally for debugging |

---

## 3. `index.html` markup (exact composition)

1. `<head>` — `charset`, `viewport` (with `viewport-fit=cover`), `title`, `description`, `author`, `theme-color #000000`, `color-scheme dark`, `canonical`.
2. Open Graph (`og:type/site_name/title/description/url/image` 1200×630) and Twitter (`summary_large_image`).
3. Icons: `favicon.svg`, `favicon.ico` (16/32/48 px), `apple-touch-icon` → the same SVG, `manifest`.
4. JSON-LD `@type: Person`: name, job title, email (with the `mailto:` scheme inside the field), url, address London/GB, `alumniOf` — Yaroslavl Demidov State University, `knowsAbout` — 9 topics, `sameAs` — GitHub and LinkedIn.
5. `<body>`:
   - `a.skip` — "Skip to content" → `#s-hero`;
   - `#boot` (`aria-hidden="true"`) — the full-screen loader: a black overlay that covers the header as well, holding the log container `#boot-log` (whose first child is a static `➜ artem@portfolio — zsh` row) pinned to the bottom;
   - `.progress` → `#progress-bar` — the reading progress bar;
   - `header.topbar` — brand `artem baltser` + `/ backend engineer`, a yellow pulsing availability dot with `#avail-text`, and the language button `#btn-lang` plus the `#lang-panel` menu;
   - `nav.rail#rail` (`aria-label="Sections"`) — empty, filled by JS (5 dots);
   - `main#deck.deck` — 5 `<section class="slide">` elements (see §5);
   - `#toasts` (`aria-live="polite"`);
   - `<noscript>` — a text fallback with a summary, a link to the PDF CV and contact details;
   - inline script `document.documentElement.className = 'js'` — enables the "hidden until revealed" states;
   - 4 external scripts, all with `?v=6`.

Section attributes: `id`, `class="slide"`, `data-slide="<short name for the rail>"`, `data-cmd="<command text>"`.
`data-cmd` **is not used by JavaScript** — the command text is taken from `data-type` on the `<span class="cmd__t">`.

---

## 4. Design system (`styles/site.css`)

### 4.1 CSS custom properties (`:root`)

| Token | Value | Where it is used |
| --- | --- | --- |
| `--font` | `'Bungee', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` | every piece of text on the page |
| `--display`, `--mono`, `--sans` | all three are aliases of `var(--font)` | kept so role-based rules (`.lead`, `.cmd`, chips, headings) still read meaningfully |
| `--bg` | `#fffd00` | page background (bright yellow); the section cards stay near-black |
| `--bg-soft` | `#06070a` | **unused** |
| `--bg-card` | `#0a0c10` | skill and portfolio cards, form field backgrounds |
| `--line` | `#1b1f26` | regular borders and dividers |
| `--line-soft` | `#12161b` | **unused** |
| `--line-strong` | `#2b323c` | hover borders, scrollbar, language popover |
| `--w` | `#ffffff` | primary text |
| `--w-80 / --w-60 / --w-40 / --w-24 / --w-10` | `rgba(255,255,255,.88/.7/.46/.24/.1)` | text hierarchy (`--w-10` is **unused**) |
| `--yellow` | `#fffd00` | the single accent: commands, carets, links, dots, active states |
| `--yellow-soft` | `rgba(255,253,0,.12)` | fill for active chips/pills/the skill note and focus rings |
| `--blue` | `#58a6ff` | only the progress bar gradient (second half) |
| `--amber` | `#fbbf24` | **declared but used nowhere** |
| `--red` | `#f87171` | only the left border of the error toast |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.3, 1)` | the single easing curve for every transition and animation |
| `--top` | `58px` (52px at ≤860px) | fixed header height; feeds `scroll-padding-top` and slide padding |
| `--radius` | `10px` | card corner radius |

### 4.2 Typography

| Element | Size |
| --- | --- |
| body | 17px / 1.6 (16px at ≤860px) |
| `.hero__name` (H1) | `clamp(46px, 10.5vw, 140px)`, `line-height: 1`, `letter-spacing: 0`, faint white glow `text-shadow 0 0 60px rgba(255,255,255,.08)`; `clamp(34px, 12.5vw, 60px)` at ≤560px |
| `.h2` | `clamp(26px, 4.2vw, 50px)`, `text-wrap: balance` |
| `.h2--big` (contact) | `clamp(30px, 4.8vw, 60px)` |
| `.lead` | 600, `clamp(14px, 1.4vw, 17px)`, `max-width: 76ch` |
| `.hero__pitch` | 700, `clamp(16px, 2vw, 23px)`, `max-width: 34ch` |
| `.hero__role` | 700, `clamp(14px, 1.8vw, 20px)`, colour `--yellow` |
| `.hero__facts` | 12px, `--w-60`, `max-width: 78ch` |
| `.row__title` | 400, `clamp(16px, 1.7vw, 21px)` |
| `.pcard__title` (h3) | 24px |
| Body copy in blocks (`.row__one`, `.bl li`, `.pcard__desc`) | 13.5px / 600 |
| Small labels and meta (`.chip`, `.pcard__meta`, `.field label`, `.foot`, `.row__label`) | 11.5–12px |
| Headings `h1–h4` | weight 400, `letter-spacing: 0`, `line-height: 1.06` |

**About the typeface:** the entire landing is set in **Bungee**, a signage typeface by **David Jonathan Ross** (Google Fonts, `v17`). It ships a **single 400 weight** and **has no lowercase** — lowercase input is drawn with the capital forms — so every string on the page renders as capitals without any `text-transform`, while the source text in the HTML and in `SITE.*` stays in normal case for screen readers and SEO. Because there is no bold cut, `font-synthesis: none` is set on `html` (and the headings re-declare `font-weight: 400`) so the browser never fabricates a heavier weight from the many `font-weight: 700/800` declarations left in the rules. Sizes, leading and tracking were retuned for its much wider, taller caps: the whole scale was trimmed roughly one step (hero name `168px → 140px`, `.h2` `62px → 50px`, `.lead` `18px → 17px`, block copy `15px → 13.5px`), negative heading tracking was dropped, and the widely tracked micro-labels (`.row__label`, `.scroll-hint`) went from `.16–.18em` down to `.06–.07em` while gaining ~1px in size for legibility.

Base rules: `::selection` is a yellow background with black text; `:focus-visible` is a 2px yellow outline with an offset; all links are white and turn yellow on hover; a thin dark custom scrollbar (`#2b323c`, 10px).

### 4.3 Page chrome

* `.progress` — a fixed 2px bar at the top, `z-index:120`; inside it `#progress-bar` with `linear-gradient(90deg, var(--yellow), var(--blue))`, width from 0 to 100 %, transition `width .1s linear`.
* `.topbar` — fixed, height `--top`, background `rgba(0,0,0,.94)` (deliberately **without** `backdrop-filter`) carrying the **same matte white stripe band as the section cards** (`repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 74px, transparent 74px 148px)`), bottom border `--line`, 12.5px, `z-index:110`. Left: the brand and a `--w-40` subtitle prefixed with `/ `. Right: a pulsing `.dot`, the availability text (`open to contracts and orders`) and the language button (a pill with a triangular caret).
* `.rail` — a fixed vertical list of buttons, one per section (5), centred on the right: a label (11.5px, transparent, revealed on hover/active) plus an 8px dot. The active dot is black, `scale(1.5)`, with a `0 0 12px rgba(255,253,0,.7)` glow. Hidden at ≤1080px.
* `.slide` — `min-height: 100svh`, flex-centred, padding `calc(var(--top) + 28px) 28px 28px`, `scroll-snap-align: start`.
* `.wrap` — the **section card**: `min(1160px, 100%)` wide, padding `clamp(30px, 3.4vw, 54px) clamp(24px, 3.2vw, 50px)`, 1px `--line` border, `border-radius: 20px`, a deep drop shadow with an inset top highlight, and a 1px yellow accent line (`::before`, faded at both ends) along the top edge; the border lightens on hover. Its background is two stacked layers: **wide matte white stripes** (`repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 74px, transparent 74px 148px)`) running from the top-right down to the bottom-left — flat fills with hard edges, no gloss or sheen, and nothing animated — over the near-black `linear-gradient(180deg, #0a0c10, #06070a)` base. Inner panels (`.row`, `.sgroup`, `.pcard`) stay flat and opaque, so the stripes read in the card padding and gaps.
* `.toasts` — a fixed container in the bottom-right corner (`z-index:130`).

### 4.4 Components

* **Command line** `.cmd`: 13.5px 700, wrapping flex; the `.cmd__t` text is white and the blinking `.caret` is an 8×1em yellow block. The command text lives in `data-type` and is typed out character by character.
* **Buttons**: `.btn` — a `999px` pill, 13px 700, translucent background; modifiers `--solid` (white → yellow on hover) and `--ghost`; the `.arw` arrow shifts 3px right on hover. `.tbtn` is the small header pill used by the language button.
* **Accordion row** `.row`: a 2px yellow left bar appears via `scaleY(0)→1`; the round `.row__plus` (12×2px) rotates 90° when opened while its vertical stroke collapses (`scaleY(0)`).
* **Expansion** `.row__body`: a `grid-template-rows: 0fr → 1fr` animation (0.4s) plus a fade-in of `.row__inner` (opacity, 0.3s with a 50ms delay).
* **Bullet list** `.bl li`: a yellow `▸` marker.
* **Chips** `.chip`: an 11.5px pill with a border; `.chip--btn` is clickable and `is-on` means yellow background / black text; `.chip.is-dim` / `.chip--dim` are `opacity .28`.
* **Filter** `.filter`: a pill with a yellow `>`, an `input[type=search]` and a counter on the right; the border turns yellow when focus is inside.
* **Skill group card** `.sgroup`: a `--bg-card` panel with a 1px border and 10px radius, a group name on the left and an item count on the right; the `.sgroup--wide` modifier spans the whole grid row.
* **Skill note** `.skill-note`: a block with a 2px yellow left border and a `--yellow-soft` background, appearing with `fadeUp`.
* **Portfolio card** `.pcard`: a 16:9 shot area (`object-fit: cover`, `scale(1.04)` on hover), a 24px display-face title, a description, a meta line, and `.link` links with a yellow underline; the `--code` variant shows a fake command line instead of a picture.
* **Contacts** `.cl`: a `150px 1fr` grid, a "key — value" row with a bottom border; grey hints in `.cl__hint`.
* **Form** `.brief` + `.field`: a fixed two-column grid (`repeat(2, minmax(0, 1fr))`) — the email input takes one half, while `.field--wide` (the `brief` textarea and the action row) spans both columns; labels are prefixed with a yellow `# `; fields use the `--bg-card` background and an 8px radius; on focus a yellow border plus a `0 0 0 3px var(--yellow-soft)` ring; the `textarea` resizes vertically with a 96px minimum.
* **Toast** `.toast`: a dark plate with a yellow left border and a `$` prefix; `.toast--err` has a red border.

---

## 5. Slides: exact content

All copy below is the English version (the default language). Headings, leads, labels and all content are injected by JS from `SITE.*`.

### Slide 1 — `#s-hero`, `data-slide="hello"`, command `whoami`
* A command line with a typing effect: `whoami` plus a blinking caret.
* Two-line H1: **ARTEM / BALTSER**.
* `.hero__role` — an empty `<span id="typed">` plus a small caret (see §13.1: the line is in fact empty).
* Pitch: "Backend, platform engineer. AI engineer. AI artist."
* Facts: "13+ years in production · fintech, cloud platforms, real-time streaming · delivered for GitLab, Siemens, N26, Delivery Hero, Factorial."
* **3 CTA buttons**: `send email →` (solid, mailto with a subject), `GitHub` (ghost, external), `LinkedIn` (ghost, external).
* A "SCROLL" hint with an animated chevron.

### Slide 2 — `#s-services`, `data-slide="services"`, command `services --list`
* Heading: **My services and expertise** (no trailing period). Lead: "Five ways to plug me into a team. Open any row for the short version of what you get."
* **5 expandable rows** `01`–`05`, each with a title, a one-line description and a round "+" button. Inside: a `WHAT YOU GET` label, a bullet list (3 bullets, 4 for the streaming row and 6 for the merged AI row) and a set of technology chips.

| # | Title | Chips |
| --- | --- | --- |
| 01 | Go backend engineering | Go, gRPC, REST, WebSocket, PostgreSQL, Redis, Prometheus, Kubernetes |
| 02 | Apache Kafka, Apache Flink, Data & Streaming platforms | Kafka, Kafka Streams, Flink, Spark, Debezium, Avro, ClickHouse, Java |
| 03 | Realtime, games, multiplayers | Java, Vert.x, Netty, WebSocket, MQTT, Phaser 3, TypeScript |
| 04 | Fintech & payments | Go, Java, Kafka, Saga, PostgreSQL, gRPC, OIDC |
| 05 | Ai engineering, integrations and art | LLM APIs, RAG, Agents, Qdrant, Weaviate, Python, Go, Kafka, Higgsfield, Seedance, Syntx, Phaser 3, Concept art, Style guides |

### Slide 3 — `#s-skills`, `data-slide="skills"`, command `skills --all`
* Heading: **Stack, with receipts.**
* A `>` filter pill with the placeholder `filter the stack` and a counter of the form **58/58**.
* **6 groups** with a title and an item count, plus one wide group:

| Group | Count | Contents |
| --- | --- | --- |
| languages | 5 | Go (Golang), Java, Python, TypeScript / JS, SQL |
| architecture | 5 | Event-driven architecture, Microservices, Saga & eventual consistency, CDC (Debezium), gRPC & REST |
| streaming & data | 6 | Apache Kafka, Apache Flink, Apache Spark, MQTT, ClickHouse, PostgreSQL · MongoDB · Redis · DynamoDB |
| cloud & platform | 6 | Kubernetes, Terraform · Helm · Ansible, ArgoCD · GitLab CI, AWS · GCP, OpenTelemetry, Istio · Prometheus · Grafana |
| ai & agents | 12 | Agentic pipelines, Claude, Harness, Agent Skills, Ollama, LLM integration, RAG, Qdrant · Weaviate, Seedance, Higgsfield, Syntx, Nanobanana |
| real-time | 3 | WebSocket, Vert.x · Netty, Low-latency design |
| also in the toolbox (wide) | 21 | Docker, RabbitMQ, Protobuf, Avro, AsyncAPI, OpenAPI, OIDC / OAuth2, Infinispan, Hazelcast, ElasticSearch, Lucene / JTS, GraalVM, Quarkus, Micronaut, Spring, React, Phaser 3, Camunda, BPMN, C4, Linux |

* **37 "stack" chips are clickable**: each carries a `data-where` phrase describing where the technology actually shipped (for Go, e.g.: "Primary since 2019 — services, gateways, stream processors at GitLab, Delivery Hero, Bling, Siemens."). A click highlights the chip in yellow and shows the `#skill-note` panel with the technology name and that phrase.
* The 21 toolbox chips are passive and dimmed (`chip--dim`).

### Slide 4 — `#s-portfolio`, `data-slide="portfolio"`, command `open --projects`
* Heading: **Portfolio.**
* **2 cards**:
  1. **Orbital** — there is no image (`img: null`), so a "terminal" strip is drawn instead: `$ vert.x · netty · rooms · matchmaking`. Description: an open-source real-time game server framework (rooms, matchmaking, spatial indices, monitoring; Java). Meta: `Java · Vert.x · Netty · WebSocket · MIT`. Links: **GitHub** → `github.com/tfkfan/orbital`, **Docs** → `tfkfan.github.io/orbital` (both with `target="_blank" rel="noopener"`).
  2. **Tanks** — the `assets/preview-tanks-1.webp` screenshot (16:9, lazy-loaded, `decoding="async"`). Description: a playable multiplayer browser shooter built on Orbital (authoritative server, client prediction, matchmaking). Meta: `TypeScript · Phaser 3 · Java · Vert.X · Orbital · WebSocket`. **The links block is empty** (`links: []`).

### Slide 5 — `#s-contact`, `data-slide="contact"`, command `contact --now`
* Large heading: **Let's talk about your system.**
* **3 contact rows**: `email` → `abaltserdev@gmail.com` (plus the "send email ↗" hint), `linkedin` → `linkedin.com/in/tfkfan ↗`, `github` → `github.com/tfkfan ↗`.
* **The brief form** (`novalidate`, no backend): two fields, `your_email` and a wide `brief` textarea. Buttons: `send email →` (submit) and `copy as text`. Hint: "No backend, no tracking — this just builds an email." The composed mail uses the `SITE.ui.mailSubject` subject and the body `Email: …` plus the message text.
* Footer: "Built as a single page of vanilla JavaScript — no frameworks, no trackers. Full CV in PDF, or ask me anything in the command bar below."

---

## 6. Navigation and interactions

| Action | Implementation |
| --- | --- |
| Vertical scrolling | `html { scroll-snap-type: y proximity; scroll-behavior: smooth; scroll-padding-top: var(--top) }`; each `.slide` is `scroll-snap-align: start`. Disabled at ≤860px and under `prefers-reduced-motion` |
| Rail dots | Clicking a `[data-goto="i"]` button → `goTo(i)` → `scrollIntoView` plus slide activation |
| Keyboard | `↑`/`PageUp` back, `↓`/`PageDown` forward, `Home` first, `End` last, `Esc` closes the language menu and blurs. Ignored while focus is in an `INPUT/TEXTAREA/SELECT` |
| "Active" slide | Computed by `trackSlides()`: the slide whose `top` crossed the reading line at **35 % of the viewport height**; drives the rail and the command typing |
| Content reveal | `reveal(slide)` adds the `is-active` class and **never removes it** (content cannot disappear), which starts the directional animation of the section card and its blocks. Separately, purely geometrically: `r.top < 85vh && r.bottom > 15vh` |
| Command typing | `typeCmd()` — character-by-character typing of the `data-type` text, 34–60 ms per character, once per "slide + language" pair |
| Language switch | The `EN ▾` button opens a panel listing 5 languages (`role="menuitemradio"`, a check mark on the active one). Switching writes `localStorage['artem-lang']`, updates `<html lang>`, runs a full `renderAll()` without a reload, and shows a toast with the language name |
| Skill filter | On `input`, non-matching chips get `is-dim` (opacity .28), groups with no matches get `is-faded` (opacity .35), and both per-group counters and the total `58/58` are recomputed |
| Expanding rows | A delegated click on `.row__head` toggles `is-open` plus `aria-expanded` |
| Clicking a skill | Highlights the chip (`is-on`) and fills `#skill-note` |
| Copy | `copy()` uses `navigator.clipboard` only when `isSecureContext`, otherwise falls back to a hidden `<textarea>` + `document.execCommand('copy')`; the result is a "Copied to clipboard" or "Copy failed — select it manually" toast |
| Form | `submit` → `mailto:` with the subject `<mail subject> — <topic>` and the body `Name / Company / Email / Topic / message`. The "copy as text" button copies email + subject + body |
| In-page links | A delegated `a[href^="#"]` handler: if the target is a slide, it calls `preventDefault()` and `goTo()` (only the skip link `#s-hero` uses this) |
| Toast | Appears with `toastIn .25s`, gets `is-out` after 2400 ms (`toastOut .3s`), and is removed from the DOM after 2750 ms |

### How scrolling is tracked (an important implementation detail)

`trackSlides()` runs:

* on `scroll`, `touchstart`, `touchmove` and `wheel` — through a **16 ms timer** (not `requestAnimationFrame`, because rAF is frozen in background tabs and throttled on phones);
* on `resize`, `pageshow` (back-forward cache restore), `orientationchange` (+120 ms) and `visibilitychange`;
* **plus every 350 ms** via `setInterval` — a safety net for environments that swallow scroll events.

The same handlers also call `updateProgress()` (progress bar width = `scrollY / (scrollHeight - innerHeight) * 100 %`).

### Fail-safes

1. Any unhandled error (`window error`, `unhandledrejection`) → `failSafe()`: hide the boot overlay and force-reveal every slide (`revealAll()`).
2. If after 3000 ms `trackSlides()` has never run (`trackRuns === 0`) → the same `failSafe()`.
3. The point: content **can never** stay invisible because of a script failure.

---

## 7. Animations: the full inventory

### CSS animations (`@keyframes`)

| Name | What it does | Parameters |
| --- | --- | --- |
| `pulse` | the yellow availability dot: an expanding `box-shadow` ring | 2.4s, `var(--ease)`, infinite |
| `blink` | caret blinking (`opacity: 0` at 50 %) | 1.05s, `steps(2, start)`, infinite |
| `bob` | the "scroll" chevron bobbing (`translate(0/3px, 0/3px)` while `rotate(45deg)`) | 1.8s, `var(--ease)`, infinite |
| `fadeUp` | the language popover and the `#skill-note` panel appearing (opacity + `translateY(8px)`) | .18s / .3s, `var(--ease)` |
| `toastIn` | toast: opacity + `translateX(14px)` → 0 | .25s, both |
| `toastOut` | toast: opacity + `translateX(14px)` | .3s, both |

### Transitions

* **Section card reveal**: `.js .deck > .slide > .wrap` — `opacity 0 → 1` over `0.85s var(--ease)` while the card travels from `translateX(±96px)` to `none`. The direction alternates by slide order: **odd slides ease in from the left, even slides from the right** (`:nth-child(odd/even)`), so consecutive sections arrive from opposite sides.
* **Block reveals** (rows, skill groups, portfolio cards, contact rows, the hero name and CTA row): `.reveal-l` / `.reveal-r` — `translateX(-64px)` / `translateX(64px)` → `0`, `0.7s var(--ease)`; the renderers alternate the class per item, so blocks within a section fan in from alternating sides.
* **Small-block reveals** (command lines, headings, leads, filter, form fields, footer): `.reveal` rises `28px` from **below**, `.reveal--above` drops `28px` from **above** (used for the per-section command lines); `0.7s var(--ease)`.
* **Stagger**: all reveal classes share `transition-delay: calc(var(--i, 0) * 60ms)`, where `--i` is written inline by the renderers (or hard-coded in `index.html`).
* **Accordions**: `grid-template-rows 0fr ↔ 1fr` (0.4s), inner `opacity` (0.3s, 50ms delay).
* **"+" button**: `transform rotate(90deg)`, `border-color → yellow`, `background → yellow-soft`, vertical stroke `scaleY(0)` (0.25–0.3s).
* **Block hover** (kept alive after the reveal settles, via `.slide.is-active …:hover` rules that outrank the settled `transform: none`): service row `translateY(-2px)` plus a yellow left bar via `scaleY(0→1)` (0.25–0.3s); skill group `translateY(-3px)`; portfolio card `translateY(-4px)` with its image at `scale(1.04)` over 0.5s.
* **Buttons**: `translateY(-2px)`, border/text → yellow; the `→` arrow shifts 3px.
* **Rail**: label `opacity 0 → 1` + `translateX(6px) → 0`; the dot `scale(1.5)` with a glow.
* **Links/chips/fields**: border, background and shadow colour — 0.18–0.25s.
* **Boot overlay**: `opacity .34s` → hidden.
* **Progress bar**: `width .1s linear`.

### Boot overlay (`boot()`)

* A full-screen black overlay (`inset: 0`, `z-index: 300`) that **covers the fixed header**, so no header is visible while the page boots; there is no title bar and no traffic lights. The log sits at the bottom (`margin-top: auto`) and its first line is the static `➜ artem@portfolio — zsh`.
* **5 lines** from `SITE.ui.boot` are printed one at a time, every **110 ms**, in the format `➜ <text> [  ok  ]`; the last line gets `[ ready ]`, and `· build 6` is appended to the third line (which reads `index 5 sections · 5 languages`).
* After the last line there is a 200 ms pause, then `is-out` (fade .34s) and `hidden`. The promise resolves after hiding, and only then do `renderAll()` and `goTo(0)` run.
* Under `prefers-reduced-motion` the overlay is hidden immediately and the promise resolves at once.

---

## 8. Page lifecycle

```
DOMContentLoaded (or immediately if the document is already loaded)
  └─ init()
       ├─ window.PORTFOLIO_BUILD = 6
       ├─ state.lang = resolveLang()          // localStorage → navigator.language → 'en'
       ├─ bind()                              // all event handlers
       ├─ boot()                              // terminal overlay, ~1.1 s (or instant)
       └─ .then():
            ├─ renderAll()                    // re-render ALL content from SITE.*
            │    ├─ renderChrome / renderLangMenu
            │    ├─ renderHero / renderServices / renderSkills
            │    ├─ renderPortfolio / renderContact
            │    ├─ renderRail                // 5 dots, one per .slide
            │    ├─ state.typed = {}          // "type again"
            │    ├─ reobserve()               // restore is-active on already-shown slides + trackSlides()
            │    └─ activate(slides[0], true)
            └─ goTo(0)                        // smooth scroll to the first slide
```

`renderAll()` runs again on every language switch: all HTML inside the containers is rebuilt via `innerHTML`, which resets the expanded state of rows.

`app.js` is a single ES5-style IIFE (`var`, `function`) with no modules and no dependencies. Helpers: `t()` (translation resolver: a string or a `{en,es,de,fr,pt}` object), `esc()` / `attr()` (HTML escaping), `$()` / `$$()` (querySelector), `reduced()` (`matchMedia('(prefers-reduced-motion: reduce)')`).

Note: **the rail buttons have no handlers of their own** — everything is built on a single delegated `click` handler on `document` that checks targets in order (`[data-lang]`, `#btn-lang`, `[data-copy]`, `[data-copy-brief]`, `[data-goto]`, `[data-skill]`, `.row__head`, `a[href^="#"]`).

---

## 9. Content model and localisation

* `SITE.T(en, es, de, fr, pt)` returns an object with five keys; `t(v)` picks `v[SITE.lang] || v.en`.
* `SITE.langs` — `[{id:'en',label:'English',short:'EN'}, es 'Español', de 'Deutsch', fr 'Français', pt 'Português']`.
* Language resolution: `localStorage['artem-lang']` → the first 2 characters of `navigator.language` → `'en'` (all `localStorage` access is wrapped in `try/catch` for private mode).
* Translation volume: **112 translatable strings × 5 languages = 560 text variants**.

| File | `T(...)` calls | What they cover |
| --- | --- | --- |
| `content.js` | 34 | meta, UI strings, boot lines, `SITE.meta.typed` |
| `content-services.js` | 30 | 5 services (title/one/bullets) |
| `content-rest.js` | 48 | 6 skill groups, 37 "where it shipped" hints, the Orbital and Tanks descriptions, the toolbox label |

* **Not translated**: the command text in `data-type` (always English), the contact row keys (`email`, `linkedin`, `github`), and the project `title` / `meta` values.
* Adding a sixth language (per the README) means adding a sixth argument to every `T(...)` in the three content files, plus an entry in `SITE.langs`, plus a `.slice(0,2)` adjustment in `resolveLang()` if needed.

---

## 10. Accessibility

* A "Skip to content" link that appears on focus.
* Semantic landmarks: `header`, `nav[aria-label]`, `main`, `section`, `article`.
* `aria-expanded` on every expander (service rows) and on the language button; `aria-haspopup`, `aria-controls`, `aria-checked`, `role="menuitemradio"` in the language menu.
* `aria-live="polite"` on the toast container; `aria-hidden="true"` on decorative elements (the boot overlay, "+" buttons, carets).
* Visible `:focus-visible` outlines (2px `--yellow`, 2px offset).
* Full keyboard control (arrows/PageUp/PageDown/Home/End/Esc) that is correctly ignored while typing in a field.
* `prefers-reduced-motion` support: the boot overlay, typing, all transitions (0.001 ms, with stagger delays forced to 0 ms), snapping and smooth scrolling are disabled; every reveal class and the section cards are forced to `opacity: 1; transform: none`, so everything is visible immediately.
* The print stylesheet: hides the header, rail, toasts, progress bar and scroll hint; white background, black text, **all accordions forced open**, the section cards flattened to light bordered blocks (the stripe layer is dropped), yellow accents replaced with the dark olive `#6b6a00`, `page-break-inside: avoid`, H1 at 40pt.
* A `noscript` block with a short summary, a link to the PDF CV and contact details.

Known nuance: the `#s-hero` skip link is intercepted by JS (`preventDefault()` + smooth scroll), so focus is not moved into the target section — the jump is purely visual.

---

## 11. SEO, PWA, security

* **SEO**: `title`, an informative `description`, `author`, `canonical`; Open Graph + Twitter Card using the 1200×630 `assets/og-card.png`; JSON-LD `Person` (job title, email, URL, London GB address, university, 9 `knowsAbout` topics, `sameAs` GitHub/LinkedIn).
* `robots.txt`: `Allow: /` plus a sitemap reference. `sitemap.xml`: a single URL with `changefreq: monthly`, `priority: 1.0`.
* `site.webmanifest`: name "Artem Baltser — Backend Engineer", `short_name: "artem@ide"`, `display: standalone`, `theme_color: #000000` (the dark header), `background_color: #fffd00` (the yellow canvas), one SVG icon.
* Every external link uses `target="_blank" rel="noopener"`.
* No third-party scripts, analytics, cookies or backend requests. The only external request is Google Fonts.
* All user and content text passes through `esc()` / `attr()` before being inserted into `innerHTML`.

---

## 12. Responsiveness and mobile hardening

| Media query | What changes |
| --- | --- |
| `max-width: 1080px` | the rail is hidden entirely |
| `max-width: 860px` | `--top: 52px`; **scroll snapping is disabled**; body 16px; slide padding drops to 14px and the card padding to `22px 18px` with a 16px radius; the brand subtitle and availability text are hidden; the service row grid gets tighter; contact rows and the brief form go single-column |
| `max-width: 560px` | header padding reduced, smaller H1, card padding `18px 14px` with a 14px radius, portfolio and skill grids in 1 column |
| `prefers-reduced-motion: reduce` | snapping and smooth scrolling removed, all animations/transitions muted, reveal elements forced visible |
| `print` | see §10 |

Deliberate decisions documented in the README and confirmed by the code:

* **No `will-change`** on reveal elements — many dedicated GPU layers exhaust layer memory on phones (black unpainted regions).
* **No `backdrop-filter`** on the fixed header — a known iOS Safari repaint bug on a very long page; on the flat yellow canvas the difference is invisible anyway.
* Scroll tracking uses four event types + the page lifecycle + a 350 ms poll (phones throttle `scroll` during momentum scrolling).
* Two fail-safe mechanisms (see §6) so content never stays hidden.
* Cache busting through `?v=N` and `data-build` / `PORTFOLIO_BUILD`.

---

## 13. Discrepancies, dead code and notes

These are factual mismatches between the code, `README.md`, and the promises made by the site's own copy.

1. **The hero role line is empty.** `<span id="typed">` is never filled by any function in `app.js`. The `SITE.meta.typed` array (5 role variants × 5 languages) is dead data. On screen, only a blinking yellow caret appears under the name. The README promises a "rotating role".
2. **Number of CTAs.** The README claims "five CTAs" in the hero; `renderHero()` creates **three**: `send email`, `GitHub`, `LinkedIn`.
3. **The CV PDF is missing.** `SITE.meta.cv = 'assets/Artem-Baltser-CV.pdf'` and the `<noscript>` link point at a file that does not exist in `assets/` → 404. On top of that, `SITE.ui.downloadCv` ("download CV (PDF)") is used nowhere in the code. The README states the PDF lives in `assets/`.
4. **The footer promises a command bar that does not exist**: "ask me anything in the command bar below" — there is no interactive console on the site; the section command lines are purely decorative (and cannot be typed into).
5. **Tanks has no links.** `SITE.portfolio[1].links = []`, so the Tanks card renders without a links block, even though the README mentions cards with links.
6. **Orbital has no screenshot.** `img: null` → the decorative `$ vert.x · netty · rooms · matchmaking` strip is drawn instead of an image.
7. **Unused asset.** `assets/preview-tanks-2.webp` (31 KB) is not referenced by any file.
8. **Unused attribute.** `data-cmd` on every section duplicates the command text, but the JS only reads `data-type` on `.cmd__t`.
9. **Unused code branch.** The delegated handler contains a `[data-copy]` branch, but no element in the markup carries `data-copy` (only `data-copy-brief` is used).
10. **Unused CSS tokens:** `--bg-soft`, `--line-soft`, `--w-10`, `--amber` are declared in `:root` and never appear again.
11. **`data-build="6"` on `<html>`** is not read by any script — in practice only `window.PORTFOLIO_BUILD` works, and caching is governed by the `?v=6` query strings.
12. **The JSON-LD `email`** is written as `"mailto:abaltserdev@gmail.com"` — schema.org expects a bare address in that field.
13. **The `58/58` counter** includes the 21 toolbox chips (37 stack + 21), so the filter badge shows more technologies than are actually a "clickable stack".
14. **The `noscript` fallback sits after `<main>`**, and the empty sections are `min-height: 100svh` — with JS disabled, a visitor scrolls through five black screens before reaching the text summary.
15. **Switching language resets expanded accordions** (a full `innerHTML` re-render) and restarts command typing (`state.typed` is cleared).
16. **The form is not validated** (`novalidate`, no JS checks): an empty form still produces a `mailto:` with empty fields.
17. **Content is unavailable without JS** — the HTML contains no meaningful text apart from `noscript`; SEO relies entirely on `<meta>`, Open Graph and JSON-LD.
18. **`README.md` is out of sync with the code**: its slide table, section names, headings and feature list describe an earlier version of the deck.

The two image assets that are **not** style-driven are `assets/preview-tanks-1.webp` (the live screenshot used by the portfolio card) and the unused `assets/preview-tanks-2.webp`; they are genuine captures of the Tanks game and therefore keep their own colours.

---

## 14. Running, deploying, next steps

**Local preview**

```bash
./serve.sh          # → http://127.0.0.1:8080 (python3 -m http.server, bound to 127.0.0.1)
./serve.sh 9000     # any port
```

No build step is required — opening `index.html` straight from disk also works. There is no `node_modules`.

**Regenerating the social card** (from the README and the comment in `tools/og-card.html`):

```bash
google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,900 --screenshot=../.og-raw.png tools/og-card.html
convert ../.og-raw.png -crop 1200x630+0+0 +repage ../assets/og-card.png
```

The window is deliberately taller than 630 px: headless Chrome's layout viewport is the window height minus roughly 87 px and anything below the viewport is never painted, so the card is rendered tall and cropped. The card itself uses an explicit `left/top/width/height` box (1132 × 562 at 34 px inset) so its composition never depends on the capture viewport.

**Deploying**: copy `index.html`, `styles/`, `scripts/`, `assets/`, `robots.txt`, `sitemap.xml` and `site.webmanifest` to any static host (GitHub Pages). If the domain changes, update `canonical` and `sitemap.xml`. **Do not forget to bump the build number in all four places (§2)**, or phones will happily keep running the stale cache.

**Roadmap ideas (from the README, not implemented yet)**: a portrait in the hero; 2–3 testimonials from people at GitLab/Siemens/N26; a booking button (Cal.com/Calendly) in the header; a fixed-price entry point (for example a "2-week architecture review"); slide-reach analytics.

---

## 15. Summary statistics

| Metric | Value |
| --- | --- |
| Slides | 5: hello, services, skills, portfolio, contact |
| Expandable blocks | 5 service rows |
| Skill groups | 6 + toolbox |
| Technology chips | 37 clickable + 21 passive = 58 |
| Translatable strings | 112 (× 5 languages = 560 variants) |
| Languages | 5 |
| Section presentation | each `.slide` holds one rounded `.wrap` card (20px radius, 1px border, gradient fill, drop shadow) |
| Reveal motion | 4 directional classes — `reveal` (from below), `reveal--above` (from above), `reveal-l` / `reveal-r` (blocks from the sides) — plus section cards alternating left/right by slide order |
| CSS `@keyframes` animations | 6 (`pulse`, `blink`, `bob`, `fadeUp`, `toastIn`, `toastOut`) |
| Reliability safeguards | 2 fail-safes + a 350 ms poll + cache busting |
| Frameworks / dependencies | 0 (apart from Google Fonts) |
| Site source lines | 1822: index.html 164 + CSS 521 + JS 1137 |
| Lines including README and configs | 2080 |
