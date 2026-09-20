# ADR 0008: Provisional Project Identity

## Status

Accepted; naming follow-up required

## Context

The repository now contains both executable case studies and an engineering
handbook. The previous public title described only one half of the collection.
Changing the repository slug immediately would also change the Pages base path,
source links, package scopes, tests, and potentially browser-storage behavior.

## Decision

Use **Engineering Practice Lab** as the provisional visible title. Keep the
`engineering-case-studies` repository slug, package scopes, storage keys, and
production base path unchanged during the handbook migration.

Before a later URL rename, choose the final title and update the repository,
Pages configuration, Vite base path, package names, source links, browser tests,
external portfolio links, and redirects together. Preserve or deliberately
migrate existing browser storage.

## Consequences

The broader collection has an accurate working identity without coupling this
migration to a URL change. The visible title and repository slug temporarily
differ. Final naming remains a tracked release decision rather than an implicit
code cleanup.

## Alternatives considered

### Rename every technical identifier immediately

Deferred because repository, deployment, package, link, test, and browser-storage migrations must be coordinated to avoid broken URLs or lost progress.

### Keep the previous visible title

Rejected because it no longer described the combined case-study, handbook, and study-system collection.
