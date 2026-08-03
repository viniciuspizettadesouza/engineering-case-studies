# Accessible Transit Platform — Initial Brief

Status: planned; selected as the first executable case study.

## Fictional premise

Two invented regional transport operators need to offer subscription plans through a shared frontend foundation. Their visual identities and available plans differ, but customers should receive the same accessible interaction quality.

The study is not a reconstruction of a real ticketing platform. Operator names, rules, visual tokens, content, users and data will be created specifically for this repository.

## Why this study comes first

It creates strong evidence across several connected skills without needing a backend:

- React and strict TypeScript;
- accessible forms and keyboard interaction;
- design tokens and themeable components;
- configuration-driven multi-tenancy;
- responsive product flows;
- domain modelling and service boundaries;
- meaningful automated browser tests.

## Primary user goal

A passenger can select a subscription plan, enter fictional personal information, review the request and receive a simulated confirmation.

```text
Choose operator and plan
        ↓
Enter passenger details
        ↓
Review the complete request
        ↓
Submit through a local adapter
        ↓
Confirmation or recoverable error
```

## Intended scope

- two fictional operator configurations;
- a small plan catalogue per operator;
- one multi-step subscription form;
- client-side validation with a useful error summary;
- review and edit before submission;
- deterministic success and failure scenarios;
- optional draft persistence controlled by the user;
- desktop and mobile layouts;
- keyboard and screen-reader-oriented behaviour;
- unit, integration and E2E tests;
- architecture and accessibility notes.

## Out of scope

- real ticket purchase or payment;
- identity verification;
- login and customer accounts;
- a real transport API;
- real addresses or passenger data;
- production-grade fraud, eligibility or pricing rules;
- email or SMS delivery;
- analytics collection;
- a CMS.

## Accessibility expectations

- logical heading and landmark hierarchy;
- persistent visible labels;
- programmatic descriptions and error relationships;
- error summary that links back to invalid fields;
- focus management between steps and after submission;
- no information conveyed by colour alone;
- minimum target sizes and visible focus indication;
- full keyboard completion;
- reduced-motion support;
- status announcements that do not interrupt unnecessarily;
- manual checks with at least one desktop screen reader before completion.

WCAG conformance should be described carefully: the project can target relevant WCAG 2.2 AA criteria, but automated tests alone must not be presented as certification.

## Open decisions for the next phase

Vinicius should guide:

1. whether the product should feel like a public consumer journey or an authenticated customer portal;
2. which passenger details are worth modelling without making the demo intrusive;
3. whether tenant switching is a visible demo control or route configuration;
4. whether localisation belongs in the first workflow or a later iteration;
5. how much design-system documentation should be visible inside the portfolio;
6. which trade-off he most wants to discuss in interviews.

These decisions should be resolved before implementing the domain, not inferred from any previous employer product.
