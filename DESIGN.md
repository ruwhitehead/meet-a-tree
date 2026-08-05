# Design

Why the app looks and behaves as it does. The decisions to *remove* things matter as much as the
additions, so they are recorded here too.

## What the app is for

One feeling: **attachment to specific, individual trees**. Not species counted, not a streak maintained —
a particular oak at the end of a particular road, whose behaviour you come to know. Everything else exists
to serve that, and the giving ask exists because someone who feels it may want to plant a real one.

## Brand: an ITF echo, made accessible

Colours were read from `internationaltreefoundation.org`'s own stylesheets rather than guessed:

| Token | Value | Role |
|---|---|---|
| `--green` | `#167E3C` | ITF's green. Buttons, the camera control, giving surfaces |
| `--forest` | `#1C3B23` | ITF's dark green. Depth, folklore |
| `--stone` | `#E1DFD9` | ITF's warm stone. Calm surfaces |
| `--ink` | `#1E1E1E` | ITF's body colour |
| `--deep` | `#0E5C2B` | **derived.** ITF's green fails AA on tinted grounds, so small text uses this |
| `--deep` (dark) | `#7CC98F` | dark-theme accent, 8:1 on forest grounds |

That derived green is the single most important token: ITF's brand green only just passes AA on white and
fails on our washes, so **brand green is never small text**. Every pair is AA or better in both themes.

### Type

ITF set headings in Adobe Caslon Pro and body in Inter Tight. We use **Inter Tight exactly**, and
**Libre Caslon Text** — an open Caslon revival — for display, so the app reads as theirs without a
commercial licence.

The split is by *purpose*, not decoration:

- **Spotting notes are instructions**, read standing under a tree: Inter Tight, 16px, full-contrast ink.
- **Folklore is storytelling**: Libre Caslon Text, 17px. It is the reason someone falls for a tree rather
  than merely naming it, so it reads as prose.
- Numbers that line up get `tabular-nums`.

## The identity: a modern field notebook

This direction survived being argued against, which is why it is worth writing down.

**The proposal** was to make the hand-drawn leaf silhouettes — the most characterful thing in the app —
into its visual language: dividers, badges, loading states, section markers.

**The challenge:** *"You are proposing a mascot, not an identity. Those silhouettes are diagrams; they
exist to teach leaf shape in the key. Reuse them as decoration and they stop reading as information. And
you are fixing the wrong thing — the app looks generic because the photographs are inconsistent, not
because it lacks ornament. What actually distinguishes it is a thousand words of real writing per tree and
dated records nobody else has."*

**The resolution**, in priority order:

1. **Photographic discipline first.** One crop geometry throughout (900×675, 240×240), and every one of the
   50 species chosen by eye from contact sheets. This mattered more than any ornament.
2. **The season spine is the motif** — a 4px coloured left border: spring `#8FBF5A`, summer `--green`,
   autumn `#C8862F`, winter `#6B7F8A`. It appears on tree timelines, species calendars, seasonal hunts and
   guide rows, and it earns its place because the colour carries information. One shared
   `seasonOfMonth()` backs all of them so a given green always means the same thing.
3. **The Caslon/Inter split is the voice.**
4. **Leaf silhouettes stay strictly diagrammatic** — the challenger was right.

## Standing rules

- **Never information by colour alone.** The season spine always sits beside a date, an event name or a
  "findable now" label.
- **Never a paywall.** A locked feature turns an enthusiast into an ex-user. Everything is free forever.
- **Never invent impact figures.** ITF deliberately publish no "£X plants Y trees" claim, so neither do we.
  Their actual strongest ask — a monthly gift matched for the first 12 months — is quoted instead, in their
  words, with their real programmes named (West Pokot, Dundori, Mutaluni).
- **One ask, not four.** Four vague donate links became one `Give` component.
- **Ask for permissions at the point of intent.** The camera opens from a tap and needs no dialog at all
  (`<input capture>`); location is never requested; notifications are not implemented yet and would come
  after a week of use, never on arrival.
- **Prefer removing a concept to adding one.**
- **Lighthouse accessibility 100 is a release gate**, not an aspiration.

## Things deliberately removed

| Removed | Why |
|---|---|
| **The streak** | A number that goes up is a chore, and it quietly punished a missed day — contradicting "generosity, not guilt". Personal records do the same job with substance: *"first leaves 10 days earlier than last year"*. |
| **Badges** | Generic gamification ("First Find", "Ten Trees"), and redundant once records said something true. |
| **"Near You"** | Read-once and inert. Without location it offered no insight; with location it would have shown patchy decades-old GBIF records as if they were fact. Its habitat guidance moved into Identify, where it helps at the moment you are narrowing candidates. |
| **The My Grove tab** | Two tabs for one idea that nobody could tell apart — my error for building both. Merged into My Trees as a second view, which freed a tab for Seasons. |
| **Four cards on Today** | Each existed only to say "there is a tab for this". Ten blocks became five: one thing to read, one tree to meet, your trees, the ask, the lockup. |

## Interaction decisions

- **App-shell layout.** Content scrolls *inside* `main`, with the tab bar a static sibling. A sticky bar
  always covers whatever scrolls beneath it — an accessibility failure and an annoyance when the covered
  thing is a link.
- **Tabs replace history.** Switching tabs uses `data-sveltekit-replacestate`, so Back never walks a trail
  of tab switches and the first Back from the app root exits cleanly.
- **Install nudging is patient.** Asked from the second visit, or immediately after a delight moment
  (tagging a tree, adding a species) because that is when someone wants the app kept. "Not now" snoozes for
  four days; three refusals is a final no. It renders on every screen, since most arrivals come via a
  shared species link.
- **iOS honesty.** A photo taken in a browser never reaches the Photos library, so the app says so and
  offers "Save to Photos" via the share sheet — the only route in, and it cannot be automated.
- **Empty states are designed, not described.** A new tree shows an outlined ghost timeline of what a year
  will look like; a new grove leads with six trees on every British street rather than 50 grey silhouettes.

## Voice

Plain, specific, unhurried. Hyphens rather than em dashes in UI copy where it reads better; no exclamation
marks; no emoji as section markers (a couple survive as deliberate warmth in toasts). Every species ends
with a "one to tell" — a fact written to be repeated aloud, because that is how the app spreads.

Errors say what happened and what to do: *"Today's identifications are used up. The questions below don't
use it at all."*

## Open design questions

- **Photographic treatment.** Geometry is consistent and sources are curated, but there is no grade or
  filter unifying 100 photographs from as many photographers.
- **The habit shots are the weaker half.** A few are compromises — alder is foliage rather than a whole
  tree, black poplar is bare, the lime avenue has a road sign in it.
- **No comparison view.** The content names confusable pairs (English vs sessile oak, blackthorn vs
  hawthorn) but there is no side-by-side, which would be the most useful reference feature left.
- **Seasonal chrome.** The app looks identical in February and August; the season is known and unused
  outside the spine.
