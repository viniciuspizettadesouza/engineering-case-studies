# Engineering Case Studies

Interactive, fictional engineering case studies inspired by the kinds of problems I have encountered throughout my career.

This repository is both a portfolio and a working engineering notebook. Each completed study will pair a small executable product workflow with the reasoning behind it: constraints, architecture, trade-offs, accessibility, testing and what I would do differently today.

> [!IMPORTANT]
> This project does not reproduce employer products. All organisations, users, data, metrics, workflows and business rules are fictional. It contains no employer source code, private architecture, internal documentation, branding or customer information.

## Current state

Version `0.1.0` is the repository foundation:

- an accessible landing page;
- a chronological catalogue of six planned studies;
- data-driven placeholder pages that clearly identify unfinished work;
- a minimal shared design system;
- unit and browser smoke tests;
- CI and GitHub Pages deployment configuration;
- initial architecture, roadmap and privacy documentation.

The first planned executable study is **Accessible Transit Platform**. It will demonstrate an accessible, themeable subscription flow for fictional transport operators.

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

## Documentation

- [Project brief](docs/project-brief.md)
- [Implementation roadmap](docs/implementation-roadmap.md)
- [Architecture overview](docs/architecture/overview.md)
- [Privacy and intellectual property](docs/privacy-and-ip.md)
- [First study brief](docs/case-studies/accessible-transit-platform.md)
- [Architecture decisions](docs/decisions/)

## Working agreement

Work proceeds one reviewed phase at a time. A phase is complete only when its scope is documented, the relevant behaviour is accessible, validation passes and no proprietary information has entered the repository.

No commit, remote repository or deployment is created as part of the scaffold. Those actions remain explicit decisions.
