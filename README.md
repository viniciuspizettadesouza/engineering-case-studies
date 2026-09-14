# Engineering Practice Lab

Executable, fictional engineering case studies paired with a curated engineering
handbook covering frontend foundations, systems, delivery, interview strategy,
technical exercises and leadership.

This repository is both a portfolio and a working engineering notebook. Each
case study pairs a product workflow with its engineering reasoning. The handbook
turns accumulated study notes into a searchable, maintained reference.

> [!IMPORTANT]
> This project does not reproduce employer products. All organisations, users, data, metrics, workflows and business rules are fictional. It contains no employer source code, private architecture, internal documentation, branding or customer information.

## Current state

The repository contains five complete executable case studies and a published
engineering handbook:

- an accessible landing page;
- a focused catalogue of five MVP studies with honest delivery statuses;
- data-driven catalogue pages that clearly identify unfinished work;
- a minimal shared design system;
- unit and browser smoke tests;
- CI and GitHub Pages deployment configuration;
- initial architecture, roadmap and privacy documentation;
- a completed cross-product accessibility, test and fixture-provenance review.
- thirteen curated handbook topics loaded directly from canonical Markdown;
- accessible topic navigation, table-of-contents controls and local search.

All five MVPs are complete. Together they cover a fictional credit application
and agent review, vehicle reservation, multi-tenant ticketing, tenant-isolated
bulk product registration, and explainable simulated retail insights.

## Technology

- React 19 and TypeScript
- Vite and Tailwind CSS
- React Router with hash-based routing
- pnpm workspaces and Turborepo
- Vitest and Testing Library
- Playwright
- ESLint and Prettier
- GitHub Actions and GitHub Pages

The application is static-first. It has no production backend, database, authentication, analytics or paid integration.

## Workspace

```text
.
├── apps/
│   └── portfolio/          # Published React application
│       └── src/content/handbook/ # Canonical handbook Markdown
├── packages/
│   └── design-system/      # Small, genuinely shared UI primitives
├── docs/
│   ├── architecture/
│   ├── case-studies/
│   └── decisions/
└── .github/workflows/      # Validation and GitHub Pages deployment
```

New packages should be introduced only after a real reuse boundary appears. Individual studies begin as modules within `apps/portfolio`, not as separate applications.

## Local development

Requirements:

- Node.js 22.12 or newer
- pnpm 10.13.1

```bash
pnpm install
pnpm dev
```

The local application is available at `http://localhost:5173`.

## Validation

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

## Deployment

The production Vite base path is `/engineering-case-studies/`. `HashRouter` keeps direct navigation and refreshes compatible with GitHub Pages without a custom 404 redirect.

Pushes to `main` run validation and then deploy `apps/portfolio/dist` through the official GitHub Pages actions. The repository must have GitHub Pages configured to use **GitHub Actions** as its source.

Published collection: <https://viniciuspizettadesouza.github.io/engineering-case-studies/>

## Documentation

- [Engineering handbook](apps/portfolio/src/content/handbook/)
- [Handbook migration report](docs/handbook-migration.md)

- [Project brief](docs/project-brief.md)
- [Implementation roadmap](docs/implementation-roadmap.md)
- [Architecture overview](docs/architecture/overview.md)
- [Privacy and intellectual property](docs/privacy-and-ip.md)
- [Financial application MVP](docs/case-studies/financial-operations-platform.md)
- [Vehicle reservation MVP](docs/case-studies/commerce-experience.md)
- [Public transport ticketing MVP](docs/case-studies/accessible-transit-platform.md)
- [Bulk catalogue MVP](docs/case-studies/modular-enterprise-workspace.md)
- [Retail insights MVP](docs/case-studies/retail-insights-workspace.md)
- [Cross-product hardening review](docs/cross-product-hardening.md)
- [Portfolio integration and release handoff](docs/portfolio-integration.md)
- [Architecture decisions](docs/decisions/)

## Project identity

**Engineering Practice Lab** is a provisional public title. The repository slug,
package scopes, browser-storage keys and GitHub Pages base path intentionally
remain `engineering-case-studies` until the naming decision is finalized. See
[ADR 0008](docs/decisions/0008-provisional-project-identity.md).

## Working agreement

Work proceeds one reviewed phase at a time. A phase is complete only when its scope is documented, the relevant behaviour is accessible, validation passes and no proprietary information has entered the repository.

No commit, remote repository or deployment is created as part of the scaffold. Those actions remain explicit decisions.
