# ADR 0003: Static Financial Workflow with Browser-Local Persistence

Status: accepted for the MVP.

## Context

The financial study needs two distinct perspectives: an applicant submits a two-page request and an agent reviews it. The portfolio is hosted as static assets and the MVP must not collect real personal data, require credentials or imply production-grade financial security.

The workflow still needs to demonstrate state transitions, recoverable failures, audit events and shared records between the two views.

## Decision

Keep framework-independent application rules under the study's `domain` boundary and place browser storage behind a typed repository. Use local storage for fictional drafts and submitted applications. Model the applicant and agent as separate routes inside the same static application.

All submissions enter `awaiting_verification`. Domain code permits a single agent transition to either `verified` or `needs_information`, requires a note and appends a status event. Deterministic UI controls expose loading, empty and failure states without adding a fake HTTP server.

## Consequences

### Positive

- the complete workflow runs on static hosting;
- tests remain deterministic and fast;
- React presentation does not own transition rules;
- failure and recovery behaviour can be demonstrated without external services;
- no credentials, production endpoints or third-party processors are required.

### Negative

- routes do not provide real role isolation;
- browser data is mutable and cannot provide a trustworthy audit log;
- there is no multi-user concurrency, server validation or idempotency;
- users must be explicitly warned not to enter real information.

## Alternatives considered

### In-memory state only

Rejected because refreshes and navigation between applicant and agent routes would erase the demonstration.

### Fake REST server

Rejected because network-shaped code would add operational complexity without demonstrating a server-only property.

### Production-style backend and authentication

Deferred until a future increment specifically needs server-enforced security, concurrency or durable auditing. Adding it to this MVP would broaden both risk and scope without changing the primary portfolio evidence.
