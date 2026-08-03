# Implementation Roadmap

The roadmap is deliberately incremental. Each phase ends with review before the next one begins.

## Phase 0 — Intent and boundaries

Status: complete in the initial scaffold.

- document product intent and audience;
- define the fictional-content boundary;
- map the career narrative;
- record initial architecture decisions.

## Phase 1 — Repository foundation

Status: implemented in the initial scaffold; validation still determines completion.

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
- all studies are labelled as planned;
- the application works at narrow and wide viewports.

## Phase 2 — Transit domain foundation

- define fictional operators, plans and passenger information;
- document domain language and deliberately invented rules;
- introduce a typed service boundary with deterministic local adapters;
- define tenant configuration and design tokens;
- test tenant isolation and theme switching;
- write an ADR for the multi-tenant model.

No multi-step subscription journey is delivered in this phase.

## Phase 3 — Accessible subscription journey

- choose an operator and plan;
- collect and validate fictional passenger information;
- review the request;
- simulate submission success, recoverable failure and retry;
- optionally preserve draft state in local storage;
- cover keyboard interaction and meaningful errors;
- add unit, integration and Playwright coverage;
- perform a manual accessibility review;
- document trade-offs and what would change in production.

This phase produces the first complete case study and release `v0.2.0`.

## Phase 4 — Commerce experience

- build a small fictional catalogue;
- configure an item and manage a basket;
- simulate checkout behind a typed payment boundary;
- define analytics events without sending data externally;
- set and enforce a performance budget;
- add localisation only after the base workflow is stable.

## Phase 5 — Financial operations platform

- model a fictional application request;
- provide customer and operations views;
- simulate role-based capabilities without real authentication;
- record audit events in memory;
- simulate communication and localisation;
- document security boundaries and backend requirements.

## Phase 6 — Modular enterprise workspace

- configure fictional tenants and modules;
- introduce feature flags and permissions;
- simulate an AI-assisted recommendation;
- require explicit human approval before an action;
- record provenance and an audit event;
- compare modular monolith and microfrontend trade-offs.

## Phase 7 — Remaining early-career studies

Decide whether Operations Support Lab and Client Website Studio add new evidence after the four principal studies are complete. They remain valid narrative chapters, but they should not be implemented merely to fill the catalogue.

## Phase 8 — Portfolio integration

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
