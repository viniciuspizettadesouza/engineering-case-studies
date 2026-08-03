# Modular Enterprise Workspace — MVP Brief

Status: planned.

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

## Later increments

Candidate additions after all five MVPs exist include role permissions, saved mappings, asynchronous jobs, server-enforced tenancy, catalogue versioning and human-reviewed AI enrichment.
