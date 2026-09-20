# Adaptive Study System Implementation Plan

## Implementation progress

_Last updated: 2026-09-20_

Legend: **[x]** complete · **[~]** partially complete · **[ ]** pending

### How this plan is used

This document is the implementation source of truth for the Study System.

- The detailed product, learning, architecture, content, accessibility, testing, and non-goal sections below define the intended behavior.
- The checklist in this progress section maps that intended behavior to the current repository state.
- A phase is marked complete only when its implementation and acceptance criteria are both satisfied.
- Partial work stays marked `[~]`, with the remaining behavior stated explicitly.
- New Study System scope should be added to this document before or with its implementation.
- The execution order in section 65 remains authoritative. Phase 11 must not begin before the current learning loop has been used and stabilized.

### Current phase status

- [x] **Phase 0 — Baseline and architecture decision**
  - [x] Inspect the existing routes and handbook architecture.
  - [x] Record and run the validation baseline.
  - [x] Add ADR 0009 for the local-first Study System decision.
  - [x] Preserve the static GitHub Pages architecture.
- [x] **Phase 1 — Study domain foundation**
  - [x] Add card, progress, history, settings, source, evidence, rating, and memory-state models.
  - [x] Add stable card IDs and duplicate-ID validation.
  - [x] Add handbook topic and heading reference validation.
  - [x] Centralize the production clock and use fixed clocks in scheduler tests.
- [x] **Phase 2 — Interview-derived study catalog**
  - [x] Represent all nineteen technical exercises.
  - [x] Add a curated starter card for every handbook topic.
  - [x] Validate IDs, content, source metadata, categories, topics, and headings.
- [x] **Phase 3 — FSRS scheduler integration**
  - [x] Integrate `ts-fsrs` behind an internal scheduler interface.
  - [x] Create new schedules and preview all four ratings without mutation.
  - [x] Apply reviews and serialize/restore scheduler state.
  - [x] Cover scheduling with deterministic tests.
- [x] **Phase 4 — Local persistence**
  - [x] Add the `StudyProgressRepository` persistence boundary.
  - [x] Persist version 2 progress in namespaced `localStorage`.
  - [x] Recover safely from missing or malformed local data without overwriting it.
  - [x] Support validated JSON export, import, reset, and unknown historical cards.
  - [x] Validate optional persisted fields, including last rating and last-review timestamps.
  - [x] Migrate version 1 settings and storage to version 2 with regression tests.
- [x] **Phase 5 — Daily queue and interleaving**
  - [x] Discover due cards and exclude future reviews.
  - [x] Limit new cards and preserve the consumed daily allowance after review.
  - [x] Apply deterministic priority, interview evidence, lapse, and overdue ordering.
  - [x] Interleave categories without changing FSRS due dates.
  - [x] Preserve the invariant that all due cards precede ordinary new cards while interleaving.
  - [x] Calculate the daily new-card boundary using the learner's local calendar day rather than UTC.
  - [x] Add regression tests for due-versus-new interleaving and local-day boundaries.
- [x] **Phase 6 — Dashboard and active-recall review flow**
  - [x] Add `/study` and `/study/review` routes.
  - [x] Add the today summary and review entry point.
  - [x] Require answer reveal before rating.
  - [x] Show FSRS interval previews for Again, Hard, Good, and Easy.
  - [x] Support keyboard review, persistence, completion summary, and handbook links.
- [x] **Phase 7 — Knowledge Map and history**
  - [x] Add an open five-stage roadmap over every handbook topic and main section.
  - [x] Add `/study/knowledge-map` and `/study/history` routes.
  - [x] Show New, Learning, Review, and Relearning as text as well as color.
  - [x] Show due state, reviews, lapses, stability, and scheduling information.
  - [x] Preserve chronological history and removed-card entries.
- [x] **Phase 8 — Study Plan and workload**
  - [x] Persist session minutes, new-card budget, retention, and interleaving settings.
  - [x] Use session minutes to cap the number of cards in a review session.
  - [x] Make dashboard count and duration describe the actual capped session while keeping the remaining eligible backlog visible.
  - [x] Add configurable study-day availability without hiding due cards.
  - [x] Add optional category emphasis without changing FSRS due dates or due-card priority.
- [x] **Phase 9 — Analytics, backup, and hardening**
  - [x] Show review totals, rating distribution, lapses, and upcoming reviews.
  - [x] Provide export, import, and reset UI with destructive-action confirmation.
  - [x] Cover the main keyboard, persistence, mobile, and accessibility paths with Playwright and axe.
  - [x] Keep formatting, lint, type checking, unit tests, build, and Playwright green.
  - [x] Capture response duration during review for mouse and keyboard ratings.
  - [x] Replace the fallback duration estimate with a median historical estimate after five timed reviews.
  - [x] Add category-distribution analytics.
  - [x] Add component coverage for dashboard states, history, knowledge-map labels, and settings.
  - [x] Exercise export, version 1 migration/import, version 2 import, and reset end to end.
- [x] **Phase 10 — Documentation**
  - [x] Document the learning model, roadmap, scheduling, queue, persistence, backup, privacy, and limitations.
  - [x] Update the README for Case Studies, Handbook, and Study.
  - [x] Record the local-first architecture decision in ADR 0009.
- [ ] **Phase 11 — software-architecture-playbook integration**
  - [~] Confirm practical stability through real Study System use.
    - [x] Define objective exit criteria and an evidence log.
    - [ ] Complete three real sessions across at least two local calendar days.
    - [ ] Validate the historical duration estimate with real timings.
    - [ ] Restore a real version 2 backup and compare progress and settings.
    - [ ] Resolve blocker and high-severity trial findings, then record a proceed/hold decision.
  - [ ] Inventory relevant `software-architecture-playbook` material.
  - [ ] Import only useful concepts into the canonical handbook.
- [ ] **Phase 12 — Deduplication, provenance, and catalog expansion**
  - [ ] Deduplicate imported concepts against the existing handbook and cards.
  - [ ] Preserve the strongest provenance and interview evidence.
  - [ ] Expand the card catalog only after canonical handbook integration.
  - [ ] After a stability proceed decision and architecture-content deduplication, add the planned literature-derived scaling cards: `architecture-failure-driven-scaling`, `architecture-stateless-horizontal-scaling`, `architecture-database-scaling-diagnosis`, `architecture-cache-consistency`, `architecture-background-job-contract`, and `architecture-sharding-tradeoffs`.
  - [ ] Link those cards to canonical handbook headings and use `source: 'literature'`, `interviewEvidence: 'none'`, and normal priority.
  - [ ] Use real-session gaps to guide useful handbook and card coverage.
  - [ ] Review every added card against sections 56–60 before accepting it.
- [ ] **Phase 13 — Evaluate playbook retirement/archive**
  - [ ] Verify imported content, branches, unique material, and Git history.
  - [ ] Preserve an easy-to-find historical reference or tag if appropriate.
  - [ ] Make repository archival or retirement a separate explicit decision.
- [ ] **Future work — cloud sync, multiple learners, parameter optimization, project-derived knowledge, interview simulation, and reviewed AI-generated cards**

### Validation checkpoint

Revalidated on 2026-09-20:

- [x] Formatting
- [x] Lint
- [x] Type checking
- [x] 88 unit/component tests
- [x] Static production build
- [x] 26 Playwright tests across desktop and mobile
- [x] Keyboard review flow
- [x] Accessibility scan with axe
- [x] GitHub Pages-compatible HashRouter/static architecture preserved

### Suggested continuation for tomorrow

1. Follow the [practical stability log](study-system-stability-log.md) while using the current catalog for real review sessions.
2. Accumulate response-duration history and compare the median estimate with actual session durations.
3. Export and restore a real backup in an isolated browser profile, then compare the recorded baseline.
4. Resolve any blocker or high-severity finding and record a proceed/hold decision before starting Phase 11.

---

## 1. Objective

Evolve `viniciuspizettadesouza/engineering-case-studies` from a portfolio + engineering handbook into a portfolio + handbook + personal engineering learning system.

The Study System should help a learner continuously retain engineering knowledge through:

- spaced repetition;
- active recall / retrieval practice;
- interleaved practice;
- adaptive review scheduling;
- visible knowledge retention;
- study rotation;
- progress history;
- interview relevance.

The first version must use the knowledge already present in the Engineering Handbook.

This is intentional.

The current handbook originated primarily from topics that appeared in real software-engineering interviews previously experienced by the repository owner. Those topics therefore have stronger practical evidence and should receive priority over material added later from books, architecture references or other repositories.

Only after the Study System works well with the current handbook should the repository absorb knowledge from `software-architecture-playbook`.

---

## 2. Core Product Principle

The Engineering Practice Lab should eventually answer three questions:

```text
What do I know?
What am I starting to forget?
What should I review today?
```

The handbook remains the canonical knowledge source.

The Study System sits on top of it.

Do not create another disconnected knowledge base.

Conceptually:

```text
Engineering Handbook
        ↓
Study Units / Cards
        ↓
Spaced Repetition Scheduler
        ↓
Daily Study Queue
        ↓
Review History
        ↓
Knowledge Map
```

The learner should move naturally between:

```text
Learn → Recall → Review → Forget slightly → Recall again
```

rather than:

```text
Read once → mark completed → never return
```

---

## 3. Background: What Should Be Preserved from projeto-br4b0

Do not copy `projeto-br4b0` wholesale.

The old project had a different purpose, architecture and application model.

Extract the useful learning concepts instead.

The relevant ideas from `projeto-br4b0` are:

#### Study topics grouped by subject

The old project represented individual subjects/topics rather than treating a whole discipline as one item.

Preserve this idea.

For Engineering Practice Lab:

```text
JavaScript
  Event Loop
  Closures
  Prototypes
  Promises

React
  Effects
  State
  Memoization

Architecture
  Event-driven architecture
  Observer
  Microservices
```

---

#### Sequential study rotation

The old project calculated weekly study load and generated sequential study blocks across different subjects.

Preserve the idea of rotation, but do not preserve the fixed 60-minute implementation.

The new system should rotate knowledge through an adaptive review queue.

---

#### Visual review control

`projeto-br4b0` had a visual matrix representing:

```text
1 Review
2 Reviews
3 Reviews
...
15 Reviews
```

Replace this with meaningful memory state.

Instead of showing only how many times something was reviewed, show concepts such as:

```text
Reviews
Last reviewed
Next review
Difficulty
Stability
Lapses
Current state
```

The old Visual Control becomes the new Knowledge Map.

---

#### Progress tracking

The old project had per-subject progress and performance screens.

Preserve the idea but redefine "progress."

Do not treat:

```text
read = learned
```

or:

```text
lesson completed = knowledge retained
```

Instead use:

```text
due reviews
review history
successful recalls
lapses
review streak
learning state
scheduled interval
```

---

#### Weekly workload

The old project distributed available study hours according to subject weight.

Preserve this idea later as a Study Plan feature.

For the first implementation, review scheduling should be memory-driven rather than time-allocation-driven.

---

## 4. Learning Model

The system should combine four ideas.

### 4.1 Spaced Repetition

Reviews should occur at increasing intervals when knowledge is successfully recalled.

Do not implement a handmade sequence such as:

```text
1 day
3 days
7 days
14 days
30 days
```

Use a real spaced repetition scheduler.

---

### 4.2 Active Recall / Retrieval Practice

A learner should attempt to answer before seeing the explanation.

The normal interaction must therefore be:

```text
Question

↓ learner thinks

Show answer

↓ learner evaluates recall

Again | Hard | Good | Easy
```

Do not show the answer immediately.

Reading the handbook is learning.

Study Mode is recall.

These are separate experiences.

---

### 4.3 Interleaving

Avoid showing many consecutive cards about exactly the same subject when alternatives are available.

Prefer sequences such as:

```text
JavaScript → React → Architecture → TypeScript → JavaScript
```

rather than:

```text
JavaScript → JavaScript → JavaScript → JavaScript
```

Interleaving must affect queue ordering only.

It must not modify the spaced-repetition due dates produced by the scheduler.

---

### 4.4 Adaptive scheduling

The interval should depend on recall performance.

Use the four common ratings:

```text
Again
Hard
Good
Easy
```

Example:

```text
Again   <10m
Hard     2d
Good     5d
Easy    11d
```

The exact values must come from the scheduler.

Never hard-code them in the UI.

---

## 5. Scheduler

Use the actively maintained TypeScript FSRS implementation:

```text
ts-fsrs
```

Do not implement FSRS manually.

Do not use the deprecated/less-maintained `fsrs.js` implementation when `ts-fsrs` satisfies the requirements.

Wrap FSRS behind an internal application service so the rest of the application does not depend directly on the library API.

Example boundary:

```ts
interface StudyScheduler {
  createCard(): StudySchedule
  preview(schedule: StudySchedule, now: Date): RatingPreview

  review(schedule: StudySchedule, rating: StudyRating, now: Date): ReviewResult
}
```

FSRS-specific code should live behind this boundary.

Suggested location:

```text
apps/portfolio/src/study/scheduler/
```

Example:

```text
scheduler/
  fsrs-scheduler.ts
  scheduler.ts
  scheduler.test.ts
```

---

## 6. Retention Configuration

Start with the scheduler's established defaults unless there is a documented reason to change them.

A reasonable initial requested retention target may be around:

```text
0.90
```

but expose this through configuration rather than scattering the value throughout the code.

Do not optimize personal FSRS parameters in the MVP.

Parameter optimization can become a future capability once meaningful review history exists.

Do not invent a minimum review-count threshold without evidence.

---

## 7. Keep Priority Separate from Memory

This distinction is critical.

There are two independent questions.

### Priority

How important is this knowledge?

Example:

```text
Event Loop
Interview evidence: yes
Priority: high
```

### Memory

How well is this currently retained?

Example:

```text
Stability: 18 days
Next review: tomorrow
Lapses: 1
```

Do not combine these concepts into one opaque "knowledge score."

FSRS determines memory scheduling.

Application metadata determines content priority.

---

## 8. Interview Evidence

Current handbook material should have explicit provenance showing that it came from interview-oriented knowledge.

Introduce something similar to:

```ts
type StudySource =
  'interview' | 'handbook' | 'architecture-playbook' | 'project' | 'literature'
```

And:

```ts
type InterviewEvidence = 'asked' | 'related' | 'none'
```

Initial material should be appropriately marked as interview-derived.

Example:

```ts
{
  source: 'interview',
  interviewEvidence: 'asked'
}
```

The UI may display:

```text
Asked in a real interview
```

This is useful context, not a guarantee that another interviewer will ask it.

---

## 9. Current Handbook Remains Canonical

The current canonical Markdown files must remain the primary knowledge source.

Existing areas include:

```text
Interview Strategy
JavaScript
TypeScript
React
CSS / UI / Accessibility
Vue
Architecture and Design Patterns
Web Performance / SEO
GraphQL / Messaging
Testing / Delivery / DevOps
Developer Tooling
Technical Exercises
Technical Leadership
```

Do not duplicate entire handbook explanations into the Study System.

Cards should contain concise recall answers and link back to the relevant handbook section for deeper reading.

---

## 10. Study Card Model

Create a dedicated study-domain model.

Suggested definition:

```ts
interface StudyCardDefinition {
  readonly id: string

  readonly prompt: string
  readonly answer: string

  readonly topicSlug: string
  readonly headingId?: string

  readonly category: HandbookCategory
  readonly tags: readonly string[]

  readonly source: StudySource
  readonly interviewEvidence: InterviewEvidence

  readonly priority: 'high' | 'normal' | 'low'

  readonly type: 'concept' | 'code' | 'comparison' | 'scenario' | 'exercise'
}
```

IDs must be stable.

Example:

```text
javascript-event-loop-microtasks
react-effect-cleanup
typescript-unknown-vs-any
architecture-observer-pattern
```

Never use array indexes as persisted card IDs.

---

## 11. Study Progress Model

Study definitions and learner progress must remain separate.

Suggested concept:

```ts
interface StudyCardProgress {
  readonly cardId: string

  readonly schedule: SerializedSchedule

  readonly reviewCount: number
  readonly lapseCount: number

  readonly lastRating?: StudyRating
  readonly lastReviewedAt?: string
}
```

Prefer the scheduler's canonical card state where possible rather than duplicating derived FSRS state.

The application's serialization boundary must be versioned.

Example:

```ts
interface StudyStorage {
  version: 1

  cards: Record<string, StudyCardProgress>

  reviews: ReviewHistoryEntry[]

  settings: StudySettings
}
```

---

## 12. Review History

Every answer should generate a history record.

Example conceptual structure:

```ts
interface ReviewHistoryEntry {
  id: string
  cardId: string

  reviewedAt: string

  rating: 'again' | 'hard' | 'good' | 'easy'

  stateBefore: string
  stateAfter: string

  dueBefore?: string
  dueAfter: string

  responseTimeMs?: number
}
```

Do not store unnecessary personal information.

---

## 13. Local-First Architecture

The current Engineering Practice Lab is deliberately static-first.

Preserve that property for the first Study System release.

Do not introduce:

```text
authentication
backend API
cloud database
user accounts
paid infrastructure
```

for the MVP.

The Study System must work on GitHub Pages.

---

## 14. Persistence Boundary

Create an abstraction such as:

```ts
interface StudyProgressRepository {
  load(): Promise<StudyStorage>
  save(storage: StudyStorage): Promise<void>
  clear(): Promise<void>
  export(): Promise<string>
  import(serialized: string): Promise<void>
}
```

Start with browser-local persistence.

Either `localStorage` or IndexedDB is acceptable, but the persistence implementation must remain behind the repository interface.

For the current expected data volume, prioritize simplicity and reliability.

If `localStorage` is chosen:

- namespace the key;
- version the schema;
- validate imported data;
- recover safely from malformed data;
- never silently destroy progress.

Example key:

```text
engineering-practice-lab.study.v1
```

---

## 15. Export and Import

Because the MVP is local-first, backup must be a first-class feature.

Allow:

```text
Export study progress
Import study progress
Reset study progress
```

Export format:

```text
JSON
```

Include:

```text
schema version
settings
card progress
review history
export date
```

Import must validate data before replacing existing progress.

Provide confirmation before destructive replacement.

---

## 16. Content Extraction Strategy

The current handbook parser already extracts `##` and `###` headings.

Reuse this capability to identify possible study units.

However:

DO NOT automatically turn every Markdown heading into a flashcard.

A heading such as:

```text
Practical guidance
```

is not automatically a useful recall question.

Instead:

```text
Handbook heading
      ↓
candidate study concept
      ↓
explicit curated StudyCardDefinition
```

Keep card creation deterministic and reviewable in source control.

No runtime AI generation is required.

---

## 17. Initial Card Population

Use two passes.

### Pass A — Technical Exercises

Start with the existing nineteen Frontend Technical Exercises.

These already behave naturally as active-recall cards.

Preserve the technical corrections that were made when the old interview guide was migrated.

Each exercise should become one or more Study Cards where appropriate.

This provides the first functional Study Mode dataset.

---

### Pass B — Existing Handbook Concepts

Add curated cards for the important interview-derived concepts already present across the handbook.

Examples include:

#### JavaScript

```text
scope
let / const / var
temporal dead zone
closures
prototypes
this
Promises
async/await
event loop
microtasks/macrotasks
call/apply/bind
event delegation
debounce
throttle
Map
WeakMap
Set
shallow/deep copies
structuredClone
generators
ES modules
immutability
memoization
```

#### TypeScript

```text
type vs interface
inference
union
intersection
generic
unknown vs any
type assertions
readonly
Partial
strict null checks
discriminated unions
abstract classes
enum trade-offs
runtime validation
```

#### React

```text
state placement
lifting state
Context
hooks
effects
effect cleanup
AbortController
custom hooks
composition
render props
Redux
Zustand
memo
useMemo
useCallback
virtualization
```

#### CSS/UI

```text
display vs visibility vs opacity
Flexbox
Grid
BEM
OOCSS
SMACSS
Sass mixins
design-system boundaries
accessibility
```

#### Architecture

```text
layered architecture
hexagonal architecture
clean architecture
event-driven architecture
microservices
SOA
DDD
serverless
reactive architecture
MVVM
MVI
micro-frontends
optimistic UI
MACH
Facade
Singleton
Factory
Adapter
Observer
Strategy
Decorator
Command
Template Method
Builder
REST vs SOAP vs GraphQL
```

#### Performance

```text
LCP
INP
CLS
FCP
TBT
code splitting
lazy loading
tree shaking
image optimization
CDN
virtualization
SSR
SEO
```

#### Messaging / GraphQL

```text
GraphQL
N+1
batching
Kafka
RabbitMQ
Redis-style pub/sub concepts
queue vs log
pub/sub
replay
acknowledgements
```

#### Testing / Delivery / DevOps

```text
unit testing
integration testing
E2E
coverage limitations
CI
CD
DRY
KISS
SRP
build pipelines
deployment
P1–P4 priority concepts
```

#### Tooling

```text
Git identity
commit amend
package maintenance
GPG
terminal workflow
Git safety
dependency updates
pipeline diagnosis
```

#### Technical Leadership

```text
technical leadership
trade-offs
mentoring
delegation
RFCs
metrics
product partnership
30/60/90-day thinking
```

Do not create low-quality cards only to increase the card count.

---

## 18. Study Queue

Create a deterministic queue builder.

Suggested location:

```text
apps/portfolio/src/study/queue/
```

Responsibilities:

```text
find due cards
find new cards
apply user limits
apply content priority
interleave topics/categories
return today's session
```

Memory scheduling must remain owned by FSRS.

Queue ordering must not modify due dates.

---

## 19. Queue Priority

Use a transparent rule.

Example order:

```text
1. Overdue cards
2. Due cards
3. Previously failed / lapse-prone cards
4. New high-priority interview cards
5. Other new cards
```

Within equivalent groups:

```text
prefer interview-derived knowledge
avoid consecutive cards from same topic
prefer older due cards
```

Do not create a complex hidden machine-learning ranking.

The ordering must be testable.

---

## 20. Interleaving Algorithm

When multiple eligible cards are available:

```text
JS → React → Architecture → TS → JS
```

should normally be preferred over:

```text
JS → JS → JS → JS → React
```

Suggested deterministic algorithm:

1. build eligible pool;
2. sort by scheduling priority;
3. select highest-ranked card;
4. when possible, select next card from a different topic/category;
5. fall back to normal ranking if alternatives do not exist.

Never delay an overdue card to another day solely for interleaving.

---

## 21. New Cards

The system should limit the number of unseen cards introduced per day/session.

Example default:

```text
5 new cards/day
```

Make this configurable.

A learner should not receive 200 new interview cards immediately.

Reviews should normally take precedence over introducing new material.

---

## 22. Study Settings

Suggested initial settings:

```ts
interface StudySettings {
  dailyNewCardLimit: number
  desiredRetention: number
  interleavingEnabled: boolean
  sessionTargetMinutes?: number
}
```

Defaults may be:

```text
New cards: 5/day
Retention: 90%
Interleaving: enabled
```

Validate all stored settings.

---

## 23. Routes

Extend the existing HashRouter.

Suggested routes:

```text
/study
/study/review
/study/roadmap
/study/knowledge-map
/study/history
/study/settings
```

Potential future route:

```text
/study/card/:cardId
```

Lazy-load the study area similarly to the handbook.

---

## 24. Main Navigation

Add:

```text
Study
```

to the primary navigation.

Keep the existing separation between:

```text
Case Studies
Handbook
Study
```

Conceptually:

```text
Case Studies → practice engineering
Handbook     → understand engineering
Study        → retain engineering
```

---

## 25. Study Dashboard

`/study`

Suggested initial layout:

```text
Study

Today's review
12 cards · ~18 min

Due
5

Learning
3

New
4

[ Start review ]
```

Below this show compact sections such as:

```text
Due today
Weak areas
Recently studied
Upcoming reviews
```

Do not overload the first version with analytics.

The primary action must be obvious:

```text
Start review
```

---

## 26. Review Experience

`/study/review`

Card front:

```text
JavaScript · Event Loop

Asked in a real interview

What is the difference between
microtasks and macrotasks?

[ Show answer ]
```

Do not render ratings yet.

After reveal:

```text
Answer

<concise explanation>

Read full explanation →
```

Then:

```text
Again       Hard       Good       Easy
<interval>  <interval> <interval> <interval>
```

Intervals must come from FSRS preview.

---

## 27. Keyboard Support

Study Mode should support efficient keyboard review.

Suggested mappings:

```text
Space / Enter → show answer

1 → Again
2 → Hard
3 → Good
4 → Easy
```

Only enable rating shortcuts after the answer is revealed.

Ensure shortcuts do not interfere with focused form controls.

---

## 28. Accessibility

The existing project takes accessibility seriously.

Study Mode must preserve this.

Requirements:

- fully keyboard usable;
- visible focus;
- semantic buttons;
- sufficient contrast;
- no color-only memory indicators;
- screen-reader labels;
- review state announcements where useful;
- motion-reduction support;
- no forced time limits;
- rating buttons must contain textual labels;
- Knowledge Map colors must include textual/state equivalents.

Add axe coverage to appropriate Playwright flows.

---

## 29. Knowledge Map

Replace the BR4B0-style static review matrix with a meaningful knowledge map.

Route:

```text
/study/knowledge-map
```

Possible presentation:

```text
JavaScript

Event Loop        Review     due tomorrow
Closures          Review     due in 12 days
Promises          Learning   due today
Prototypes        New

React

Effects           Relearning due today
State             Review     due in 21 days
Memoization       Review     due in 8 days
```

Provide visual state but always include text.

Useful states:

```text
New
Learning
Review
Relearning
Due
Overdue
```

Optional supporting information:

```text
review count
lapses
last review
next review
difficulty
stability
```

Do not invent an arbitrary 0–100 "mastery score" unless its meaning can be rigorously defined.

---

## 30. Memory Visualization

If a percentage is shown, label exactly what it represents.

Do not present an invented "memory percentage."

If retrievability is calculated from the scheduler/model, label it appropriately.

Otherwise prefer:

```text
Due today
Due in 8 days
Stable
Learning
Relearning
```

over false precision.

---

## 31. History

Route:

```text
/study/history
```

Show chronological reviews.

Example:

```text
Sep 16

Event Loop
Good
Next review: Sep 27

React Effects
Again
Next review: later today

TypeScript Generics
Easy
Next review: Oct 12
```

Add filters later if necessary.

---

## 32. Study Plan

After the base review loop is stable, recreate the useful part of the old Weekly Load Calculator as a Study Plan.

Route may live under:

```text
/study/settings
```

or:

```text
/study/plan
```

Allow the user to define:

```text
minutes per day
days per week
maximum new cards
optional category emphasis
```

Example:

```text
Monday       20 min
Tuesday      20 min
Wednesday    30 min
Thursday     20 min
Friday       20 min
Saturday     30 min
Sunday       review only
```

Do not force study blocks to exactly 60 minutes.

The scheduler determines what is due.

The Study Plan determines how much the learner intends to process.

---

## 33. Session Estimation

Estimate session length using historical review duration when available.

Before enough history exists, use a conservative static estimate per card.

Clearly label it as an estimate.

Do not promise exact study duration.

---

## 34. Progress Metrics

Useful metrics include:

```text
reviews today
reviews this week
cards introduced
cards due
cards overdue
Again / Hard / Good / Easy distribution
average interval
lapses
current learning/review/relearning counts
```

Potential later metrics:

```text
retention
review workload
category distribution
```

Do not optimize for streaks in a way that encourages meaningless reviews.

A streak may be displayed, but it is not the learning goal.

---

## 35. Source Navigation

Every Study Card should provide a path back to the canonical handbook source.

Example:

```text
Read full explanation →
/handbook/javascript#event-loop
```

Use the existing slug/heading system.

The Study System must strengthen the Handbook, not replace it.

---

## 36. File Organization

Prefer a feature-oriented structure such as:

```text
apps/portfolio/src/study/
  cards/
    study-cards.ts
    study-cards.test.ts

  domain/
    study-card.ts
    study-progress.ts
    review.ts
    settings.ts

  scheduler/
    scheduler.ts
    fsrs-scheduler.ts
    fsrs-scheduler.test.ts

  queue/
    build-study-queue.ts
    interleave-study-queue.ts
    study-queue.test.ts

  storage/
    study-progress-repository.ts
    browser-study-progress-repository.ts
    migrations.ts
    storage.test.ts

  components/
    study-card.tsx
    rating-controls.tsx
    study-summary.tsx
    study-progress.tsx

  pages/
    study-dashboard-page.tsx
    study-review-page.tsx
    knowledge-map-page.tsx
    study-history-page.tsx
    study-settings-page.tsx

  hooks/
    use-study-session.ts

  index.ts
```

Adjust exact names to fit existing conventions.

Do not introduce package boundaries unless there is a genuine reuse boundary.

---

## 37. Phase 0 — Baseline and Architecture Decision

Before implementation:

1. inspect current routes and handbook architecture;
2. run the existing validation suite;
3. document the current baseline;
4. add an ADR describing the Study System;
5. explicitly document that the first version remains static/local-first.

ADR should explain:

```text
Why Study Mode belongs in this repository
Why handbook remains canonical
Why FSRS is used
Why local persistence is enough initially
Why interview-derived content receives priority
Why software-architecture-playbook is not imported yet
```

Acceptance criteria:

```text
existing project still builds
existing tests pass
ADR exists
no product behavior changed yet
```

---

## 38. Phase 1 — Study Domain Foundation

Implement:

```text
StudyCardDefinition
StudyCardProgress
ReviewHistoryEntry
StudySettings
StudySource
InterviewEvidence
StudyRating
```

Create stable card IDs and validation.

No significant UI yet.

Acceptance criteria:

```text
domain models exist
invalid study definitions are rejected by tests
duplicate card IDs fail tests
broken handbook references fail tests
```

---

## 39. Phase 2 — Interview-Derived Study Catalog

Create the first study catalog.

Start with:

```text
19 technical exercises
```

Then add curated cards from the existing handbook.

Goals:

- every current handbook topic should eventually have relevant study coverage;
- prioritize concepts that represent real interview experience;
- avoid weak or vague questions;
- answer summaries should remain concise;
- full detail stays in handbook Markdown.

Add tests ensuring:

```text
unique IDs
valid topicSlug
valid headingId when supplied
non-empty question
non-empty answer
valid source metadata
```

Do not import `software-architecture-playbook` yet.

Acceptance criteria:

```text
usable interview-based card set exists
technical exercises are represented
all cards link to canonical handbook content
```

---

## 40. Phase 3 — FSRS Scheduler Integration

Install and integrate:

```text
ts-fsrs
```

Create the internal scheduler wrapper.

Implement:

```text
new card creation
rating preview
review application
schedule serialization
schedule restoration
```

Use fake/fixed clocks in tests.

Never rely on `new Date()` directly inside deterministic scheduling tests.

Acceptance criteria:

```text
Again/Hard/Good/Easy produce valid future states
preview does not mutate progress
review updates progress
date/time behavior is deterministic in tests
library API does not leak throughout application
```

---

## 41. Phase 4 — Local Persistence

Implement browser persistence behind the repository abstraction.

Required behaviors:

```text
load
save
schema version
safe default state
migration support
export
import
reset
```

Handle:

```text
missing storage
corrupted storage
older schema
unknown cards
removed cards
newly added cards
```

Unknown historical cards should not crash the application.

Acceptance criteria:

```text
reload preserves progress
corrupted data fails safely
export/import round trip works
existing handbook remains functional
```

---

## 42. Phase 5 — Daily Queue + Interleaving

Implement:

```text
due-card discovery
new-card limits
interview priority
interleaving
session limits
```

Important rule:

```text
FSRS determines WHEN.
The application determines ORDER.
```

Do not change scheduler due dates to force topic rotation.

Test sequences such as:

```text
JS
React
Architecture
TypeScript
JS
```

where multiple eligible categories exist.

Acceptance criteria:

```text
overdue cards are not hidden
due cards precede ordinary new cards
new-card limit works
interleaving works
queue is deterministic
```

---

## 43. Phase 6 — Study Dashboard and Review Flow

Add routes:

```text
/study
/study/review
```

Implement:

```text
today summary
start-review CTA
question
answer reveal
rating controls
FSRS interval preview
next card
session completion summary
```

Add keyboard controls.

Acceptance criteria:

```text
complete review can be performed keyboard-only
answer cannot accidentally be rated before reveal
review persists
page refresh does not destroy completed reviews
source handbook link works
```

---

## 44. Phase 7 — Knowledge Map and History

Implement:

```text
/study/knowledge-map
/study/history
```

Translate BR4B0's Visual Control concept into actual scheduler state.

Organize by handbook category/topic.

Expose meaningful state rather than arbitrary color progression.

Acceptance criteria:

```text
new/learning/review/relearning states visible
due/overdue state visible
last and next review available
review history ordered correctly
color is not the only signal
```

---

## 45. Phase 8 — Study Plan and Workload

Reintroduce the best idea from BR4B0's Weekly Load Calculator.

Allow:

```text
available study time
days of study
new-card budget
optional topic/category emphasis
```

Do not replace FSRS scheduling with time percentages.

Instead use available study time to determine how much of the eligible queue is presented.

Acceptance criteria:

```text
changing study time affects session size
due-card truth remains unchanged
settings persist
defaults remain usable without configuration
```

---

## 46. Phase 9 — Analytics, Backup and Hardening

Add:

```text
review counts
rating distribution
lapses
upcoming workload
category distribution
backup/import UI
```

Perform accessibility review.

Add:

```text
unit tests
component tests
Playwright flows
axe checks
storage migration tests
scheduler tests
queue tests
```

Run the repository's complete validation suite.

Acceptance criteria:

```text
format passes
lint passes
typecheck passes
unit tests pass
build passes
Playwright passes
accessibility checks pass
GitHub Pages build remains static
```

---

## 47. Phase 10 — Documentation

Create:

```text
docs/study-system.md
```

Document:

```text
learning model
spaced repetition
retrieval practice
interleaving
FSRS
queue design
priority vs memory
local persistence
backup
privacy
limitations
future architecture
```

Add an ADR specifically for the scheduler if useful.

Update README to describe:

```text
Case Studies
Engineering Handbook
Study System
```

Do not claim educational outcomes that have not been measured.

---

## 48. Phase 11 — software-architecture-playbook Integration

Only begin this phase after the Study System is complete and stable.

The purpose of this import is not simply to make the handbook larger.

The purpose is to add higher-quality material to an existing learning engine.

Import relevant knowledge from:

```text
software-architecture-playbook
```

Potential concepts include:

```text
ADRs
SOLID
Clean Architecture
cohesion/coupling
contract-first APIs
dependency injection
dependency inversion
fitness functions
ports and adapters
repository pattern
separation of concerns
trust boundaries
Twelve-Factor App
YAGNI
DRY
KISS
reproducibility
artifact testing
feature-based architecture
```

---

## 49. Preserve Source Provenance During Playbook Import

New architecture material should have metadata such as:

```ts
{
  source: 'architecture-playbook',
  interviewEvidence: 'none',
  priority: 'normal'
}
```

If an imported concept also existed in interview material:

```ts
{
  source: 'interview',
  interviewEvidence: 'asked',
  priority: 'high'
}
```

Do not overwrite stronger provenance with weaker provenance.

---

## 50. Deduplicate Before Adding

When importing the Playbook:

```text
existing handbook concept
        +
playbook concept
        ↓
one canonical improved concept
```

Do not produce:

```text
Architecture → Observer
Design Patterns → Observer
Playbook → Observer
Interview → Observer
```

as four duplicate concepts.

One concept may have multiple provenance records if needed.

---

## 51. Playbook Git Migration

If the `software-architecture-playbook` repository is eventually retired, preserve its useful Git history similarly to the previous `frontend-interview-guide` migration.

Before deleting or archiving the old repository:

```text
verify imported content
verify history
verify branches
verify unique material
preserve provenance
create an easy-to-find historical reference/tag if appropriate
```

Do not delete the Playbook repository during the Study System phases.

That is a separate final migration decision.

---

## 52. Later Project Knowledge

After the Playbook integration, Study Cards may gradually reference lessons extracted from independent repositories such as:

```text
auth-lab
messaging-lab
backend-duel-lab
cloud-arena
mercadozetta
habemus-papam
codex-reset-tracker
tcc-project
challenge-portfolio
```

Do not move those application codebases into Engineering Practice Lab.

Extract engineering lessons and link to the external repositories.

Possible source:

```ts
source: 'project'
```

This creates:

```text
concept
→ explanation
→ study question
→ concrete project example
```

---

## 53. Future Architecture

Do not implement these now, but preserve extension points for:

#### Cloud synchronization

A future user account could synchronize review history across devices.

The domain and scheduler should not depend on browser storage.

---

#### Multiple learners

Future persistence may support multiple users.

Do not introduce that complexity in the MVP.

---

#### Personalized FSRS parameters

Eventually review history could be used to optimize scheduler parameters.

Keep it out of the initial implementation.

---

#### AI-generated practice

AI could eventually create additional questions from handbook material.

Do not make AI-generated cards canonical automatically.

Any generated card should require review before entering the permanent study catalog.

---

#### Interview Mode

A future session type could simulate interviews:

```text
random questions
limited preparation
follow-up questions
code exercises
system-design prompts
```

This is separate from spaced repetition.

Do not mix interview simulation with the memory scheduler.

---

## 54. Testing Strategy

### Unit tests

Cover:

```text
card validation
scheduler adapter
queue construction
interleaving
storage serialization
storage migration
import validation
settings
date handling
```

---

### Component tests

Cover:

```text
answer reveal
rating controls
dashboard states
empty states
history
knowledge-map labels
settings
```

---

### E2E

At minimum:

```text
open Study
start session
reveal answer
rate Good
move to next card
finish session
reload application
confirm progress persists
open Knowledge Map
verify reviewed card state
export progress
```

Also test:

```text
keyboard workflow
mobile viewport
accessibility
```

---

## 55. Time and Date Rules

Scheduling logic is date-sensitive.

Centralize the clock.

Example:

```ts
interface Clock {
  now(): Date
}
```

Use system clock in production.

Use fixed clock in tests.

Do not scatter direct `Date.now()` calls throughout the domain.

Store timestamps in an unambiguous serialized format such as ISO-8601.

Display dates in the user's local timezone.

---

## 56. Content Quality Rules

Every Study Card should test something worth remembering.

Good:

```text
Why can calling a const arrow function before initialization throw a ReferenceError?
```

Weak:

```text
What is JavaScript?
```

Good:

```text
When would RabbitMQ redelivery differ from Kafka replay?
```

Weak:

```text
Explain messaging.
```

Good:

```text
What problem does React effect cleanup solve?
```

Weak:

```text
What is useEffect?
```

Prioritize understanding and explanation over trivia.

---

## 57. Answer Quality

Answers should be short enough for recall verification.

Ideal structure:

```text
1–3 short paragraphs
or
3–5 concise bullets
```

Then:

```text
Read full explanation →
```

Do not duplicate entire handbook sections inside Study Cards.

---

## 58. Code Questions

For code-related cards, support fenced code blocks.

Example:

```ts
console.log('start')

setTimeout(() => console.log('timeout'), 0)

Promise.resolve().then(() => {
  console.log('promise')
})

console.log('end')
```

Prompt:

```text
What is the output order and why?
```

Answer should explain reasoning, not only output.

---

## 59. Comparison Cards

Use comparisons where interviews commonly test conceptual boundaries.

Examples:

```text
type vs interface
unknown vs any
useMemo vs useCallback
REST vs GraphQL
Kafka vs RabbitMQ
unit vs integration vs E2E
debounce vs throttle
shallow vs deep copy
```

---

## 60. Scenario Cards

Add scenario questions where appropriate.

Example:

```text
Your React page starts several network requests and unmounts before they finish.

What should the effect cleanup do and why?
```

These are often more valuable than definition cards.

---

## 61. Success Criteria

The first major release is successful when:

```text
I can open the site.
I can click Study.
The site tells me what I should review today.
I attempt answers before seeing them.
I rate recall with Again/Hard/Good/Easy.
The scheduler determines the next review.
My progress survives reloads.
Different topics rotate naturally.
I can see weak/due areas.
I can inspect review history.
I can export my progress.
The original handbook remains readable.
The original case studies remain unaffected.
Everything still deploys as a static GitHub Pages site.
```

---

## 62. Product Identity After Completion

The repository should conceptually become:

```text
Engineering Practice Lab

├── Case Studies
│   └── Practice engineering
│
├── Engineering Handbook
│   └── Understand engineering
│
└── Study
    └── Retain engineering
```

Later:

```text
Independent projects
       ↓
engineering lessons
       ↓
Handbook
       ↓
Study System
       ↓
long-term retention
```

---

## 63. Important Non-Goals

Do not:

- rewrite the current case studies;
- introduce authentication;
- introduce a backend;
- introduce cloud synchronization;
- create a database server;
- import the entire `projeto-br4b0` codebase;
- reproduce the BR4B0 admin/student system;
- copy the old fixed review-count mechanism;
- invent a custom spaced-repetition algorithm;
- add arbitrary gamification;
- invent a meaningless mastery score;
- import `software-architecture-playbook` before Study Mode works;
- delete any source repository during these implementation phases;
- generate hundreds of low-quality flashcards merely for coverage;
- let AI-generated content silently become canonical;
- change GitHub Pages hosting requirements.

---

## 64. Implementation Discipline

Implement one phase at a time.

At the end of every phase:

```text
format
lint
typecheck
tests
build
```

Run Playwright whenever user-visible behavior changes.

Do not accumulate unrelated refactors.

Keep commits/changes phase-scoped.

Preserve existing accessibility behavior.

Preserve existing case-study behavior.

Do not publish, delete repositories, rewrite Git history or perform destructive Git operations unless explicitly requested by the repository owner.

---

## 65. Recommended Execution Order

Execute strictly in this order:

```text
Phase 0
Baseline + ADR

Phase 1
Study domain

Phase 2
Interview-derived card catalog

Phase 3
FSRS scheduler

Phase 4
Local persistence + backup foundation

Phase 5
Daily queue + interleaving

Phase 6
Study dashboard + active recall

Phase 7
Knowledge Map + history

Phase 8
Study Plan + workload

Phase 9
Analytics + accessibility + hardening

Phase 10
Documentation

----- Study System stable here -----

Phase 11
Import software-architecture-playbook knowledge

Phase 12
Deduplicate + provenance + expand study catalog

Phase 13
Evaluate retirement/archive of software-architecture-playbook

----- Future only -----

Cloud sync
Multiple learners
FSRS parameter optimization
Project-derived knowledge
Interview simulation
Reviewed AI-generated cards
```

The critical rule is:

```text
Do not expand the knowledge base before proving that the learning loop works.
```

Start with the interview-derived knowledge because it already has demonstrated practical relevance.

Build the learning engine around that.

Then expand it.
