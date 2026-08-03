# Architecture Overview

## Context

The repository contains five planned interactive case studies and one deployable frontend. The architecture optimises for inexpensive static hosting, clear boundaries and incremental growth.

```text
GitHub Pages
└── apps/portfolio
    ├── catalogue and narrative
    ├── case-study routes
    ├── future study modules
    └── packages/design-system
```

There is no runtime server. GitHub Actions builds static assets and deploys them to GitHub Pages.

## Workspace boundaries

### `apps/portfolio`

The only deployable application. It owns routing, page composition, portfolio content and future study modules.

Case studies should initially live under a feature directory inside this application. A study becomes a separate app only if it needs an independent runtime, release lifecycle or technical environment.

### `packages/design-system`

Contains only UI primitives already shared across multiple portfolio areas. It deliberately has no build artefact yet: Vite consumes its TypeScript source through the workspace dependency, while its own TypeScript task validates the public API.

Adding `case-study-model`, shared lint configuration or shared TypeScript configuration is postponed until at least two consumers need that boundary.

## Future study module shape

```text
apps/portfolio/src/case-studies/<study>/
├── components/     # Study-specific presentation
├── domain/         # Framework-independent types and rules
├── fixtures/       # Fictional deterministic data
├── services/       # Ports and local adapters
├── routes/         # Route-level composition
└── tests/          # Tests close to the behaviour they protect
```

Dependency direction:

```text
routes → components → domain
   └────→ services ───→ domain
fixtures implement service contracts
```

Domain code must not import React. Components should not read local storage, call external APIs or embed fixtures directly. Browser capabilities sit behind small adapters when they affect domain behaviour or tests.

## Routing and hosting

Production assets use `/engineering-case-studies/` as their Vite base path. `HashRouter` places application routes after `#`, so GitHub Pages always receives a request for the root static document.

Example:

```text
https://<account>.github.io/engineering-case-studies/#/case-studies/accessible-transit-platform
```

This is less elegant than path-based routing but avoids a fragile redirect workaround. The decision can be revisited if hosting changes.

## Data and backend policy

Initial studies use:

- readonly TypeScript fixtures;
- JSON-compatible domain models;
- deterministic in-browser service adapters;
- simulated latency and failures when they teach useful behaviour;
- local storage only for user-controlled draft persistence.

The financial agent dashboard and the enterprise tenant workspace are role and tenancy simulations inside the browser. They demonstrate interface and domain boundaries, not production security. Any future multi-user version would require server-enforced authorisation and tenant isolation.

The retail insights MVP uses precomputed, explainable insight fixtures behind a typed analysis boundary. It does not train or call a production AI model. This keeps results deterministic while still exposing provenance, freshness and confidence limitations in the interface.

They do not use a fake REST server simply to imitate network traffic. A real backend is justified only when a study needs to demonstrate a server-only property such as multi-user persistence, webhook validation, secret handling or authentication.

## Quality strategy

- TypeScript strict mode and unchecked-index protection;
- ESLint for static correctness;
- Prettier for deterministic formatting;
- Vitest for domain and component behaviour;
- Testing Library for user-observable component behaviour;
- Playwright for a small number of critical browser journeys;
- production build verification before deployment.

Accessibility is also reviewed manually. Automated checks cannot validate reading order, useful labels, understandable errors or overall task usability on their own.

## Evolution rules

Introduce a new abstraction only when:

1. at least two concrete consumers need it;
2. its ownership and dependency direction are clear;
3. it reduces change cost rather than only moving code;
4. the decision is documented when it affects the repository broadly.

The monorepo is a growth boundary, not a requirement to make every feature a package.
