# ADR 0007: Explainable Deterministic Retail Insights

## Status

Accepted for the MVP

## Context

The retail insights study needs to demonstrate useful analysis without relying on real retailer data, a live model, or unsupported claims of intelligence. Managers must be able to inspect the source, scope, freshness, and limitations of every presented observation.

## Decision

Use typed fictional daily aggregates and precomputed observations behind framework-independent selection and summary functions. Every observation identifies its store, date, metric, generation time, confidence limitation and exact supporting row. Charts are enhancements to equivalent tables and text.

## Consequences

The workflow is deterministic, inspectable and testable without a live model or invented claims of intelligence. It demonstrates responsible presentation and failure isolation, while deliberately excluding production pipeline, model-evaluation and authorisation concerns.

## Alternatives considered

### Live generative model

Rejected because non-deterministic output, external data handling, and model evaluation would broaden the MVP without strengthening its core explainability evidence.

### Opaque prewritten recommendations

Rejected because observations without supporting rows, scope, and limitations would encourage unsupported trust.

### Charts without equivalent data

Rejected because geometry alone would weaken accessibility and make exact supporting values harder to inspect.
