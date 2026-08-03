# ADR 0006 — Tenant-scoped catalogue import

Status: accepted.

## Context

The bulk catalogue study must demonstrate two different fictional retail rule
sets without creating two applications or implying that browser storage provides
production-grade tenant security.

## Decision

Keep CSV parsing, row validation, rejected-row serialization and publication
modelling in a typed domain module. Supply tenant rules and visual tokens through
configuration. Namespace every draft and publication storage key with the tenant
identifier, and resolve the active tenant from the route before reading state.

The UI publishes only currently accepted rows. Rejected data stays in its
tenant-scoped draft and can be exported with validation messages.

## Consequences

One interface can prove materially different validation and branding while tests
can exercise the rules without rendering React. Browser isolation is easy to
inspect and deterministic for a static portfolio. It is deliberately not a
security boundary; a production service must enforce tenant identity and access
for every operation.
