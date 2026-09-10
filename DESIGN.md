# plexo co. — design plan

Foundation pass. Read in this order: what the logo file actually contains, the plan (pass 1), then the critique that changed it (pass 2). The critique wins wherever the two disagree.

---

## 0. What the file says (verified against `plexo-logo.svg`)

Measured, not eyeballed. Canvas is 1500 × 1500. All numbers below are canvas units.

| Thing | Measurement |
|---|---|
| Stroke weight (letter stems and the rule) | 24.5 |
| x-height (bowl height of p, e, o) | 395 |
| Bowl width (p, e, o) | 191 — letters are condensed, 2.07 : 1 tall |
| Outer corner radius of a bowl | ≈ 54 — about 2.2 strokes, or **0.28 of the bowl's width** |
| `l` height | 553 — rises 158 (40 % of x-height) above the other letters |
| `p` descender below the rule | ≈ 73 — about 3 strokes |
| Rule's extension left of the `p` stem | ≈ 84 — about 3.4 strokes |
| Wordmark + rule + `co.` lockup | x 222 → 1275, y 344 → 1056 (1053 × 712, aspect 1.48 : 1) |
| Ink | `#1e1e1e` everywhere. The PNG's ground is `#FFFEFA`, not pure white. |

Corrections to the brief's observations, because the design leans on them:

- **The `+` is made by the `p`, not the `l`.** The `p` descender crosses the baseline rule at the bottom-left; the `l` is simply the tallest stroke. There is no cap line — the mark is all lowercase — so "breaks the cap line" really means "rises 40 % above everything else."
- **The rule is the `o`'s tail.** It runs from far left, passes under the whole word, and turns 90° up into the bottom-centre of the `o`. It is continuous with the last letter, not a separate underline.
- **The rule is a stroked path, not a fill.** `stroke-width="33"` at 0.75 scale = 24.75, the same weight as the stems. Everything else in the file is outlined fills. This matters: a stroke can be drawn on load with `stroke-dashoffset`; a fill cannot.
- **Counters are rounded rectangles, not true stadiums.** Radius is 28 % of width, not 50 %. That ratio is the signature, and it is easy to get wrong by reaching for `rounded-full`.
- **`co.` is rotated 90° counter-clockwise**, reads bottom-to-top, and is right-aligned to x = 1275, well past the `o` (which ends at 1192). The mark is comfortable with a loose right edge.
- **The file contains the tagline and the two fact lines as outlined glyphs**: `MARKETING | AI` (12 paths, cap height 17), `ESTD. 2026` (9 paths, bold), `LOCATED IN LOS ANGELES, CA` (22 paths). 51 fills + 1 stroke = 52 paths. The tagline is tracked at roughly 1.2 × cap height. At header size those glyphs would be about 1 px tall, so the header lockup will exclude them and the tagline is set as live text where it appears.
- **The `x`** is two vertical strokes at top and bottom joined by crossing diagonals with rounded turns — the same rounded-corner language as the bowls.
- Negative space: horizontally the art fills 70 % of the canvas; vertically 54 %. The padding is generous rather than enormous, and it is heavier above and below than at the sides.

Only the five wordmark glyphs are inside the `matrix(1,0,0,1,273,52)` + clip-path wrapper. The rule, `co.`, tagline and fact lines sit at canvas level. The traced component will flatten all of this into one coordinate space.

**Lockups the site will derive from the file**

| Lockup | Crop (canvas units) | Used for |
|---|---|---|
| Full lockup: wordmark + rule + `co.` | x 222→1275, y 344→1056 | header ≥ 480 px, hero (large), footer, OG image |
| Monogram: `p` + the rule fragment that crosses it (the `+` moment) | x 222→510, y 502→1056 | header < 480 px, favicon, avatar |
| Padded original | the untouched file | `public/plexo-logo.svg`, downloads, press |

---

## 1. Pass 1 — the plan

### 1.1 Palette (6 values)

| Token | Hex | Role | Earned by |
|---|---|---|---|
| `ink` | `#1e1e1e` | all text, the mark, hairlines in ink, the one dark surface | the logo's only fill |
| `paper` | `#FFFEFA` | page ground | the PNG's ground colour; 1 % warm, reads as white |
| `mute` | `#6b6b6b` | secondary text on paper (5.3 : 1) | ink at ~60 % |
| `rule` | `#dcdcd9` | decorative hairline separators only, never a control boundary | ink at ~15 % on paper |
| `live` | `#1b5fb5` | focus rings on paper, links inside body text, the active step, form attention states (6.3 : 1 on paper) | see below |
| `live-on-ink` | `#9fd0ec` | the same meaning on the ink surface (10 : 1) | the light tint `live` needs to reach 3 : 1 on ink |

**The one accent, justified in one sentence:** the mark is drawn like a technical pen on a drafting sheet, and drafting has one colour that is never part of the finished drawing — pencil blue — so blue marks only what is live and needs the reader's hand, never decoration.

There is no second dark, no tinted grey, no gradient. Text on the ink surface is `paper`; muted text on ink is `paper` at 64 % opacity (7 : 1).

### 1.2 Type

One family, three roles.

**Outfit** (variable, 100–900), self-hosted through `next/font`. Geometric, low-contrast, rounded terminals, open `c e a` apertures, single-storey `a`. Its light weights have the same monoline quality as the mark; its capitals are close cousins of the Century Gothic-style caps already in the file's tagline and fact lines. It is not Inter, Geist, Manrope or Space Grotesk.

| Role | Size | Weight | Leading | Notes |
|---|---|---|---|---|
| display | clamp(40px, 5.5vw, 68px) | 300 | 1.05 | hero sentence, page titles. Light weight only at ≥ 40 px |
| title | clamp(26px, 3vw, 36px) | 400 | 1.15 | section headings, service names |
| body-lg | 19px | 400 | 1.5 | the About argument |
| body | 17px | 400 | 1.55 | everything else |
| small | 14px | 400 | 1.5 | form help, footer |
| fact | 13px | 600 | 1.4 | **the only bold on the site**: founding year and location, echoing `ESTD. 2026` in the file |
| tagline | 13px, uppercase, tracking 0.32em | 400 | 1 | used exactly once, under the hero wordmark, because the file does it there |

Letter-spacing: −0.01em at display, 0 elsewhere. No italics in this pass. Numerals: proportional, lining.

Fallback stack: `Outfit, "Century Gothic", "Avenir Next", "Segoe UI", system-ui, sans-serif`, with `size-adjust` set on the fallback to hold layout while the font loads.

### 1.3 Geometry tokens

| Token | Value | Derived from |
|---|---|---|
| hairline | 1px | the monoline. Always 1 px, never 0.5 px (renders inconsistently) |
| radius ratio | 0.28 × the element's short side | bowl corner ÷ bowl width |
| `r-1` | 6px | 22 px chips (budget range options) |
| `r-2` | 11px | 40–44 px buttons |
| `r-3` | 14px | 48–52 px inputs, textarea |
| `r-4` | 24px | any surface ≥ 88 px tall that needs a corner |
| never | `rounded-full`, `0` on a container | pills and sharp boxes both break the signature |

Spacing scale (px): 4 8 12 16 24 32 48 64 96 128 160. Section spacing 96 / 128 / 160 at mobile / tablet / desktop.

Grid: 12 columns, content max-width 1280, gutter 24, page margin 24 (360) → 40 (768) → 64 (1280).

Breakpoints: 360 base, 480 (header lockup switch), 768, 1024, 1280.

### 1.4 Layout concept — "rules bleed left, stop right"

The logo's one structural gesture is a rule that extends *past the mark on the left* and *ends inside the last letter on the right*. The whole site is built on that asymmetry.

- **Every horizontal rule on the site starts at the viewport's left edge and stops at the content's right edge.** Header rule, section rules, the hero rule. Nothing is ever symmetrical about the centre line.
- **Sections use a 4 / 8 split.** The heading lives in the left four columns, the content in the right eight. The left column is mostly air — the same air the logo puts left of the `p`. On mobile the split stacks, heading first.
- **Nothing is centred.** Not the hero, not the CTA, not the footer.
- **The hero is where the boldness is spent.** The lockup is set large (about 55 % of content width on desktop, full width on mobile) and its rule keeps going, off the content margin and off the left edge of the viewport. On load the rule draws in from the left, crosses the `p` descender to make the `+`, runs under the word and turns up into the `o`. That is the site's one orchestrated moment. Then it stops.
- **Surfaces are separated by space and one hairline, never by background bands** — with a single exception: the bottom of every page is one ink block that holds the contact CTA and the footer together. That is the one place the mark inverts, and it is why the SVG inherits `currentColor`.

### 1.5 Home page wireframes

Desktop (≥ 1024). `│` at the far left is the viewport edge; the content column starts after the margin.

```
viewport edge
│ ┌ content ─────────────────────────────────────────────────────────────┐
│ │ [lockup 40px]                                 Services  About  Contact│   header 72px
│────────────────────────────────────────────────────────────────────────┘   header rule: bleeds left, stops right
│
│        │
│   ┌──┐ │  ┌──┐   ┐  ┌   ┌──┐
│   │  │ │  ├──┘    ╳    │  │                                                 hero lockup ≈ 55% of content width
│   └──┤ │  └──    ┘  └  └──┤      ·
│──────┼──────────────────────┘    o                                          the rule enters from x=0, crosses p, turns up into o
│      │   MARKETING | AI          c                                          tagline: live text, tracked, the one caps label on the site
│
│                                     plexo is a marketing agency in Los
│                                     Angeles that uses AI for the work it     display 300, right eight columns
│                                     is good at, and people for the rest.
│
│                                     [ Start a project ]    What we do        one button, one plain link
│
│─────────────────────────────────────────────────────────────────────────┘   section rule
│   What we do                        AI-built campaigns                       4/8 split; services as a hairline list, not cards
│                                     Creative and copy at volume, without ...
│                                     ─────────────────────────────────────    each row: name, one-line summary, expands on click
│                                     Marketing automation
│                                     ─────────────────────────────────────
│                                     Custom AI tools
│                                     ─────────────────────────────────────
│                                     Brand and content systems
│                                     ─────────────────────────────────────
│                                     Performance media
│
│─────────────────────────────────────────────────────────────────────────┘
│   How we work                       ▭ Listen ────── ▭ Build ────── ▭ Run ────── ▭ Hand over
│   Four steps. The fourth            Two weeks ...   Six weeks ...  Monthly ...   Or keep going.
│   is optional.                                                                   a real sequence: one connecting rule, rounded-rect markers
│
│─────────────────────────────────────────────────────────────────────────┘
│   (reserved) proof / results slot — same rule, same 4/8 split, nothing in it yet
│
│█████████████████████████████████████████████████████████████████████████████ ink block, full bleed, no radius
│█  Tell us what you need.            Name, company, budget, what you need.  █
│█  We reply within two working days. [ Start a project ]  hello@plexoco.io   █
│█                                                                          █
│█  [inverted lockup]     Los Angeles · est. 2026      Services About Contact  ← no middle dots; see critique
│█████████████████████████████████████████████████████████████████████████████
```

Mobile (360).

```
│ [monogram 32px]               Menu │   header 64px
│────────────────────────────────────┘
│
│   ┌──┐ │  ┌──┐  ┐ ┌  ┌──┐          lockup full width (312px → stroke ≈ 5.8px)
│───┼────┴──┴──┴──╳─┴──┴──┤ ·o c
│   │   MARKETING | AI
│
│   plexo is a marketing agency
│   in Los Angeles that uses AI
│   for the work it is good at,
│   and people for the rest.
│
│   [ Start a project ]
│   What we do
│
│────────────────────────────────────┘
│   What we do
│   AI-built campaigns
│   ─────────────────
│   Marketing automation
│   ...
│────────────────────────────────────┘
│   How we work
│   ▭ Listen
│   │  Two weeks ...
│   ▭ Build                             steps stack; the connecting rule turns vertical
│   │
│   ▭ Run
│   │
│   ▭ Hand over
│
│█████████████████████████████████████
│█ Tell us what you need.
│█ [ Start a project ]
│█ lockup · facts · nav
```

### 1.6 Components

- **Header.** Lockup left (inline SVG, `currentColor`, hover raises the mark's opacity from 0.92 to 1 — no colour change). Nav right, three links, current page marked by a 1 px underline in ink. Below 480 px the lockup swaps for the monogram and the nav collapses into a "Menu" button that opens a full-height panel (opening motion: the panel's height animates; that is user-caused, so allowed). Header rule bleeds left, stops right.
- **Buttons.** Primary: ink fill, paper text, `r-2`, 44 px tall, 20 px side padding, weight 500. Hover inverts to a 1 px ink outline on paper — the same inversion the mark does. Active: scale 0.98. Focus: 2 px `live` ring, 3 px offset, radius follows the button. Labels say what happens: "Start a project", "Send", "See services".
- **Text link.** 1 px underline in ink, offset 3 px; hover thickens to 2 px. No arrows.
- **Service row.** Name (title), summary (body), hairline below. Click or Enter expands it in place: height animates, content fades in; one open at a time. Expanded content sits on the same 4 / 8 grid: "What you get" and "Who it's for" as two short lists.
- **Steps.** One connecting hairline; markers are 14 × 22 px rounded rectangles (`r-1`) in ink outline. Horizontal ≥ 768, vertical below. No numbers in the markers; the rule reads left-to-right and the copy uses "then".
- **Inputs.** 1 px ink outline, `r-3`, 52 px tall, paper fill, label above in `small`, no placeholder-as-label. Focus: outline becomes 2 px `live`. Invalid: outline `live` plus a message underneath that says what to do. Textarea same treatment.
- **Budget range.** Radio group rendered as chips (`r-1`, 1 px ink outline). Selected: ink fill, paper text. It is a fieldset with a legend, not a fake select.
- **Ink block.** Full-bleed `ink` surface. Contains the contact CTA (two columns: a sentence and the button; email as a plain link) and the footer (inverted lockup, the fact line, nav). Focus rings inside it use `live-on-ink`.
- **Section rule.** `rule` colour, 1 px, `margin-left: calc(-1 * page margin)` so it bleeds to the viewport edge, stops at the content's right edge.

### 1.7 Motion

- **Hero, once:** lockup glyphs fade in over 150 ms → the rule draws over 900 ms (`stroke-dasharray` / `stroke-dashoffset`, ease-out) → tagline and sentence fade in over 300 ms. No translation anywhere. Total under 1.4 s.
- **User-caused:** service row expand, menu panel, button hover inversion, form submit → success state. Each animates the property that changed and nothing else.
- **Never:** scroll-triggered entrances, parallax, ambient loops.
- **`prefers-reduced-motion`:** the rule is rendered fully drawn, fades become instant, height animations become instant. Checked with the media query at the CSS level and via `useReducedMotion` in Framer Motion.

### 1.8 Pages

- `/` as wireframed. The proof slot is an empty section component with the same rule and split, exported but rendering nothing until it has content.
- `/services` — the five rows expanded by default, each as: what it is (one paragraph, plain), what you receive (a list of deliverables), who it is for (two or three sentences). Page title in display type in the right column; the left column carries a two-line summary of how to buy.
- `/about` — the argument, in `body-lg`, right column. Working thesis: *AI made producing marketing cheap. It did not make deciding what to produce cheap, or knowing when the output is wrong. Most agencies now sell the cheap part at the old price. plexo sells the judgment and treats the volume as a given.* Then: why 2026 (the tools finally stopped being a demo), why Los Angeles (the clients and the creative talent are here), and what the agency will not do (pretend a model is a strategist).
- `/contact` — the form. Success state replaces the form in place: "Sent. We read everything within two working days and reply from hello@plexoco.io. If it's urgent, email that address directly." Error state keeps the form, keeps the values, and says what failed and what to try.

### 1.9 Principles — what makes it plexo

1. **Rules are structural.** They start at the viewport edge and stop at the content edge, like the logo's. They are never centred and never decorative.
2. **One radius ratio.** Corners are 28 % of the short side. No circles, no pills, no sharp containers.
3. **Hairline everything.** 1 px borders, 300-weight display type, 1.25 px icon strokes if any icons exist. Bold appears once, on the fact line, because the file bolds `ESTD. 2026`.
4. **Left-heavy.** 4 / 8 split, air on the left. The page leans the way the mark leans.
5. **One moment of motion**, on load, and it is the logo's own rule. Everything else moves only when the reader does something.
6. **One ink.** `#1e1e1e` on `#FFFEFA`, inverted once at the bottom of the page. Blue only where the reader's hand is needed.
7. **Space between sections, not bands.**
8. **The copy is unimpressed.** Plain verbs, sentence case, says what a thing is and what pressing it does.

---

## 2. Pass 2 — critique against the brief

Each item: what pass 1 had, what it read as, what changed.

1. **`+` markers at every section rule.** Pass 1's first draft put a small `+` where each section rule met the content edge, arguing it was earned by the logo. It is also the single most recognisable tell of the current dev-tool aesthetic (crosshair corners on cards and grids). **Removed entirely.** The `+` exists once on the site, inside the hero mark, where the `p` crosses the rule. A signature that repeats becomes a pattern. The bleed-left / stop-right rule carries the structure on its own.

2. **A light "pencil blue" for decorative construction lines.** Pass 1 wanted the hero rule to draw in pale blue, blueprint-style, and a second tint for text. That is blueprint cosplay, and it puts colour on the one element that should be pure logo. **The hero rule draws in ink.** Blue is now only for interaction states. The light tint survives solely because a focus ring on the ink surface needs 3 : 1 and `#1b5fb5` cannot reach it there.

3. **Two hero buttons.** "Start a project" plus a second filled or outlined button is the default hero. **One button and one plain text link.** The button is the only filled element above the fold.

4. **Numbered step markers, `01 / 02 / 03`.** Pass 1 numbered the steps because sequences earn numbering. They do, but the zero-padded style is the tell, not the numbers. **Markers are unnumbered rounded rectangles on one connecting rule; the copy carries the order with "then".** If numbering comes back in review, it will be plain `1.` in body type.

5. **A dark CTA band followed by a separate footer.** Two dark regions, or a dark band and a light footer, is a template rhythm. **Merged into one ink block** that holds the CTA and the footer. The site has exactly one inverted surface and it is the last thing on every page.

6. **A full-width hairline under the header.** The one rule on the site that would have bled both sides. **It now follows the same bleed-left / stop-right law as every other rule.** Small, but it is the difference between a principle and a decoration.

7. **Fade-and-slide on the hero text.** The hero sequence originally had the sentence rise 12 px as it faded. **No translation anywhere on the site.** The only thing that moves is the rule, and it moves along its own length.

8. **Footer meta joined with middle dots** ("Los Angeles · est. 2026"). Left in the wireframe deliberately so it could be caught here. **Replaced by the fact line**: two short lines in the bold 13 px role — `Est. 2026` over `Los Angeles, CA` — which is exactly how the file sets it.

9. **Type.** Outfit was checked against the banned-default list and against the mark. It stays. The risk is the About page: a geometric display face at 19 px over eight paragraphs can tire. Rule for build: if the About argument reads as "display type pretending to be body" once real copy is in, the body role moves to Figtree and Outfit keeps display and title. That would still be two families, within the limit. Decide it with real text, not now.

10. **The off-white ground.** `#FFFEFA` is one step from the cream-and-terracotta tell. It is 1 % warm and comes from the file rather than from taste, and there is no serif and no terracotta anywhere near it. **Kept**, with a note that if the deployed page reads as cream on a calibrated screen, it drops to `#FFFFFF` with no other change.

11. **Service rows as an accordion.** Accordions are common; cards would have been worse. What keeps this one plexo: the rows are a hairline list with no container, the expanded content uses the page's own 4 / 8 grid instead of a nested card, and nothing gets a shadow. **Kept as specified.**

12. **Empty proof slot.** A blank section on a live page is a smell. **It ships as a component that renders nothing** and is wired into the home page in the right position, so adding proof later is a content change, not a layout change. Nothing visible in this pass.

### Decisions this critique did not change

- The ink block being dark is not the near-black-plus-acid-accent tell: it is the brand's own ink, unmodified, with no accent on it beyond a focus ring.
- The tagline `MARKETING | AI` is tracked all-caps and sits under the hero wordmark. That is the file's own treatment and it appears once.
- The hero is one sentence and one action. No statistics, no gradient numerals, no work teasers, because none of those are true yet.

---

## 2b. Addendum — the results grid (added after the foundation pass)

A bento grid of four metrics sits between the hero and "What we do", replacing an earlier full-bleed stats band. It was brought in from a reference component and restyled to the system rather than shipped as-is: the ink card is the only dark cell and carries a 45° hairline hatch fading from its top-right corner (a drafting texture, so it reads as native); the other three cells are paper with hairline `rule` borders; every corner is `r-4`, not `rounded-3xl`-plus-pills; labels are sentence case in `small`/`mute` rather than tracked caps; numerals are weight 300 with tight tracking. No count-up. The reference's shadcn tokens were mapped, not installed.

Cells: revenue influenced (primary, with one line of context), time to a working build (with a small decorative bar chart), businesses helped, client reviews. Six columns by two rows from 768px, one column below.

Values live in `content/stats.ts` and are placeholders until real figures replace them. The review score in particular should not go live without a source.

## 3. Things marked `[EDIT]` in the brief, restated so they can be corrected

- Services list: the five in the brief are used verbatim as names; copy is drafted plain and short.
- Contact address: `hello@plexoco.io` is assumed throughout. Change once in `content/site.ts`.
- Hero sentence draft: *plexo is a marketing agency in Los Angeles that uses AI for the work it is good at, and people for the rest.*
- About thesis: see 1.8.
- Budget ranges: Under $10k, $10–25k, $25–75k, $75k+, Not sure yet (as chips, not a dropdown).
