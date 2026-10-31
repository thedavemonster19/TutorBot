# TutorBot: context for Claude

## The goal: raise his mark

The parent's standing instruction: **the goal is to raise his marks, not to entertain or build games for their own sake.** Judge every feature, card and session by whether it moves his mark. Keep these principles in mind at all times, and **remind the parent and son of them when relevant** (when planning a week, before a test, when he's skipping a step):

1. **Diagnose first.** Find the actual gaps, including the algebra underneath. Most lost marks come from a few repeated errors.
2. **Short, frequent, mixed practice.** 15–20 minutes most days, current unit plus earlier units, with missed questions coming back sooner. Beats re-reading and cramming.
3. **Work on paper, then get it marked.** He photographs his written work and Claude shows exactly where it went wrong. This gives the most improvement per minute.
4. **Practice tests in the teacher's format** a few days before each real test, marked across Knowledge, Thinking, Communication and Application. Thinking and Communication are where marks usually go.
5. **Keep an error log.** Track his repeat mistakes and drill those specifically.

Build on the teacher's schedule (`docs/course-plan.md`): have each unit's material ready **before** the unit starts and a practice test ready **3–4 days before** each test date.

## Who this is for

- The repo owner is a parent building study tools for their son.
- The son is in **Grade 11 Functions (MCR3U)** in Ontario. (Advanced Functions, MHF4U, is the Grade 12 course; don't confuse them.)
- The son is under 18, so he can't have his own claude.ai account. He uses shared links to pages, or sessions on the parent's account with the parent present.
- When tutoring live, give hints that get more specific step by step rather than answers. Ask what he tried, point to the next step, and give the full worked solution only after he has attempted it.

## Where the course is

- **Tests already written:** Quadratic Functions, Radicals & Radical Functions.
- **Also covered:** rational expressions: simplifying, multiplying, dividing, adding and subtracting, with restrictions.
- **Teacher's schedule:** `docs/course-plan.md` (Unit 4 test Nov 9, then Unit 5 Exponential, Unit 6 Trig Ratios, Unit 7 Trig Functions). Units 1–4 topics and the plan after Jan 11 are still to come.

## What he asked for (the flashcard app)

A flashcard-style app: question on the front, full worked solution with explanations on the back. A home page with the units covered so far, plus a mixed deck covering every unit for review. Not only basic questions but ones that make him think, so he grows as a learner.

## The app

- `index.html` is a single self-contained page (MathJax 3 from jsDelivr, Google Fonts). No build step.
- Card format, levels and how to add a unit are documented in `README.md`.
- Keep roughly a third of each unit's cards at Core and the rest at Thinking/Challenge. Label anything beyond the course (e.g. conjugates, complex fractions) with a `<p class="askq">` note.
- Every card's math must be correct. Check each answer independently (substitute values, expand factors) before committing new cards.
- Never change an existing `data-id`; saved progress in `localStorage` depends on it.
- The page is also published as a claude.ai artifact: https://claude.ai/artifact/Q86XrVeiY3nm3bPUdT8fGi. After changing `index.html`, republish it to that URL so the shared link stays current.

## Delivery

- He uses the shared claude.ai artifact link as a signed-out visitor (he can't have an account), so the page must work fully as a static page. Progress lives in `localStorage`.
- Results get back to Claude by an end-of-quiz summary he screenshots or copies to the parent, who pastes it into a session.
- In-page Claude features (`sample`, `db`) only work signed in on the parent's account. Use those only for supervised sessions, never as his everyday tool.

## Planned (agreed, not built yet)

- Diagnostic covering the whole course (agreed to wait for the teacher's plan; plan received).

## Ideas discussed but not built yet
- "Daily 5": 3 questions on the current unit, 2 from earlier units, with missed ones coming back sooner.
- Mock tests in Ontario format, marked across Knowledge, Thinking, Communication and Application.
- Games: "Hit the Target" (sliders for a, h, k to match a transformed graph), "Find the Mistake", "Money Race" (simple vs compound interest, annuities), unit-circle speed drill, end-of-unit "boss battles".
