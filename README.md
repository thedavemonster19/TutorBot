# TutorBot

Study tools for Grade 11 Functions (Ontario, MCR3U).

## Functions Flashcards

`index.html` is a single-page flashcard app. Open it in any browser; there is no build step and no server.

- **Home page:** one deck per unit covered so far, plus a **Mixed Review** deck with every card shuffled.
- **Front:** the question, with an optional hint.
- **Back:** the answer, a step-by-step solution, a "Why it works" note and a "Watch out" box with the most common mistake.
- **Levels:** Core (standard test questions), Thinking and Challenge (questions that go past the basics).
- **Tracking:** mark each card "Still learning" or "Got it". Still-learning cards come back later in the round. Progress is saved in the browser's `localStorage` (key `mcr3u-flashcards-v1`), so it stays on one device and browser.
- **Keys:** `Space` flip · `H` hint · `1` still learning · `2` got it · `←` `→` move.

### Units

| Unit | `data-unit` | Cards |
|---|---|---|
| 1. Rational Expressions & Factoring | `rationals` | 14 |
| 2. Quadratic Functions | `quadratics` | 13 |
| 3. Radicals & Radical Functions | `radicals` | 12 |
| 4. Rational Functions (current) | `ratfuncs` | 14 |
| Mixed-only (questions that join units) | `mixed` | 3 |

The current unit is set by `CURRENT` in the script and is shown first on the home page.

### Study mode (endless practice)

Every unit, and Mixed Review, opens in **study mode** instead of a fixed deck. There are 41 skill generators: 10 in Unit 1, 9 in Unit 2, 10 in Unit 3 and 12 in Unit 4. Mixed Review draws from all of them, the way a test mixes topics.

- There are no "card 3 of 14" counters. Each question is freshly generated with random numbers, and the unit's hand-written cards are mixed in about 30% of the time.
- Skills he has missed recently come up more often. A question marked "Still learning" comes back about four questions later.
- **Progress** opens a panel with this session's tally, accuracy over the last 10 tries per skill, the weakest skills (each with a tip and a "Practise just this" button) and skills not tried yet. **Copy a summary to send** produces a text summary to paste to a parent or to Claude.
- Study history is saved in `localStorage` under `mcr3u-study-v1`.

Generators live in the `<script id="study-gen">` block, grouped by unit and keyed by skill. Each has a `name`, `level`, `tip` and a `gen()` that returns `q`, `hint`, `ans`, `steps`, `whyT`/`why`, `trap` and a `verify()`. `verify()` must re-check the stated answer numerically from the original function, not from the formula used to build it. Hand-written cards join a skill's pool through `data-skill="<skill>"`. Mixed-only cards use `data-skill="<unit>:<skill>"` so their results count toward that unit's skill.

After changing any generator, run:

```bash
node tests/generators.test.js 5000
```

### Practice tests

The home page has a practice test card for the current unit (Unit 4, for the Nov 9 test). It shows a full 60-minute test on one page, grouped into Knowledge and Understanding, Application, Thinking and Communication with marks per question. After "I'm finished", each question shows the answer, a marking scheme with one tickbox per mark, and the full solution (the sketch question draws the correct graph). Results show marks per category, the Ontario level and the skills that lost marks, each with a button into study mode for that skill. A version in progress is saved in `localStorage` (`mcr3u-tests-v1`); "Start a new version" makes a fresh one.

### Adding cards

Cards live in the hidden `<div id="cards">` block as `<article>` elements:

```html
<article data-id="q14" data-unit="quadratics" data-level="think">
  <div class="q"><p>Question, with math in \( ... \)</p></div>
  <div class="hint">Optional hint.</div>
  <div class="ans">Short final answer.</div>
  <div class="sol">
    <ol class="steps"><li>Step one.</li></ol>
    <p class="why"><b>Why it works.</b> ...</p>
    <p class="trap"><b>Watch out.</b> ...</p>
  </div>
</article>
```

- `data-unit`: one of the keys above. A new unit also needs entries in `UNITS` and `UNIT_NO`, and a place in the list in `renderHome()`.
- `data-level`: `core`, `think` or `challenge`.
- `data-id` must be unique and should never change, because saved progress is keyed on it.
- Math is rendered with MathJax 3 (inline `\( \)`, display `\[ \]`).

### Hosting

The page is also published as a private Claude artifact. To host it from this repo, turn on GitHub Pages (Settings → Pages → deploy from `main`, root folder).
