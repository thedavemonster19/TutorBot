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
