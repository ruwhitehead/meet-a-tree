# Meet a Tree 🌿

**Learn the trees you already walk past.**

A free, offline-capable progressive web app: a field guide to 50 trees of Britain and Ireland, a way of
identifying one from its leaf, and a record of the individual trees you decide to follow through a year.
Made in support of the [International Tree Foundation](https://internationaltreefoundation.org) —
registered charity no. 1106269.

**Live:** https://meet-a-tree.vercel.app

Not public yet. The old `ruwhitehead.github.io/meet-a-tree` address is retired and forwards here
(see [issue #9](https://github.com/ruwhitehead/meet-a-tree/issues/9)).

## The five surfaces

| Surface | What it is |
|---|---|
| **Today** | One tree fact, one tree to meet, and anything your own trees are due to do this week. Deliberately five blocks, not ten. |
| **Identify** | Photograph a leaf for automatic matching (needs a Pl@ntNet key — see below), or answer three questions in an offline field key. Habitat guidance sits underneath for when both fail. |
| **My Trees** | Two views of one idea: **Following**, the individual trees you track through the year, and **Species met**, the guide with everything you have identified. |
| **Seasons** | Six time-boxed hunts covering the whole year — Blossom Watch, Conker Hunt, Autumn Colours, Midwinter Evergreens, Winter Twigs, Summer Shade. Boards fill themselves from what you identify. |
| **Learn** | Search all 50 trees by common, Latin or folk name. Species a running hunt is looking for are marked "findable now". |

The thing that makes it worth keeping: record when one tree comes into leaf two years running and it tells
you **"first leaves 10 days earlier — 8 Apr this year against 18 Apr in 2025"**. Those are the same
first-event dates phenology networks have collected in Britain since 1736, and the app will prepare a
record for you to submit to Nature's Calendar.

## Stack

- **SvelteKit** (Svelte 5 runes) + `adapter-vercel`, runtime pinned to `nodejs22.x`
- **TypeScript**, no runtime dependencies
- Hand-rolled service worker via `$service-worker` — network-first for pages, cache-first for immutable assets
- Every page prerendered; one server route (`/api/identify`) so the Pl@ntNet API key stays server-side
- **Local-first**: records in `localStorage`, photos as blobs in IndexedDB, no accounts, nothing uploaded

See [ARCHITECTURE.md](ARCHITECTURE.md) for how it fits together, and [DESIGN.md](DESIGN.md) for why it
looks and behaves as it does — including the decisions to remove things.

## Develop

```bash
npm install
npm run dev      # dev server — it has served stale bundles more than once; trust production
npm test         # 43 unit tests (field key, content depth, missions, records, install, Pl@ntNet, photos)
npm run check    # svelte-check
npm run build    # fails on Windows: adapter-vercel needs symlinks. Vercel builds on Linux, so deploy instead
npm run icons    # regenerate PWA icons from the SVG mark
```

Content and asset tooling, run directly with `node`:

| Script | Purpose |
|---|---|
| `scripts/fetch-species-images.mjs` | Fetch, crop and credit every species photo from Wikimedia Commons |
| `scripts/curate.mjs` | Pull four habit and four leaf candidates per species and build contact sheets to choose from |
| `scripts/candidates.mjs` | Earlier variant of the same idea, kept for reference |
| `scripts/og-card.mjs` | Regenerate the 1200×630 link-preview card |
| `scripts/icons.mjs` | PWA icons from the inline SVG mark |

## To switch on photo identification

`/api/identify` is deployed and returns `{"ok":false,"reason":"not-configured"}` until a key exists:

1. Get a free key from [my.plantnet.org](https://my.plantnet.org) (~500 identifications a day).
2. Add `PLANTNET_API_KEY` to the Vercel project (Production, Preview, Development).
3. Redeploy.

The three-question field key stays as the unlimited, offline fallback either way.

## Honest caveats

- **ITF sign-off is outstanding.** Their name, logo and charity number are used on the strength of a family
  connection, not written permission — see [issue #8](https://github.com/ruwhitehead/meet-a-tree/issues/8).
- **No backup yet.** Trees and photos live in one browser on one device; clearing site data destroys them.
  [Issue #1](https://github.com/ruwhitehead/meet-a-tree/issues/1) is the fix, and it matters more than it sounds.
- **iOS keeps no copy of your photos.** A photo taken inside a browser never reaches the Photos library, so
  each one offers a "Save to Photos" button. Android's camera app usually saves one already.
- **The canonical URL is a constant.** `src/lib/site.ts` holds it, for absolute Open Graph URLs. Update it if
  the app moves to a custom domain.
- Content lives in `src/lib/content/` as typed data, so new species are reviewable pull requests.
- "Grove" survives as the in-app noun for species you have met. The brand is Meet a Tree.
