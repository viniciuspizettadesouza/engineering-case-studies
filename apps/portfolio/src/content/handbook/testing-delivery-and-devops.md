# Testing, Delivery, and DevOps

Quality is a feedback system. Tests, static analysis, review, observability, and deployment controls should make changes safer without obscuring ownership.

## Test strategy

- **Unit tests** isolate domain rules and small transformations.
- **Integration tests** exercise meaningful boundaries between components or services.
- **End-to-end tests** validate a small number of critical user journeys in a production-like system.

Test observable behavior rather than internal implementation. Use deterministic fixtures, clear names, and the smallest realistic boundary. Mocks are useful at expensive or unreliable external boundaries; too many mocks can prove only that the test setup agrees with itself.

Coverage can reveal unexecuted code, but a universal percentage target does not prove useful assertions. Review risk, branches, failure recovery, accessibility, and regression history alongside coverage.

## Code quality

Static tools such as TypeScript, ESLint, Stylelint, and formatters provide fast feedback. Code review should examine correctness, clarity, security, accessibility, operations, and whether the change is proportionate.

DRY warns against duplicated knowledge, not every repeated line. KISS favors the simplest design that meets the known constraints. The Single Responsibility Principle asks that a module have a coherent reason to change. Apply these as reasoning tools rather than automatic rules.

Named exports, meaningful identifiers, small modules, and explicit contracts usually improve navigation. Repeated casts, hidden coupling, generic names, and recurring production fixes deserve investigation, but context determines whether they are defects.

Cyclomatic complexity counts independent control-flow paths and can highlight code that is difficult to test or reason about. Tools such as SonarQube can surface it alongside duplication and dependency findings, but thresholds are prompts for review rather than proof of quality. Likewise, a 300-line module may be either cohesive or a “god file”; inspect reasons to change, dependency direction, circular imports, coupling, and whether a boundary can be named before splitting it.

AI-assisted review can adopt a deliberately skeptical staff-level perspective and search for correctness gaps, unsafe assumptions, missing tests, and boundary violations. Give it the relevant diff, contracts, constraints, and acceptance criteria. Validate every finding against code and executable evidence; confident wording is not evidence.

### AI-assisted engineering workflow

A useful sequence is research → plan → decision record when consequential → task list → implementation → verification. Keep each artifact proportional: a small fix may need only a short plan, while an architectural change benefits from explicit alternatives and rollback points.

Context engineering means selecting the information that helps the model perform the current task: relevant code and documentation, constraints, examples, prior decisions, tool output, and a clear completion test. Context windows are finite, so compress old discussion into durable decisions and retrieve source material on demand instead of repeatedly carrying everything. Treat summaries as lossy indexes back to canonical sources, not as replacements for them.

Automated loops, scheduled tasks, hooks, and generated project wikis can reduce repetitive work, but their names and behavior are tool-specific. Review their permissions, stopping conditions, sources, and update policy before relying on them. Ask assistants for direct, rigorous feedback while keeping review language constructive and psychologically safe for the humans who will act on it.

## Architecture decision records

Write an ADR when a consequential decision will benefit future maintainers. Keep it proportional and include:

- context and decision drivers;
- the chosen decision and current status;
- credible alternatives considered;
- tradeoffs and safety constraints;
- migration or rollback strategy when relevant.

ADRs record why a decision made sense at the time. Supersede an old record with a new one instead of rewriting history to make the past look inevitable.

## CI/CD and builds

Continuous integration validates small changes frequently. Continuous delivery keeps the system releasable; continuous deployment automatically releases passing changes.

A practical pipeline performs installation from a lockfile, formatting checks, linting, type checking, tests, a production build, and selected browser tests. Cache only reproducible inputs, pin critical tool versions, and make failures easy to diagnose.

To collect coverage for one test while diagnosing locally, pass the runner's file filter and coverage option according to that project's scripts—for example, `npm test -- InsightHeader.test.tsx --coverage` in a Jest-style setup. Confirm the exact forwarding syntax because package scripts and test runners differ.

Build optimization includes code splitting, tree shaking, asset compression, dependency auditing, and deterministic workspace orchestration. Monorepos can share tooling and atomic changes, but require clear ownership and affected-project execution.

## Deployment and operations

Automated deployment should use least-privilege credentials, protected environments where appropriate, immutable artifacts, and a rollback path. GitOps represents desired state in version control; it does not eliminate the need for operational ownership.

Collect logs, metrics, and traces that answer user-impact questions without capturing private data. Track delivery signals such as lead time and recovery time carefully: metrics guide learning, but become harmful when used as individual performance targets.

## Work priority

- **P1:** service-stopping or safety-critical; respond immediately.
- **P2:** high-value or release-blocking work.
- **P3:** an important fast follow after the release boundary.
- **P4:** non-critical work still under consideration.

Every team should define these levels against its own impact, urgency, and escalation policy.
