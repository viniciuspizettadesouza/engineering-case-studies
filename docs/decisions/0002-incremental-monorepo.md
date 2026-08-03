# ADR 0002: Grow the Monorepo Incrementally

- Status: accepted
- Date: 2026-08-03

## Context

The portfolio is expected to contain multiple studies and may eventually need shared UI, models or tooling. At foundation time, however, only one deployable application exists. Creating speculative packages would increase configuration and make boundaries appear more certain than they are.

## Decision

Use pnpm workspaces and Turborepo as the repository boundary, starting with:

- one deployable application, `apps/portfolio`;
- one minimal package, `packages/design-system`, for primitives used across the portfolio shell.

Keep case studies as feature modules inside the portfolio application. Extract a package only after two real consumers establish a stable reuse boundary. Do not create shared ESLint, TypeScript or case-study-model packages during the scaffold.

## Consequences

### Positive

- the repository can add applications without migration to a new workspace model;
- current navigation and development remain simple;
- shared code has evidence-based ownership;
- studies can evolve without premature cross-package contracts.

### Negative

- the workspace and task runner add some overhead before a second application exists;
- configuration is temporarily duplicated if a second package needs similar settings;
- future extraction may require moving imports and updating documentation.

## Alternatives considered

### Single Vite application without workspaces

Viable for the current release, but the planned collection makes a small workspace boundary a reasonable investment.

### Full package structure from day one

Rejected because empty model and configuration packages would communicate architecture that has not yet been validated by implementation.

### One independent repository per study

Rejected because it fragments the career narrative, shared quality tooling and deployment. A study can be extracted later if it develops an independent lifecycle.
