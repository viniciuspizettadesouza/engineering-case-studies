# ADR 0004: Static Vehicle Catalogue and Browser-Local Reservation

Status: accepted for the MVP.

## Context

The commerce study needs a complete catalogue-to-reservation journey with shareable filters, deterministic availability and recoverable errors. The portfolio is statically hosted and must not imply access to real inventory, payments or dealer systems.

## Decision

Keep vehicles and unavailable date ranges as original readonly fixtures. Put filtering, overlap validation, price calculation and analytics event types in a framework-independent domain module. Represent catalogue filters in URL query parameters and keep reservation drafts and simulated confirmations in local storage behind a small adapter.

Use explicit demo controls for catalogue loading/error states and one recoverable submission error. Reject overlapping dates before review while preserving the rest of the draft. Record analytics events in memory only, with no transport or contact data. Serve small original SVG illustrations locally with fixed dimensions and a documented performance budget.

## Consequences

### Positive

- the entire workflow remains executable on static hosting;
- filtered catalogue links are shareable;
- conflict and recovery behavior is deterministic and testable;
- React presentation does not own reservation rules;
- no real personal data, inventory or external event processor is required.

### Negative

- availability is not authoritative and cannot handle concurrency;
- browser records can be changed, forged or lost;
- the confirmation is not a reservation hold or fulfilment record;
- all route modules currently contribute to the portfolio bundle;
- fixed fixtures cannot demonstrate time zones, live pricing or dealer operations.

## Alternatives considered

### Fake REST inventory service

Rejected because it adds a network-shaped layer without demonstrating a server-only guarantee. A real service becomes justified when availability must be authoritative or shared between users.

### Third-party vehicle imagery and analytics

Rejected because licensing, privacy and network variability would undermine the fictional-content boundary and deterministic performance baseline.

### In-memory reservation state only

Rejected because review/edit navigation and confirmation refreshes should not erase the demonstration. Local storage is acceptable only with clear fictional-data and security warnings.
