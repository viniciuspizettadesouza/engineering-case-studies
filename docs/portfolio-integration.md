# Portfolio Integration and Release Handoff

Status: repository work complete; external portfolio update pending.

## Published collection

- Application: <https://viniciuspizettadesouza.github.io/engineering-case-studies/>
- Source: <https://github.com/viniciuspizettadesouza/engineering-case-studies>

The application now presents all five studies as complete, links directly to the
relevant source directory from every case-study page, exposes repository and
personal-portfolio navigation, and includes shareable description metadata.

## Personal portfolio card copy

### Engineering Case Studies

Five executable, fictional products demonstrating accessible frontend
architecture, product judgement and testing across financial workflows,
commerce, public transport, multi-tenant catalogue operations and explainable
retail analytics.

Primary link: the published collection above. Secondary link: the source
repository. Suggested capabilities: React, TypeScript, accessibility,
architecture, testing and responsible AI.

The personal portfolio lives outside this repository, so adding this card is the
only remaining integration action and must be performed in that codebase.

## Résumé positioning

Suggested project entry:

> Engineering Case Studies — Designed and built five fictional, executable
> product workflows in React and TypeScript, with framework-independent domain
> modelling, accessible error recovery, deterministic service states, tenant
> isolation, explainable simulated analytics, and desktop/mobile automated tests.

Keep this under projects or selected engineering work. Do not describe simulated
results as commercial outcomes or imply that the studies reproduce employer
systems.

## LinkedIn positioning

Suggested concise description:

> I built a public collection of five executable engineering case studies to
> show how I approach accessible workflows, proportional architecture,
> multi-tenancy, testing and responsible AI. Every organisation and dataset is
> fictional; the source, decisions and limitations are published alongside the
> working products.

## Final release review

- All five case studies have executable routes and complete status labels.
- Each study links to source, decisions, limitations and accessibility evidence.
- The landing page uses completed, present-tense language.
- Open Graph and standard description metadata communicate the collection.
- Fixture provenance and the fictional-content boundary are documented.
- Formatting, lint, typecheck, unit tests, production build and desktop/mobile
  browser tests form the release gate.
- GitHub Pages still requires repository settings to use GitHub Actions.
- The personal-portfolio card and any résumé or LinkedIn edits remain explicit
  human publishing decisions.
