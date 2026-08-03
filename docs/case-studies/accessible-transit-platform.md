# Accessible Transit Platform — MVP Brief

Status: planned.

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
