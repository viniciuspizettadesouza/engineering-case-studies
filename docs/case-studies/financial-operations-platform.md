# Financial Operations Platform — MVP Brief

Status: next to implement.

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
list and application detail
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

## Later increments

Candidate additions after all five MVPs exist include localisation, document-request simulation, stronger permission modelling and a real backend with server-enforced audit and access controls.
