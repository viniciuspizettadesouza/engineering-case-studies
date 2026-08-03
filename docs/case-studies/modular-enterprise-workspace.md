# Modular Enterprise Workspace — MVP Brief

Status: complete.

## Fictional premise

Two invented retail tenants share a workspace for registering many products at once. Each tenant has isolated fixtures, visual tokens and a small set of different validation rules. The domain is inspired by general large-retail catalogue work, but no real retailer name, catalogue, taxonomy, identifier or internal rule is included.

## Primary user goal

A catalogue operator can choose a tenant, import a batch of fictional products, correct validation errors and publish the accepted rows.

```text
Choose tenant
        ↓
Upload CSV or paste rows
        ↓
Preview and validate
        ↓
Correct invalid rows
        ↓
Publish accepted batch
```

## MVP scope

- two fictional tenant configurations;
- shadcn-based form, table, dialog, tabs and notification primitives where useful;
- a documented fictional CSV template;
- CSV upload and paste-from-spreadsheet entry;
- row-level schema validation with an accessible summary;
- inline correction of invalid values;
- counts for total, accepted and rejected rows;
- simulated batch publication and rejected-row export;
- deterministic tenant switching with state isolation;
- typed domain and service boundaries independent of the table UI.

## Minimal product fields

- tenant-scoped product identifier;
- name and short description;
- fictional category;
- price and currency;
- publication status.

One tenant may require a fictional compliance label while the other may require a package-size field. These are invented rules used only to demonstrate configuration-driven validation.

## Acceptance criteria

- importing a valid template produces a preview without publishing automatically;
- invalid cells are associated with useful messages and can be reached by keyboard;
- accepted and rejected counts update after corrections;
- switching tenants cannot expose, publish or validate the other tenant's draft;
- publishing records the tenant, batch identifier, counts and simulated timestamp;
- rejected rows can be exported without accepted product data;
- the demo supports empty, malformed-file, partial-success and service-failure states.

## Out of scope

- real retailer products, brands, identifiers, taxonomies or policies;
- production authentication, authorisation or database isolation;
- supplier integrations, media management or inventory;
- AI enrichment in the MVP;
- installing the entire shadcn catalogue when only a few components are required.

## Implementation notes

The executable workflow uses a small set of local, composable form, tab, table,
notification and button patterns styled with the same token-driven approach as
the rest of the portfolio. The domain parser and validation rules do not depend
on React. Browser storage keys include the tenant identifier for drafts and
publication records, so switching tenants restores only that tenant's state.

Publication is a deterministic local simulation: accepted rows contribute to a
tenant-scoped batch record, while rejected rows remain editable. Export creates
a CSV containing rejected rows and their current validation messages; accepted
product data is excluded.

## Accessibility review

- import modes use an explicitly labelled tab list and tab panels;
- validation summaries receive focus after an invalid import and link to cells;
- every table input has a row-specific accessible name, `aria-invalid` state and
  an associated error message;
- counts and successful validation use live status semantics;
- controls meet the 44-pixel minimum target used throughout the portfolio;
- tables remain horizontally scrollable without removing semantic headers;
- tenant focus and colour tokens keep a visible non-colour focus indicator;
- reduced-motion behaviour is inherited from the global application stylesheet.

## Threat and privacy boundary

All examples are fictional and remain in the browser. Local storage demonstrates
client-side state isolation, not production security. A real implementation
would derive tenant identity on the server, enforce authorisation on every read
and write, scan uploads, set size and rate limits, and audit publication actions.

## Limitations

- the CSV parser supports quoted cells and spreadsheet tabs, but not mappings or
  locale-specific numeric formats;
- simulated publication has no backend durability, authentication or retries;
- local storage can be inspected or changed by anyone using the browser;
- automated accessibility checks complement rather than replace assistive
  technology and keyboard review.

## What I would do differently today

For production, I would stream large files into a tenant-authorised ingestion
service, validate rows in bounded background jobs, provide resumable job status,
and keep the client table virtualised. I would retain the configuration-driven
rules, but version schemas and publication contracts so drafts remain explainable
when tenant policy changes.

## Later increments

Candidate additions after all five MVPs exist include role permissions, saved mappings, asynchronous jobs, server-enforced tenancy, catalogue versioning and human-reviewed AI enrichment.
