# plexo co. — website

Marketing site for plexo co., an AI-native marketing agency in Los Angeles. Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion. Hand-built, no component library, no CMS.

The design rationale, the measured logo geometry and the critique that shaped the build are in [DESIGN.md](DESIGN.md).

## Setup

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
|---|---|
| `npm run dev` | dev server with hot reload |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

Deploy target is Vercel: import the repository and it builds with defaults.

## Where things live

```
app/                 routes (App Router)
  layout.tsx         font, header, ink block footer, skip link
  page.tsx           home: hero, stats band, services, process, proof slot
  services/ about/ contact/
  globals.css        the design tokens (@theme) and the hero sequence
components/          hand-built UI, one file per component
  Logo.tsx           the mark, inlined, currentColor; lockup and monogram variants
  HeroMark.tsx       the hero lockup with the rule that draws on load
  logo-paths.ts      GENERATED path data, do not edit
content/             all copy, typed, one file per page or concept
scripts/trace-logo.mjs  regenerates components/logo-paths.ts from plexo-logo.svg
public/plexo-logo.svg   the padded original, untouched
public/plexo-logo.png   raster, for OG images and social only
```

### Content

Everything a person might want to change is in `content/`:

- `site.ts` — name, tagline, email, city, founding year, nav.
- `home.ts` — hero sentence, CTA labels, section intros.
- `services.ts` — the five services: name, one-line summary, what it is, what you receive, who it is for.
- `process.ts` — the four steps.
- `stats.ts` — the four metrics in the band under the hero, as display strings (`"$1.5M+"`). Placeholders until real figures exist; the count-up parses the number out and leaves prefix and suffix static.
- `about.ts` — the About page argument and the "what we will not do" list.

Each file exports plain typed objects. Swapping in a CMS later means replacing the export, not the components.

### Design tokens

Defined once, in the `@theme` block at the top of `app/globals.css`. That block is the Tailwind v4 config: colours (`ink`, `paper`, `mute`, `rule`, `live`, `live-on-ink`), type roles (`text-display`, `text-title`, `text-body-lg`, `text-body`, `text-small`, `text-fact`, `text-tagline`), radii (`rounded-1` to `rounded-4`, derived from the logo's corner ratio), breakpoints and the content container. Nothing else in the codebase declares a colour or a radius.

### The logo

`plexo-logo.svg` is 52 outlined paths on a 1500 × 1500 canvas. `scripts/trace-logo.mjs` extracts the wordmark, the `co.`, and the baseline rule into `components/logo-paths.ts`, drops the hardcoded fill so the mark inherits `currentColor`, and records the tight bounding boxes for the two lockups. If the logo file changes:

```bash
node scripts/trace-logo.mjs plexo-logo.svg components/logo-paths.ts
```

The baseline rule is a stroke in the source file (the letters are fills), which is what lets the hero draw it on load with `stroke-dashoffset`.

## What is stubbed

- **Contact form.** Build step 5. The page currently shows the email address. The form, its validation and the route handler are next; the email send inside the handler will be a marked `TODO` for the provider.
- **Proof section.** `components/ProofSlot.tsx` sits between "How we work" and the contact CTA on the home page and renders nothing until it is given items. Adding results later is a content change.
- **Metadata, OG images, sitemap, robots.** Build step 6. Basic titles and descriptions exist per page; the rest is not there yet.
- **Email.** The domain is `plexoco.com`. `content/site.ts` assumes `hello@plexoco.com`, which is marked `TODO` until a mailbox exists on the domain.

## Motion

One page-load sequence, on the hero: the rule draws in from beyond the viewport edge, under the word and up into the `o`, then the tagline and sentence appear. It is pure CSS, so it runs from the server-rendered HTML. Everything else animates only in response to the reader (row expand, menu open, button hover). `prefers-reduced-motion` renders every animation finished.
