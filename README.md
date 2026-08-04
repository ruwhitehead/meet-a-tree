# Meet a Tree 🌿

**Fall in love with the trees you walk past every day.**

A free, offline-capable PWA field companion — identify trees, collect the species around you,
learn their folklore and science — in support of the
[International Tree Foundation](https://internationaltreefoundation.org) (registered charity no. 1106269).

**Live:** https://meet-a-tree.vercel.app

(The old `ruwhitehead.github.io/meet-a-tree` address is retired and now redirects — see issue #9.)

## What it does (v0.1)

- **Today** — one tree fact a day, seasonally aware, with a gentle streak
- **Identify** — point-of-need camera (zero-permission `input capture`) + a three-step offline field key
- **Species guide** — 12 UK species, each with spotting marks, folklore, science, and a "one to tell"
- **My Grove** — a local-first collection with badges and a running CO₂ tally (localStorage, no account)
- **Share cards** — canvas-rendered 1080×1080 posters via the Web Share API, carrying the Meet a Tree × ITF lockup
- **Giving moments** — celebration modals at 5 and 10 species linking to ITF's donate page; never a paywall
- **Installable PWA** — service worker precaches the entire guide; works with no signal

## Stack

SvelteKit (Svelte 5) + `adapter-static`, TypeScript, hand-rolled service worker via `$service-worker`.
No runtime dependencies. Deploys to GitHub Pages via Actions (`BASE_PATH=/meet-a-tree`); designed to move to
Vercel with `adapter-vercel` when the Pl@ntNet camera-ID proxy and live GBIF data land (v1).

Design tokens echo ITF's brand (green `#167E3C`, forest `#1C3B23`, stone `#E1DFD9`;
Libre Caslon Text as an open stand-in for Adobe Caslon Pro, plus Inter Tight).
Every text/background pair is WCAG AA or better; **Lighthouse accessibility 100 is a CI release gate**.

## Develop

```bash
npm install
npm run dev        # dev server
npm test           # unit tests (streak, field key, content integrity)
npm run check      # svelte-check
npm run build      # production build (Vercel adapter)
npm run icons      # regenerate PWA icons from the SVG mark
```

## Notes

- "Near You" ships with sample data; the live GBIF/iNaturalist feed arrives with the Vercel phase.
- Use of ITF's name, logo and impact figures in a public launch requires their written sign-off.
- Content (species facts, folklore, science) lives in `src/lib/content/` — additions welcome as PRs.
- "Grove" survives as the in-app collection noun; the brand is Meet a Tree.
