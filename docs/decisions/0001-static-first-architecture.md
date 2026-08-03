# ADR 0001: Use a Static-First Frontend Architecture

- Status: accepted
- Date: 2026-08-03

## Context

The first releases need to demonstrate frontend architecture, accessibility, product workflows, testing and technical communication. They do not require shared user accounts, sensitive processing or multi-user persistence.

GitHub Pages is inexpensive and operationally simple, but it serves static files and does not run an application server.

## Decision

Build the portfolio as a React/Vite static application and deploy its generated assets to GitHub Pages.

Represent server-like capabilities through typed interfaces with deterministic local implementations. Use browser storage only when persistence improves a demonstrated workflow. Do not introduce a database, production API or fake REST server during the foundation phases.

Use `HashRouter` so application routes survive direct navigation and refreshes on GitHub Pages.

## Consequences

### Positive

- deployment has little operational overhead;
- no credentials or production data are needed;
- studies can focus on user experience and engineering reasoning;
- deterministic adapters make failure states and tests reliable;
- hosting costs and maintenance remain minimal.

### Negative

- URLs contain a hash;
- server rendering and server-only security properties cannot be demonstrated;
- state is local to one browser;
- realistic network and concurrency behaviour must be explicitly simulated.

## Alternatives considered

### Next.js with server rendering

Rejected for the foundation because server rendering adds hosting and runtime decisions that do not strengthen the first study.

### Separate frontend and API

Rejected until an executable study has a server-specific learning objective.

### Fake REST server

Rejected because network-shaped ceremony would not create real backend guarantees. Typed ports retain the future boundary with less machinery.

### BrowserRouter plus a custom 404 redirect

Rejected for now because it adds hosting-specific redirect logic. It can be reconsidered if the site moves to a host with fallback routing.
