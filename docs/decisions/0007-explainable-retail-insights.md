# ADR 0007 — Explainable deterministic retail insights

Status: accepted.

## Decision

Use typed fictional daily aggregates and precomputed observations behind framework-independent selection and summary functions. Every observation identifies its store, date, metric, generation time, confidence limitation and exact supporting row. Charts are enhancements to equivalent tables and text.

## Consequences

The workflow is deterministic, inspectable and testable without a live model or invented claims of intelligence. It demonstrates responsible presentation and failure isolation, while deliberately excluding production pipeline, model-evaluation and authorisation concerns.
