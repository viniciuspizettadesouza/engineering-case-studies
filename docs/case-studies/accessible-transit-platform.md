# Accessible Transit Platform — MVP Brief

Status: complete.

## Fictional premise

Two invented regional transport operators sell digital tickets through one shared frontend foundation. Their names, routes, fares, timetables, visual tokens and business rules are original fixtures created for this repository.

Public ticket-purchase experiences are a reference only for the broad journey-selection pattern. This study does not reuse a real operator's data, page structure, copy or visual identity.

## Primary user goal

A passenger can plan a fictional journey, choose an eligible fare, enter the minimum required passenger details and receive a simulated ticket confirmation.

```text
Choose tenant and journey
        ↓
Compare eligible fares
        ↓
Enter passenger details
        ↓
Review the order
        ↓
Simulated purchase and ticket
```

## MVP scope

- two fictional operator configurations;
- a small set of invented stops, journeys and fares;
- origin, destination and travel-time selection;
- fare comparison with accessible explanations;
- passenger details with client-side validation;
- review and edit before submission;
- deterministic success, failure and retry scenarios;
- a fictional ticket reference after confirmation;
- responsive layouts and tenant theme switching;
- unit, integration and critical E2E tests.

## Acceptance criteria

- the complete journey works with keyboard input;
- invalid fields have persistent labels, useful messages and an error summary;
- changing tenants also changes fixtures and tokens without leaking the other tenant's state;
- the review shows the selected journey, fare and passenger information;
- no real payment is attempted and confirmation is clearly labelled as simulated;
- loading, no-results, expired-journey and submission-failure states can be demonstrated deterministically.

## Out of scope

- real routes, stops, timetables or fares;
- live journey planning or disruption APIs;
- real ticket purchase, payment or fulfilment;
- accounts, discount-card verification or identity checks;
- production analytics, email or SMS;
- claims of affiliation with a real operator or platform vendor.

## Accessibility focus

The MVP targets relevant WCAG 2.2 AA criteria through semantic landmarks, persistent labels, visible focus, keyboard completion, linked error summaries, status announcements, sufficient target sizes and reduced-motion support. Automated checks supplement rather than replace a manual keyboard and screen-reader review.

## Later increments

Candidate additions after all five MVPs exist include localisation, saved passengers, ticket wallets, additional fare types and a typed backend adapter.

## Delivered architecture

The executable study lives under `apps/portfolio/src/case-studies/accessible-transit`. Two readonly tenant configurations provide independent names, design tokens, stops, journeys and fare catalogues to one shared set of React routes. Search, fare eligibility, passenger validation and ticket creation remain framework-independent domain rules.

Every ticket route includes the tenant identifier. Browser-local drafts use separate tenant-prefixed keys, and values read from storage are checked before use. Switching operators remounts the planning state and loads only the selected tenant's draft and fixtures. Simulated ticket confirmations are also checked against the tenant in their route.

The workflow exposes deterministic loading and service-error controls, natural no-result searches, visibly expired fixture journeys, expiry during review, recoverable purchase failure and success. These states do not call or imitate a production transport API.

## Test evidence

Vitest covers tenant separation, token and fixture differences, journey validation, matching and no-result searches, expired journeys, eligible fares, passenger validation, ticket creation, malformed browser state and tenant-scoped persistence.

The critical Playwright journey runs in desktop Chromium and the Pixel 7 project. It verifies that switching tenant clears the visible form and changes stop fixtures, an earlier tenant draft does not leak into the new tenant, an expired journey cannot be selected, fare explanations remain visible, validation focuses a linked error summary, a recoverable purchase failure preserves the order, and confirmation is explicitly invalid for real travel.

## Privacy and threat boundary

This static frontend provides visual tenancy, not a security boundary. Browser users can inspect or alter fixtures, drafts and tickets; forge references; change tenant route identifiers; replay actions; or delete all state. A production system must enforce tenant ownership, fare rules, expiry, purchase idempotency and ticket validity on trusted services.

The demo requests only a fictional passenger name, fictional email and optional fictional assistance preference. It displays warnings that no operator or assistance service is contacted. Real identity, disability, contact or payment information must not be entered. A production implementation would require a lawful data basis, clear retention, access controls, sensitive-data review, payment isolation, fraud controls and auditable fulfilment.

## Limitations

- timetables contain a few fixed invented journeys on one fictional day;
- search matches an exact selected departure rather than planning connections;
- tenant styling proves configuration boundaries, not server-enforced isolation;
- fare eligibility uses small local lists and omits discount or identity rules;
- tickets are editable browser records with no barcode, signing or validation;
- no payment, notification, disruption, assistance or fulfilment service exists;
- automated checks and semantic inspection do not replace user research or assistive-technology testing.

## What I would do differently today

For production, I would put timetable and fare evaluation behind typed, versioned service contracts and use an authoritative server to issue short-lived order quotes. Purchase would be idempotent, ticket artefacts cryptographically verifiable, tenant access server-enforced and payment data isolated with a specialist processor. I would test the shared journey with disabled passengers across each tenant theme, localise date and fare presentation, and collect privacy-reviewed performance and error telemetry without passenger details.
