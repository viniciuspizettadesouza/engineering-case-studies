# Implementation Roadmap

The roadmap is deliberately incremental. Each phase ends with review before the next one begins.

## Phase 0 — Intent and boundaries

Status: complete in the initial scaffold.

- document product intent and audience;
- define the fictional-content boundary;
- map the career narrative;
- record initial architecture decisions.

## Phase 1 — Repository foundation

Status: complete.

- create the pnpm/Turborepo workspace;
- create the React/Vite portfolio;
- configure static GitHub Pages routing;
- add a small shared design system;
- publish a chronological, data-driven catalogue;
- add tests and CI/deployment workflows;
- document development and architecture.

Exit criteria:

- install, format check, lint, typecheck, unit tests and build pass;
- browser smoke tests pass on desktop and mobile Chromium profiles;
- production assets use the repository base path;
- every study has an accurate planned, next, in-progress or complete label;
- the application works at narrow and wide viewports.

## Phase 2 — Define the five MVPs

Status: complete in this planning update.

- keep every organisation, identity, product, route, price and business rule fictional;
- give each study one complete primary journey and explicit non-goals;
- define deterministic fixtures and local service boundaries;
- identify accessibility, error-state and test expectations;
- avoid optional features until all five MVPs have a usable vertical slice.

Exit criteria:

- each MVP has a brief with actors, workflow, data boundary and acceptance criteria;
- the catalogue accurately describes only the five selected products;
- no real company content, branding, customer data or internal rules appear in code or documentation.

## Phase 3 — Financial application MVP

Status: complete.

- provide a public two-page application form using fictional applicant data;
- validate each page and allow the applicant to move backwards without losing entered data;
- place a completed application in `awaiting_verification`;
- provide a separate simulated agent dashboard listing submitted applications;
- let an agent inspect every field supplied by the applicant;
- record read-only status history and verification notes locally;
- keep approval scoring, real identity checks, authentication and external APIs out of scope.

This phase produced the first complete case study. Its domain rules, local persistence, applicant workflow, agent decisions, audit history, filters and deterministic service states are covered by unit and desktop/mobile browser tests. Accessibility findings and production limitations are documented with the study.

## Phase 4 — Vehicle reservation MVP

Status: complete.

- present a small, fictional vehicle catalogue with a limited set of useful filters;
- show vehicle details and a clear reservation action;
- collect dates, location and fictional buyer contact details in a reservation form;
- provide a review step before simulated submission;
- show deterministic availability conflicts and recoverable errors;
- define analytics event contracts without transmitting events;
- set a performance budget for the catalogue and detail views;
- keep real inventory, payments, finance and dealer integrations out of scope.

## Phase 5 — Public transport ticketing MVP

Status: complete.

- configure two invented transport tenants with distinct tokens and fare catalogues;
- let a passenger select a fictional origin, destination and travel time;
- present eligible invented fares and accessible explanations;
- collect only the passenger information needed for the demo;
- provide review, simulated purchase and ticket confirmation;
- support keyboard completion, useful error summaries and screen-reader status updates;
- keep real routes, timetables, fares, payments and ticket fulfilment out of scope.

## Phase 6 — Multi-tenant bulk catalogue MVP

Status: complete.

- configure two invented retail tenants with separate product rules and visual tokens;
- build the workspace with selectively adopted shadcn components;
- accept CSV upload or pasted rows using a documented fictional template;
- preview, validate and correct rows before submission;
- prevent data from one tenant appearing in the other tenant's workspace;
- simulate publishing accepted products and export rejected rows;
- keep real retailer catalogues, production authentication, AI enrichment and external APIs out of scope.

## Phase 7 — Retail insights MVP

Status: next.

- provide a portfolio-level view across several invented stores and a focused single-store view;
- show fictional daily sales, category and time-series summaries;
- display a small feed of deterministic AI-assisted insights generated for the selected reporting date;
- link every insight to a supporting chart and the fictional data slice used to produce it;
- expose generation time, freshness, limitations and a simulated confidence indicator;
- provide accessible table alternatives and text summaries for essential chart information;
- support loading, no-data, stale-insight and analysis-failure states;
- keep the conversational chatbot, live model calls and real retailer data out of scope.

## Phase 8 — Cross-product hardening

- make loading, empty, validation, failure and success states consistent;
- complete unit, integration and critical Playwright coverage for every MVP;
- perform manual keyboard and accessibility reviews;
- document architectural decisions and limitations per study;
- verify fixture provenance and the fictional-content boundary;
- publish all five MVPs with honest status labels.

## Phase 9 — Incremental product expansion

After all five vertical slices exist, prioritise enhancements from evidence gathered during implementation. Candidate additions include localisation, persistence behind a real backend, richer role permissions, optional payments and a chatbot that can request new visualisations from the retail-insights data boundary. Each addition requires its own boundary and must not import real company rules or data.

## Phase 10 — Portfolio integration

- link the published collection from the existing personal portfolio;
- add concise summaries and source links;
- review résumé and LinkedIn positioning;
- run a final privacy, accessibility and content-quality review.

## Definition of done for a study

A study is complete only when it includes:

- a fictional problem and explicit constraints;
- one executable end-to-end workflow;
- typed domain logic separated from React presentation;
- deterministic fixtures and service adapters;
- loading, empty, error and success behaviour where relevant;
- automated tests at appropriate levels;
- accessibility considerations and manual review notes;
- at least one relevant ADR;
- a threat/privacy boundary where relevant;
- an honest limitations section;
- “What I would do differently today”;
- a visible fictional-content disclaimer;
- passing repository validation.
