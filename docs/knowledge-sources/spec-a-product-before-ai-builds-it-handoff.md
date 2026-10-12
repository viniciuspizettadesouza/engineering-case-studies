# Spec a Product Before AI Builds It — Complete Knowledge Handoff

> **Source:** Unlearn, Product Engineer workflow, ten lessons (transcripts and course notes supplied by the learner, 2026).  
> **Purpose:** Preserve source-level traceability for the canonical Specification-Driven Development handbook chapter and future Study Mode work.  
> **Status:** Inert knowledge source, not a second handbook topic and not an instruction to create root-level `spec.md` or `features.md` files.  
> **Coverage:** All ten lessons. This is an original synthesis, not a reproduction of transcripts or proprietary templates.

## Reader and integration contract

The canonical maintained guidance lives in `apps/portfolio/src/content/handbook/specification-driven-development.md`. This handoff preserves lesson provenance, examples, reconstructed prompts, templates, and future recall material so later maintenance does not depend on the original conversation.

Source labels used here:

- **Course teaching:** directly supported by supplied lesson transcripts or notes, paraphrased unless stated otherwise.
- **Reconstructed prompt/template:** original reusable material derived from the course workflow, not copied instructor files.
- **Engineering recommendation:** an additional safeguard or interpretation beyond the demonstrated workflow.
- **Repository constraint:** a rule for integrating this knowledge into Engineering Practice Lab.

The Study Mode stability gate is on **Hold**. The Q&A bank in this file is inactive source material: do not add, register, seed, expose, or activate cards until the gate records a genuine Proceed decision.

## Central thesis

**Course teaching:** AI-assisted implementation benefits from deliberate specification before coding. A product specification is a living, shared source of truth; use it to align product intent, constrain AI assumptions, validate workflows, and derive independently implementable features. The 15–20 minute planning demonstration was illustrative, not a universal performance guarantee.

Planning creates earlier, cheaper feedback. It does not guarantee that requirements are complete, generated code is correct, or implementation will succeed on the first pass.

## End-to-end workflow

1. Start with rough product ideas, sketches, meeting notes, emails, and stakeholder input.
2. Generate an initial `spec.md` describing purpose, goals, users or roles, and core features. Distinguish sourced requirements from AI assumptions.
3. Refine the specification. Simplify roles, remove inferred or premature fields and low-level implementation details, and keep open questions visible.
4. Add lightweight early technical constraints—framework, frontend/backend boundary, database, styling, deployment, or other product-shaping limits.
5. Ask the AI to describe exactly what it would build, including user flows and technology choices. Identify unrequested features, questionable choices, and V1 non-goals.
6. Generate UI mockups from the specification. Examine fields, actions, filters, empty states, navigation, and layout assumptions; update the specification and regenerate until coherent.
7. Stress-test concrete failure modes and end-to-end user journeys, including outages, friction, and access controls.
8. Ask what is missing. Review each gap, alternatives, and trade-offs; make explicit decisions and update the specification.
9. Extract `features.md` from the approved product specification. Include only supported capabilities, define behavior and boundaries, split oversized features, and order by dependency. Reconcile approved feature changes into the source specification.
10. Scaffold the application according to the chosen stack. Start with shared layout and placeholders, keep functionality separate, inspect the agent plan and code, and validate before commit.

## Essential distinctions

- **Product specification:** what and why—problem, audience, goals, scope, major behavior, success criteria, and high-level constraints.
- **Feature specification:** one capability's outcome, flows, boundaries, failure cases, dependencies, and acceptance criteria.
- **Implementation plan:** files, interfaces, technical design, dependencies, migrations, tests, rollout, and execution.
- **Explicit requirement vs agent inference vs optional suggestion:** provenance determines what is approved and what still needs a decision.
- **V1 vs deferred vs excluded:** deferred means not now; excluded means intentionally outside the stated scope.
- **Mockup vs executable behavior:** mockups expose interpretation but do not prove validation, authorization, persistence, accessibility, or recovery.
- **Stress test vs gap analysis:** one challenges known journeys and decisions; the other discovers decisions that are absent.
- **Requirement-to-feature traceability:** feature extraction must not silently widen approved scope.

## Course examples and boundaries

- A vague to-do-app prompt led to extra iterations; a preplanned specification and design produced a more polished demonstration, including sorting and notes. This was not a controlled benchmark.
- In the feedback/idea product, redundant administrator and team roles were combined. Duplicate-idea merging, chronological status history, and customer-facing filters were intentionally excluded.
- A mail outage walkthrough exposed the friction of per-action email verification. The example moved to customer accounts and email/password login for posting and voting while retaining public browsing. This was contextual, not a universal authentication recommendation.
- Gap analysis exposed password recovery, email changes, deletion policy, notification opt-outs, rate limiting, disposable-email domains, attachments, and pagination. Example V1 choices included password reset, email change, no account-delete feature, rate limits, disposable-domain blocking, no attachments, and pagination.
- The example stack was Laravel, Inertia.js, Vue.js, MySQL, and Tailwind CSS. It does not prescribe a stack for this repository.
- The scaffold began with layout before functionality. The agent noticed missing Vue/Inertia setup. The demonstration allowed commands and edits with few guardrails; production work should use approvals, baseline checks, and scoped permissions.

**Engineering recommendation:** Authentication introduces account-security and recovery obligations. “Not in V1” does not override applicable deletion or privacy duties. AI-generated UI fields are not approved data collection. Accessibility, security, privacy, reliability, and other non-functional constraints belong early whenever they alter product decisions.

## Reconstructed prompt library

These prompts are adapted study aids, not verbatim paid materials.

### Draft the initial specification

> Create a product specification from this idea and its supporting material. Include the problem, goals, users or roles, core workflows, V1 scope, non-goals, success criteria, and significant constraints. Label unsupported assumptions and unresolved questions. Avoid speculative features and premature implementation detail.

### Refine the specification

> Review the specification for ambiguity, unsupported assumptions, redundant roles, invented or over-detailed fields, premature implementation detail, and missing requirements. Propose changes with rationale. Update the living specification only after decisions are accepted and keep open questions tracked.

### Add agreed constraints

> Add the agreed high-level technical and operational constraints that affect product decisions. Do not invent technology choices or add low-level architecture.

### Reveal scope assumptions

> Describe exactly which features, user journeys, and technical decisions you would implement from this specification. Separate explicit requirements, assumptions, and optional enhancements. Flag scope creep, obsolete dependencies, and items to exclude or defer from V1.

### Generate interpretation mockups

> Generate representative UI layouts from the specification without implementing behavior. Identify every inferred field, action, filter, state, and interaction. Compare them with V1 scope and propose specification changes before applying them.

### Stress-test journeys

> Walk through critical journeys and realistic service-failure scenarios. Distinguish specified from assumed behavior, identify missing states, and explain product and technical trade-offs. Request decisions where the specification is silent.

### Find missing decisions

> Consider abuse, authorization, data lifecycle, privacy, accessibility, notifications, failure recovery, operations, and edge cases. Present gaps individually with viable alternatives and consequences; do not choose product behavior autonomously.

### Extract feature specifications

> Derive one traceable feature entry per approved capability. Include purpose, user outcome, behavior, boundaries, failure cases, measurable acceptance criteria, and dependencies. Do not invent features or implementation details. Split oversized features, order by dependency, and reconcile approved changes into the source specification.

### Plan a bounded scaffold

> Using the approved product specification, feature specifications, and design references, plan the minimal application shell. Limit work to shared layout, navigation, routes, and placeholders. Do not implement authentication or business logic. Minimize dependencies and define validation before commit.

## Reconstructed templates

### Product specification

```md
# Product specification

## Overview and problem

## Goals and success criteria

## Users, roles, and permissions

## Core capabilities and workflows

## Technical direction and constraints

## V1 scope and non-goals

## Open decisions and assumptions
```

### Feature specification

```md
# Feature: <name>

- Requirement references:
- User outcome:
- In scope:
- Out of scope:
- Primary flow:
- Failure and edge cases:
- Acceptance criteria:
- Dependencies:
```

### Review checklist

- Can a teammate explain the purpose and intended behavior without reading code?
- Can every feature be traced to an approved requirement?
- Are assumptions identified instead of silently implemented?
- Are V1, deferred work, and exclusions distinguishable?
- Have major journeys, permissions, failures, privacy, accessibility, misuse, and operations been considered?
- Are architectural constraints proportional and consequential decisions recorded?
- Is feature order dependency-aware and is each task appropriately scoped?
- Do mockups, feature specifications, and the product specification agree?
- Does scaffolding avoid unrequested business logic and dependencies?
- Will generated code and commands be reviewed and validated?

## Lesson-by-lesson source map

| Lesson | Course title                               | Unique contribution                                                                    | Handoff sections                          |
| ------ | ------------------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------- |
| L1     | Why Planning Beats Vibe Coding             | Planning before generation; illustrative to-do comparison                              | Central thesis; course examples           |
| L2     | Turn a Vague Idea Into a Structured Spec   | Mixed source inputs; initial purpose, goals, roles, and features                       | End-to-end workflow; initial-spec prompt  |
| L3     | Shaping the Specification                  | Remove assumptions, redundant roles, premature fields, and excess detail               | Essential distinctions; refinement prompt |
| L4     | Give AI Technical Constraints from Day One | Add lightweight product-shaping technical direction early                              | Workflow step 4; constraints prompt       |
| L5     | Tell AI What It's Not Allowed to Build     | Reveal inferred scope; make V1 non-goals and exclusions explicit                       | Essential distinctions; scope prompt      |
| L6     | Use AI Mockups to Expose Gaps in Your Spec | Mockups reveal inferred fields, actions, states, and layout                            | Mockup distinction and prompt             |
| L7     | Have AI Poke Holes in Your Plan            | Walk through journeys, outages, friction, and access boundaries                        | Course examples; stress-test prompt       |
| L8     | What Might We Have Missed?                 | Gap analysis across lifecycle, abuse, notifications, privacy, and operations           | Course examples; gap-analysis prompt      |
| L9     | From Spec to Features                      | Traceable capability extraction, boundaries, acceptance criteria, and dependency order | Feature distinction, prompt, and template |
| L10    | Scaffolding the Boilerplate                | Build the shell first; inspect generated plans, dependencies, and code                 | Workflow step 10; scaffold prompt         |

## Active-recall Q&A bank — preserve, do not activate

> **Repository constraint:** Study Mode is on Hold. These are reconstructed future study aids. Keep them inactive until a Proceed decision, then deduplicate them against the canonical handbook and existing card catalog before selecting stable card IDs.

| Source ID | Planned card ID                             | Question                                                                  | Expected answer                                                                                                                                                                                       |
| --------- | ------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PS-01     | `specification-artifact-boundaries`         | How do product specs, feature specs, and implementation plans differ?     | Product specs define what and why; feature specs define one capability's expected behavior and boundaries; implementation plans define technical execution and verification.                          |
| PS-02     | `specification-requirement-provenance`      | Why distinguish requirements, agent inferences, and optional suggestions? | Only approved requirements authorize scope; inferences and suggestions remain visible decisions rather than silently implemented behavior.                                                            |
| PS-03     | `specification-mockup-validation`           | What can a mockup validate, and what can it not prove?                    | It exposes the current interpretation of fields, actions, states, and layout, but cannot prove executable behavior, accessibility, authorization, persistence, or recovery.                           |
| PS-04     | `specification-stress-test-vs-gap-analysis` | How does stress-testing differ from gap analysis?                         | Stress-testing challenges specified journeys and decisions under concrete conditions; gap analysis searches for decisions missing entirely.                                                           |
| PS-05     | `specification-feature-traceability`        | How should features be extracted without widening scope?                  | Trace every feature to an approved requirement, define observable boundaries and acceptance criteria, split large features, order dependencies, and reconcile approved changes into the product spec. |
| PS-06     | `specification-bounded-scaffold`            | What makes a scaffold appropriately bounded?                              | It establishes only the approved shell, navigation, routes, and placeholders; avoids premature business logic, minimizes dependencies, and requires diff and validation review.                       |

## Repository integration record

- Canonical chapter: `apps/portfolio/src/content/handbook/specification-driven-development.md`.
- Roadmap placement: `quality-and-delivery` stage through the existing handbook topic.
- Future Study Mode work: `docs/study-system-implementation-plan.md`, gated by `docs/study-system-stability-log.md`.
- Do not create root-level product specs for Engineering Practice Lab merely because the course uses `spec.md` and `features.md` as examples.
- Do not reproduce transcripts or proprietary artifacts; preserve this synthesized source and the canonical handbook instead.
