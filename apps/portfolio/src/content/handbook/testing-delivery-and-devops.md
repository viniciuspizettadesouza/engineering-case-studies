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

## CI/CD and builds

Continuous integration validates small changes frequently. Continuous delivery keeps the system releasable; continuous deployment automatically releases passing changes.

A practical pipeline performs installation from a lockfile, formatting checks, linting, type checking, tests, a production build, and selected browser tests. Cache only reproducible inputs, pin critical tool versions, and make failures easy to diagnose.

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
