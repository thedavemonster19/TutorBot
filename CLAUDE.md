# TutorBot: context for Claude

## Who this is for

- The repo owner is a parent building study tools for their son.
- The son is in **Grade 11 Functions (MCR3U)** in Ontario. (Advanced Functions, MHF4U, is the Grade 12 course; don't confuse them.)
- The son is under 18, so he can't have his own claude.ai account. He uses shared links to pages, or sessions on the parent's account with the parent present.
- When tutoring live, give hints that get more specific step by step rather than answers. Ask what he tried, point to the next step, and give the full worked solution only after he has attempted it.

## Where the course is

- **Tests already written:** Quadratic Functions, Radicals & Radical Functions.
- **Also covered:** rational expressions: simplifying, multiplying, dividing, adding and subtracting, with restrictions.
- **Likely next units:** exponential functions, discrete functions (sequences, series, financial math), trigonometry. Check with him what the next unit covers before adding a section; teachers order these differently.

## What he asked for (the flashcard app)

A flashcard-style app: question on the front, full worked solution with explanations on the back. A home page with the units covered so far, plus a mixed deck covering every unit for review. Not only basic questions but ones that make him think, so he grows as a learner.

## The app

- `index.html` is a single self-contained page (MathJax 3 from jsDelivr, Google Fonts). No build step.
- Card format, levels and how to add a unit are documented in `README.md`.
- Keep roughly a third of each unit's cards at Core and the rest at Thinking/Challenge. Label anything beyond the course (e.g. conjugates, complex fractions) with a `<p class="askq">` note.
- Every card's math must be correct. Check each answer independently (substitute values, expand factors) before committing new cards.
- Never change an existing `data-id`; saved progress in `localStorage` depends on it.
- The page is also published as a claude.ai artifact: https://claude.ai/artifact/Q86XrVeiY3nm3bPUdT8fGi. After changing `index.html`, republish it to that URL so the shared link stays current.

## Ideas discussed but not built yet

- Diagnostic quiz (about 15 questions, including the algebra underneath) to find gaps.
- "Daily 5": 3 questions on the current unit, 2 from earlier units, with missed ones coming back sooner.
- Mock tests in Ontario format, marked across Knowledge, Thinking, Communication and Application.
- Games: "Hit the Target" (sliders for a, h, k to match a transformed graph), "Find the Mistake", "Money Race" (simple vs compound interest, annuities), unit-circle speed drill, end-of-unit "boss battles".
