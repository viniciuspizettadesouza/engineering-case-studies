# Retail Insights Workspace — Accessibility Review

Status: completed for the MVP; this is not a WCAG certification.

## Scope and evidence

The review covers portfolio/store and date filters, KPIs, category charts,
insight selection, provenance, and loading, empty, stale and analysis-failure
states. Evidence comes from semantic inspection, keyboard navigation and the
desktop/mobile Chromium journey.

## Findings

- Native labelled selects update the complete snapshot consistently.
- KPI labels accompany every value and signed percentages do not rely on colour.
- Decorative bar geometry is hidden from assistive technology; an adjacent
  captioned table supplies the exact category values.
- Insight choices are native buttons with pressed state.
- Every observation exposes its supporting metric, period, generation time,
  simulated confidence and limitation.
- Loading and freshness updates use status semantics; analysis failure uses an
  alert without removing the underlying aggregate data.
- Simulated generated content is visibly labelled potentially fallible.

## Remaining manual work

Production work should include screen-reader chart exploration, zoom and reflow
at larger datasets, localisation review, user research on uncertainty language,
and testing with people who routinely interpret operational dashboards.
