# ADR 0005: Configured Static Transit Ticketing

Status: accepted for the MVP.

## Context

The transit study must demonstrate one accessible ticket journey serving two distinct fictional transport operators. It needs tenant-specific tokens and catalogues, deterministic failure states and browser-only operation without implying real timetable, payment or ticket systems.

## Decision

Represent each operator as a readonly configuration containing identity, visual tokens, stops, journeys and fares. Compose both operators through one route and component foundation. Include the tenant identifier in every workflow route and scope local drafts by that identifier.

Keep search, expiry, fare eligibility, validation and ticket creation in framework-independent domain code. Sanitize local draft data on read. Persist only fictional drafts and simulated confirmations, and expose loading, no-result, expired and failure states through deterministic local controls.

Use native HTML fields and semantic summaries as the primary interaction model. Treat tenant colour as supplemental to visible operator names and fixture changes.

## Consequences

### Positive

- one tested journey supports both tenant configurations;
- tokens and fixture catalogues can change without branching the route UI;
- tenant-specific keys prevent accidental draft crossover in the demo;
- deterministic states are keyboard reachable and testable;
- no live transport, payment, analytics or notification service is required.

### Negative

- client-side tenant separation is not access control;
- route and storage data can be manipulated;
- exact-departure fixture search does not model real journey planning;
- browser-local tickets cannot provide trusted fulfilment or validation;
- adding tenants still increases the single static application bundle.

## Alternatives considered

### Separate React application per tenant

Rejected because it would duplicate the journey, validation and accessibility behavior while hiding the configuration boundary this study is intended to demonstrate.

### Fake journey-planning and payment APIs

Rejected because network-shaped simulations would add complexity without providing authority, concurrency, secret handling or a real payment boundary.

### One theme with tenant names changed in presentation

Rejected because the study needs to prove that stops, journeys, fares and tokens are all tenant-owned configuration rather than superficial branding.
