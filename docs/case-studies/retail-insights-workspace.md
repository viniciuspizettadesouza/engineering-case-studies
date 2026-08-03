# Retail Insights Workspace — MVP Brief

Status: complete.

## Fictional premise

Managers of several invented supermarkets need a concise daily view of sales performance. A scheduled analysis process examines fictional aggregated sales data and creates a small set of insights that managers can verify against supporting visualisations.

The study is informed by the general problem of analytics across many retail locations. Store identities, transactions, products, categories, metrics, thresholds, insight text and model behaviour are created solely for this repository. It does not reproduce a real retailer's dashboard or analysis rules.

## Primary user goal

A store manager can select a reporting date, understand the most relevant changes in sales and inspect the data supporting each generated insight.

```text
Choose portfolio, store and date
        ↓
Review sales overview
        ↓
Select a generated insight
        ↓
Inspect supporting visualisation
        ↓
Compare with the underlying aggregate table
```

## Actors

- **Store manager:** reviews one fictional store and its daily insights.
- **Regional manager:** compares summary performance across several fictional stores.

Roles are simulated views. They are not production authentication or authorisation.

## MVP scope

- several invented stores with deterministic daily aggregate fixtures;
- portfolio and single-store summary views;
- total sales, transaction count, average basket and category breakdowns;
- comparisons with an invented previous period;
- a feed of precomputed AI-assisted insights for each reporting date;
- supporting line, bar or ranked-category visualisations;
- accessible table and text alternatives for essential chart information;
- insight provenance including generation time, data period and affected metric;
- simulated confidence and limitation labels that do not imply certainty;
- deterministic loading, empty, stale and analysis-failure scenarios;
- responsive views with unit, integration and critical E2E coverage.

## Insight boundary

The MVP does not need a live generative model. A typed analysis service returns deterministic insight fixtures as if a scheduled daily process had produced them. This makes the workflow testable and avoids presenting generated commentary as factual or autonomous decision-making.

Each insight contains:

- a concise observation;
- the store and reporting period;
- the metric and comparison that support it;
- a suggested chart configuration;
- generation time and data freshness;
- a simulated confidence indicator and limitation note.

Insights describe patterns; they do not prescribe staffing, pricing or employment actions.

## Acceptance criteria

- changing store or date updates KPIs, insights and charts as one consistent data snapshot;
- each insight links to the exact fictional aggregate used to support it;
- essential values and trends remain available without relying on colour or chart geometry;
- stale or incomplete data is visibly distinguished from current data;
- an analysis failure does not prevent access to the underlying dashboard data;
- portfolio summaries never mix records outside the selected fictional region;
- all generated content is labelled as simulated and potentially fallible;
- no chatbot control appears in the MVP.

## Out of scope

- the conversational chatbot and generation of new charts from natural-language requests;
- live AI APIs, model training, agents or autonomous actions;
- real stores, products, transactions, customer data or commercial metrics;
- forecasting, pricing recommendations or employee-performance decisions;
- production data pipelines, streaming ingestion or role enforcement;
- copied branding, layouts, thresholds or terminology from a real retailer.

## Later increments

After all five MVPs exist, a later version may add a constrained chatbot. It would query only the typed fictional analytics boundary, show the filters and aggregates used, generate visualisation specifications rather than executable code, and require the manager to verify results. Other candidates include saved views, scheduled reports and a server-backed batch pipeline.

## Implementation and accessibility notes

The dashboard derives every KPI, category ranking and insight selection from one typed date-and-store slice. Charts repeat their essential values in a semantic table and text summary; colour and geometry are supplementary. Insight controls are native buttons with pressed state, generated content is labelled simulated and fallible, and stale, empty, loading and failure states use meaningful status or alert semantics. A failed analysis never hides the underlying aggregates.

## Limitations and privacy boundary

All stores, aggregates, comparisons and observations are deterministic fiction. There is no customer-level data, live model, analytics transmission or production role enforcement. Confidence is a demonstration label, not a statistical probability. A production design would need governed metric definitions, pipeline observability, regional authorisation, accessible chart testing with assistive technology and documented model evaluation.

## What I would do differently today

I would version the aggregate and insight provenance contracts, calculate snapshots in an observable server-side pipeline, and expose freshness per source. Any future generative layer would be constrained to cited aggregates, evaluated for unsupported claims and kept away from automated staffing, pricing or employment decisions.
