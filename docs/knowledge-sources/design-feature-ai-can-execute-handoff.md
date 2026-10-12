# Design a Feature AI Can Execute Without Guessing — Knowledge Handoff

> **Source:** Unlearn / Product Engineer, 7 lessons, shared by the learner in the October 2026 conversation “unlearn 3”.  
> **Status:** All seven lesson transcripts were shared in that original conversation. This handoff was reconstructed from retrievable lesson-level details and summaries; not every line of verbatim transcript was available in the current session. Therefore this is a **high-confidence conceptual handoff**, not a verified line-by-line transcription or exact reconstruction of instructor prompts.  
> **Destination:** `docs/knowledge-sources/design-feature-ai-can-execute-handoff.md` in `viniciuspizettadesouza/engineering-case-studies`.  
> **Labels:** **[COURSE]** = supported course lesson detail; **[RECONSTRUCTED]** = adapted prompt, example, schema or inferred workflow; **[ENGINEERING EXTENSION]** = additional recommendation; **[VERIFY]** = source detail not independently available verbatim.

## 1. Core idea

**[COURSE]** Between deciding what a product does and asking an AI agent to code it lies a critical design step: define **one bounded feature** in sufficient behavioral and technical detail that the agent need not make product decisions invisibly. Decompose that feature into reviewable implementation increments, explicitly reject unapproved scope, preview the implementation approach, and formulate the test plan **before** code generation.

A useful order is:

```text
Approved product specification
 → feature-specific specification
 → technical decisions and non-goals
 → sequenced reviewable steps
 → proposed agent prompts / implementation previews
 → per-step expected tests
 → implement in a controlled branch, inspect, verify
```

A specification is not an excuse to trust the agent blindly. Human decisions remain necessary for product behavior, data safety, dependencies and acceptable trade-offs.

## 2. Feature specifications derived from product requirements

**[COURSE]** Lesson 1, _Give Every Feature Its Own Spec_, extracts a bounded feature into its own Markdown artifact instead of dumping a whole product idea into one coding prompt. The feature document becomes the reference against which technical suggestions and generated behavior can be reviewed.

Include at minimum: purpose and user outcome; actors and authorization assumptions; happy-path behavior; failure and validation states; integration boundaries; dependencies; acceptance outcomes; explicit exclusions; unresolved decisions. Link back to approved product requirements so new product features cannot arrive as incidental implementation details.

**[ENGINEERING EXTENSION]** Keep the product spec authoritative about business requirements; feature specifications detail the approved slice, and executable tasks detail delivery. If feature exploration exposes a product decision, reconcile it into the upstream source first.

### Feature document skeleton [RECONSTRUCTED]

```md
# Feature: <name>

## Provenance

- Source product requirement(s):
- Owner / decision maker:
- Status: draft | reviewed | approved

## Outcome and boundaries

- User outcome:
- In scope:
- Explicitly out of scope:
- Preconditions and permissions:

## Behaviour

- Primary path:
- Errors and invalid input:
- Existing behaviour to preserve:
- Acceptance criteria:

## Implementation constraints

- Approved technologies/packages:
- Data and API assumptions:
- Alternatives and open decisions:

## Delivery and verification

- Dependencies:
- Independently reviewable steps:
- Per-step test plan:
```

## 3. Resolve technical decisions before agent implementation

**[COURSE]** Lesson 2, _Lock In Technical Decisions Before AI Makes Them for You_, demonstrates asking the agent how it would build the feature **based only on the feature document**, reviewing the proposed design and recording decisions before implementation. Authentication is the running example. The course uses Laravel Fortify and a disposable-email-related package decision; the point is controlling choices, not universally endorsing that stack.

Questions worth settling: reuse framework conventions versus custom behavior, supported dependencies, authentication and session boundaries, input validation, routes and redirects, database needs, reuse of existing code, and which responsibilities belong to framework primitives. Distinguish implementation advice from an approved product requirement.

**[RECONSTRUCTED] Prompt:**

> Based **only** on this feature specification, describe the technical decisions you would make before implementation. Identify existing framework capabilities you would reuse, any new dependencies, route/authentication/data choices, major alternatives, and risks. Tag each item as mandated by the spec, a recommendation, or an unresolved decision. Do not write code yet.

**[ENGINEERING EXTENSION]** For a new package, review maintenance/security compatibility and whether the existing stack already solves the problem; prefer the smallest reversible choice consistent with approved requirements.

## 4. Make non-goals an explicit artifact

**[COURSE]** Lesson 3, _Choosing What's Out of Scope_, removes AI-inferred embellishments. The authentication demonstration narrows what registration and login should do and uses the specified post-authentication redirect to `/`. A possible feature is not part of scope merely because the agent offered it.

Non-goals can be behavioral (no unrequested flows), data-related (no additional profile fields), technical (no unnecessary packages) or delivery-related (no unrelated refactor). Record rejected suggestions separately from truly deferred, approved future work.

**[RECONSTRUCTED] Prompt:**

> Audit the feature specification and your proposed implementation for additions not required by the approved requirements. List each inferred flow, page, field, route, dependency, background job or permission, with a reason to retain, defer, or exclude it. Preserve the agreed redirect to `/` where applicable. Do not implement excluded ideas.

## 5. Break work into steps small enough to review

**[COURSE]** Lesson 4, _Break the Feature into Steps You Can Review_, turns authentication into a short sequence of implementation increments rather than one large agent request. A draft **four-step** plan was refined to **three steps** when guest-route protection did not merit a standalone stage. The resulting structure centers on setup, registration, and login/logout, with the remaining concern incorporated where it belongs.

A good step has one observable outcome, explicitly named dependencies, a constrained implementation scope, a clear review point, and tests that can establish completion. Optimize for independent review, not arbitrary file counts. Tests are part of each step, not a single last-minute stage.

**[ENGINEERING EXTENSION]** A small branch/commit can map to a step where this improves inspection; avoid forcing artificial deployability for steps that cannot work independently. Identify coupled migrations and rollbacks when relevant.

### Step template [RECONSTRUCTED]

```md
### Step <N>: <outcome>

- Depends on:
- Behavior implemented:
- Files / subsystems likely affected (indicative, not binding):
- Must not change:
- Tests required before implementation:
- Human review checkpoint:
- Done when (observable evidence):
```

## 6. Preview how the AI will build each increment

**[COURSE]** Lesson 5, _Preview How AI Will Build Each Step_, translates feature steps into concrete agent instructions/prompts, previews agent behavior in Plan Mode and reviews intended edits before approving execution. Branches and diff inspection help constrain review and detect scope creep. The point is not to believe a plausible plan automatically: interrogate its assumptions and make corrections while they are cheap.

**[RECONSTRUCTED] Prompt:**

> Plan **Step N only** using the approved feature specification and step definitions. Identify the existing code you will inspect, intended files and public contracts, migration/dependency impact, exact tests to add, and likely failure states. Show your proposed commands and changes. Flag any missing decision. Make no edits until I review the plan.

Review plan quality using: requirement traceability; no extras; reuse of existing utilities; whether tasks are appropriately sequenced; evidence for declaring done; clarity around irreversible actions.

## 7. Test-first as a control over AI output

**[COURSE]** Lesson 6, _Why Add Tests Before Features?_, contrasts writing tests after a flawed generated implementation with specifying and reviewing tests **before implementation**. The tests define the behavioral target instead of merely ratifying what the agent happened to produce. The important sequence is human-reviewed expectation → failing test (where appropriate) → implementation → green tests → review, not blind faith in a green indicator.

Tests should assert **behavior**, not superficial implementation details or just that a method was invoked. Test expectations themselves must be reviewed, because an incorrectly specified test can enshrine the wrong behavior. Distinguish a test that fails for the intended missing behavior from a test failing because the setup is broken.

**[ENGINEERING EXTENSION]** Use regression tests for existing contracts, negative input and permission boundaries, failure recovery and persistence. Avoid artificially setting a coverage percentage as proof of correctness. Measure whether assertions would detect a meaningful regression.

## 8. Write the test plan before the code

**[COURSE]** Lesson 7, _Write Your Test Plan Before the Code_, works at the **behavioral test-plan level** first, before choosing exact testing APIs. For each implementation step, specify what satisfying that step looks like. The running example includes Laravel/Pest tests, interface and database validation; guest protection is absorbed into relevant steps rather than remaining a separate delivery phase.

### Per-step test matrix [RECONSTRUCTED]

| Step         | Expected behavior                                              | Negative / boundary case                                                          | Evidence layer                                  | Completion signal                      |
| ------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------- |
| Setup        | Authentication integration is installed/configured as approved | No unintended routes or dependencies                                              | Configuration and integration checks            | Approved baseline works                |
| Registration | Valid user can register and gets agreed redirect               | Invalid/disposable email, duplicate credentials, validation failures as specified | HTTP/feature tests; persisted user assertion    | Stored account and response match spec |
| Login/logout | Session establishes and ends as agreed                         | Wrong credentials, unauthenticated access, logout edge case                       | HTTP/session feature tests; browser smoke check | Session and route effects demonstrated |

_Matrix is adapted to the reported lesson example, not a claim that these precise cases appeared verbatim in the course._

**[RECONSTRUCTED] Prompt:**

> Before writing implementation code, produce a test plan for each approved step. For every expected behavior name its precondition, input, observable result, failure case, and required evidence level (unit, feature/integration, persistence, or browser). Do not choose low-level framework test code yet. Identify missing product decisions and ask for resolution.

Then:

> Convert the approved behavioral test plan for Step N into focused tests following the repository's existing conventions (Pest in the course example). Show failures attributable to missing functionality, not broken setup. Do not implement the feature until the expectations have been reviewed.

## 9. Consolidated application workflow [RECONSTRUCTED]

1. Select one approved feature and cite its origin in the product spec or change proposal.
2. Extract or revise the feature specification; make user-visible behavior explicit.
3. Prompt for proposed technical decisions without code; approve or change them.
4. Enumerate scope exclusions and redirect/navigation/permission specifics.
5. Split into outcome-based implementation steps; merge artificial stages.
6. Preview the AI implementation plan for one step and inspect the expected diff surface.
7. Write behavioral test expectations by step; review for mistakes and gaps.
8. Add focused tests, demonstrate meaningful failing cases, implement and verify.
9. Review the diff, runtime behavior, dependencies and tests; advance only when approved.
10. Reconcile upstream specs when the approved behavior changes.

## 10. Engineering trade-offs and anti-patterns

| Choice                          | Benefit                                           | Cost / risk                                      | Useful when                                            |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Upfront technical decisions     | Stops silent architecture invention               | Too early can freeze premature choices           | Framework conventions and security are consequential   |
| Small implementation increments | Narrow diffs and easier course correction         | Excessive splitting creates integration overhead | Agent touches broad or unfamiliar code                 |
| Tests before implementation     | Expectations are independent of generated code    | Tests can themselves specify the wrong behavior  | Behavioral bugs could be disguised by agent confidence |
| Reviewing agent Plan Mode       | Identifies unwanted changes before tool execution | Plan may omit hidden runtime effects             | Complex changes, dependencies or migrations            |
| Constrained V1                  | Prevents feature creep                            | Valuable enhancement may need separate tracking  | Product scope is intentionally narrow                  |

Avoid: having the AI select unauthorised extras; equating a framework scaffold with a finished feature; treating tests written after code as independent evidence; letting one broad prompt simultaneously invent requirements, tests and production changes; using unchecked “done” checkboxes instead of observable acceptance.

## 11. Connections to other Unlearn courses

- **Unlearn 1 — Spec a Product Before AI Builds It:** resolves overall product intent, users, V1 boundaries and feature inventory. This course takes **one** approved feature deeper.
- **Unlearn 2 — Spec-Driven Development with OpenSpec:** creates change proposals, design, tasks and behavioral deltas for evolving a codebase. This course contributes practical feature-level decisions, step boundaries and **test planning** to such a change.
- **Unlearn 4 — Build Features with an AI Agent:** operationalizes the reviewed design through agent instructions, tooling, tests, hooks, branch discipline, code review, and resumable checklists.

These are complementary levels of abstraction, not four interchangeable document formats.

## 12. Potential active-recall Q&A (INACTIVE SOURCE ONLY)

| ID    | Question                                                                | Answer                                                                                                             |
| ----- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| FD-01 | Why give a feature its own specification?                               | It defines one bounded outcome and its behavior without making the agent infer the whole product.                  |
| FD-02 | How does a feature spec differ from the product spec?                   | It details approved behavior for one capability; the product spec owns overall intent and scope.                   |
| FD-03 | Why ask for technical decisions before code?                            | To surface and approve dependencies, patterns and trade-offs before they become hidden implementation commitments. |
| FD-04 | What is the risk of treating AI suggestions as requirements?            | Silent scope expansion, unwanted UX/data/permission behavior and rework.                                           |
| FD-05 | What scope was explicitly demonstrated in the auth case?                | Use agreed flows and an explicit `/` redirect; reject unrequested additions.                                       |
| FD-06 | Why was a four-step plan shortened to three?                            | Guest-route protection did not need a separate work stage; steps should map to meaningful outcomes.                |
| FD-07 | What should a reviewable implementation step contain?                   | Outcome, dependencies, behavior boundaries, tests and an approval checkpoint.                                      |
| FD-08 | What does Plan Mode help validate before implementation?                | Files and commands likely to change, assumptions, dependencies and scope alignment.                                |
| FD-09 | Why write tests before the agent-generated feature?                     | Tests capture independent intended behavior rather than merely endorsing generated code.                           |
| FD-10 | What is the danger of an incorrect test?                                | It can make a wrong behavior appear correct and durable.                                                           |
| FD-11 | What belongs in a test plan before framework-specific test code?        | Preconditions, stimulus, expected outcomes, edge/failure cases and evidence level.                                 |
| FD-12 | Does passing unit tests prove a UI flow works?                          | No. Appropriate integration/browser and persistence evidence may also be needed.                                   |
| FD-13 | Why reconcile a feature decision upstream?                              | To prevent a downstream document becoming a competing source of product truth.                                     |
| FD-14 | What distinguishes a genuine incremental step from arbitrary splitting? | An independently comprehensible, verifiable outcome.                                                               |
| FD-15 | What does “test-first” NOT mean?                                        | It does not mean blindly trusting generated tests or asserting only implementation details.                        |

**Study Mode constraint:** Do not register, seed, expose or activate these questions as cards until the repository's existing practical stability log records a Proceed decision and existing catalog deduplication is completed.

## 13. Lesson source map and retrieval limits

| Lesson | Original title                                           | Preserved distinctive teaching                                                | Source confidence                                                  |
| ------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1      | Give Every Feature Its Own Spec                          | Standalone Markdown feature spec derived from broader product requirements    | Transcript previously shared; current detail retrieved via summary |
| 2      | Lock In Technical Decisions Before AI Makes Them for You | Laravel Fortify, package choice, technical-design interrogation before coding | Transcript previously shared; current detail retrieved via summary |
| 3      | Choosing What's Out of Scope                             | Reject invented features and lock down intended redirect `/`                  | Transcript previously shared; current detail retrieved via summary |
| 4      | Break the Feature into Steps You Can Review              | Four-step auth plan refined to three; meaningful boundaries                   | Transcript previously shared; current detail retrieved via summary |
| 5      | Preview How AI Will Build Each Step                      | Agent prompts, Plan Mode, branch/diff review                                  | Transcript previously shared; current detail retrieved via summary |
| 6      | Why Add Tests Before Features?                           | Contrast post-hoc tests with reviewed tests-first behavior                    | Transcript previously shared; current detail retrieved via summary |
| 7      | Write Your Test Plan Before the Code                     | Behavioral per-step test plan; Pest, UI and database evidence                 | Transcript excerpt present in project context, plus summary        |

**Unverified from exact transcripts:** precise original instructor prompt wording, detailed timing and individual screen interactions, exact package identifier/version, exact auth field names and every concrete test assertion. Any prompts and matrices above are **reconstructed**, not quoted course assets. Course coverage is **7/7 lessons at topic level**, not 7/7 verbatim transcript re-audit.

## 14. Codex integration guidance

Treat this file as archived **source knowledge**. Keep it unchanged in `docs/knowledge-sources/` (other than corrections and source provenance). Integrate reusable guidance into the existing canonical `apps/portfolio/src/content/handbook/specification-driven-development.md` at feature-design/test-planning sections or a justified separate canonical topic; cross-link to `testing-delivery-and-devops.md`. Keep reusable prompts with the canonical chapter rather than opening a parallel prompt subsystem. Maintain the five-stage roadmap, and preserve the Study Mode Hold gate. Do not initialize OpenSpec or implement demonstration authentication features in this learning repository.
