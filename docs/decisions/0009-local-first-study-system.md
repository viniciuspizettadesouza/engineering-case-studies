# ADR 0009: Local-First Adaptive Study System

## Status

Accepted

## Context

The Engineering Practice Lab already joins executable case studies with a canonical Markdown engineering handbook. Reading that handbook does not, by itself, provide retrieval practice or show which knowledge is becoming due for review. Most existing material originated in real interview preparation, so it has stronger practical evidence than material that might later be imported from other repositories.

## Decision

Study Mode will live in this repository as a third, lazy-loaded product area. Curated cards reference handbook topic and heading IDs; they do not copy full handbook explanations. Interview-derived cards receive application-level priority, while memory state remains exclusively owned by FSRS through the maintained `ts-fsrs` package.

Progress and review history are stored behind a versioned repository interface, initially implemented with namespaced browser `localStorage`. JSON export/import is the backup and portability mechanism. The application therefore remains static, private by default, and compatible with GitHub Pages: no authentication, API, database, or paid infrastructure is introduced.

Queue ordering may prioritize overdue, lapse-prone, and interview-derived cards and may interleave topics, but it never changes FSRS due dates. The scheduler uses a configurable desired-retention value, initially 0.90.

The `software-architecture-playbook` is deliberately excluded until this learning loop is stable. Expanding content before validating retrieval, scheduling, persistence, and backup would make quality and migration failures harder to detect.

## Consequences

- The handbook remains the single source of detailed knowledge.
- Stable card IDs and handbook references are validated in tests.
- Device synchronization and multiple learners remain future concerns.
- Clearing browser data can remove progress, so backup controls are first-class.
- Future persistence and scheduler implementations can replace adapters without changing pages or cards.

## Alternatives considered

### Separate study application

Rejected because it would duplicate handbook ownership, navigation, deployment, and content-reference logic.

### Fixed review intervals

Rejected because hard-coded intervals would not adapt to recall history or desired retention as effectively as the maintained FSRS implementation.

### Account-backed synchronization

Deferred because authentication, a production API, and multi-device conflict handling are outside the static, private-first scope.
