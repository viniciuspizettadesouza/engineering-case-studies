# Financial Operations Platform — MVP Brief

Status: MVP complete.

## Delivered MVP

- two routed application pages with accessible validation;
- browser-local draft persistence between the two steps;
- submission into `awaiting_verification`;
- confirmation with a fictional reference;
- separate responsive agent queue and application detail routes;
- complete display of every submitted field;
- filters by status and submission date;
- guarded `verified` and `needs_information` decisions with required notes;
- append-only status history in the domain model;
- deterministic loading, empty, failure and retry demonstrations;
- deterministic domain and repository tests plus a desktop/mobile E2E journey.

## Fictional premise

An invented finance provider needs a simple credit-application intake flow and a separate workspace where operations agents can verify submitted information. All identities, amounts, rules and records are deterministic fictional fixtures. The MVP demonstrates workflow design, not a real lending decision.

## Actors

- **Applicant:** completes and submits the two-page form.
- **Verification agent:** opens the operations dashboard and reviews every submitted field.

Roles are simulated entry points. They do not represent production authentication or authorisation.

## Primary workflow

```text
Application page 1
identity and contact
        ↓
Application page 2
financial declaration and consent
        ↓
Submit
awaiting_verification
        ↓
Agent dashboard
list, application detail and decision
```

## MVP scope

- page 1: invented identity and contact fields;
- page 2: invented employment, income-range, requested-amount and consent fields;
- per-page validation and a linked error summary;
- backwards navigation without losing form state;
- reviewable application summary before final submission;
- submission into the `awaiting_verification` state;
- agent queue with status and submission-time filters;
- read-only detail view containing every value the applicant submitted;
- agent verification notes and a local status history;
- deterministic local storage through typed service interfaces.

## Minimal state model

```text
draft → awaiting_verification → verified
                            └→ needs_information
```

The application cannot enter an agent-reviewed state directly from the applicant flow.

## Acceptance criteria

- an applicant cannot open page 2 until page 1 is valid;
- refreshing or moving backwards does not silently corrupt the draft;
- final submission creates one application in `awaiting_verification`;
- the agent queue shows the submitted application without exposing unrelated fixture data;
- the detail screen displays every submitted value and its status history;
- status changes require an agent note and append an audit event;
- validation, empty queue, loading, submission failure and retry states are demonstrable.

## Out of scope

- real credit scoring, affordability rules or approval recommendations;
- document uploads, identity verification or fraud detection;
- real personal data, accounts or production authentication;
- external bureau, banking, email or messaging integrations;
- final lending decisions, contracts or money movement.

## Security and privacy boundary

The applicant and agent roles are separate routes, not security boundaries. Data is stored in browser local storage so both simulated roles can share it without a backend. Anyone using the same browser profile can inspect or change those records. The UI therefore asks users to enter fictional information only.

A production version would require server-enforced authentication, role authorisation, encryption, retention rules, consent handling, audit integrity, secure logging and protection against cross-tenant or cross-customer access. The static implementation must not be presented as suitable for real financial data.

## Known limitations

- refreshing preserves drafts, but there is no explicit user-facing control to discard one;
- application identifiers and timestamps are created by the browser;
- deterministic service states demonstrate UI recovery without modelling a real network;
- status history is append-only in domain code but not tamper-proof in local storage;
- the queue is appropriate for a small demo dataset, not pagination or concurrent agents;
- no real eligibility, affordability or credit decision is made.

## What I would do differently today

For production, I would begin with an end-to-end threat model and data-retention policy before finalising the form schema. I would keep validation contracts shared between client and server, enforce transitions transactionally, use immutable audit storage, add idempotent submission and protect every query by role and tenant. I would also test content with users familiar with credit applications before adding more fields or automation.

## Evidence

- [Accessibility review](financial-operations-platform-accessibility.md)
- [Architecture decision: static financial workflow](../decisions/0003-static-financial-workflow.md)
- domain and repository unit tests under `apps/portfolio/src/case-studies/financial-operations`;
- desktop and mobile critical journey in `apps/portfolio/e2e/portfolio.spec.ts`.

## Later increments

Candidate additions after all five MVPs exist include localisation, document-request simulation, stronger permission modelling and a real backend with server-enforced audit and access controls.
