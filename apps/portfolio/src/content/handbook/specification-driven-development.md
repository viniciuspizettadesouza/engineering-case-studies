# Specification-Driven Development

A specification gives people and AI assistants a shared account of what should be built, why it matters, and where the boundaries are. It is a living decision record, not a promise that planning will remove uncertainty or make implementation correct on the first attempt.

## Why specification improves AI-assisted delivery

AI can turn an underspecified request into plausible software quickly, but plausibility is not approval. When goals, users, workflows, constraints, and non-goals are implicit, an assistant must either stop for clarification or fill the gaps. Silent inference creates avoidable rework and can introduce unwanted data, permissions, dependencies, or features.

A useful specification makes those decisions inspectable before they become code. It should remain readable by technical and nontechnical collaborators, distinguish known requirements from assumptions, and change when the team learns something. Planning is valuable because it creates earlier feedback, not because a short planning session guarantees a successful build.

For the implementation and review stages that follow, see the handbook's [AI-assisted engineering workflow](#/handbook/testing-delivery-and-devops#ai-assisted-engineering-workflow), [test strategy](#/handbook/testing-delivery-and-devops#test-strategy), and [architecture decision records](#/handbook/testing-delivery-and-devops#architecture-decision-records).

## Artifact boundaries and requirement provenance

Different artifacts answer different questions:

| Artifact              | Main question                                         | Useful contents                                                                             | Avoid                                                |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Product specification | What and why?                                         | Problem, goals, users, scope, major workflows, success criteria, and high-level constraints | Premature file structure and low-level architecture  |
| Feature specification | How should one capability behave?                     | User outcome, flows, boundaries, failure states, dependencies, and acceptance criteria      | Unsupported features and implementation tasks        |
| Implementation plan   | How will the approved behavior be built and verified? | Technical design, files, interfaces, dependencies, migrations, tests, and rollout           | Reopening product scope without an explicit decision |

Every proposed behavior should also carry its provenance:

- **Explicit requirement:** supported by an approved source or decision.
- **Agent inference:** a plausible interpretation that still requires review.
- **Optional suggestion:** a possible enhancement outside the current commitment.

Mark capabilities as **V1**, **deferred**, or **excluded**. Deferred means “not now”; excluded means the team has deliberately decided not to build it within the stated scope. Open questions should remain visible until they are answered or assigned, rather than being deleted merely to make the document look complete.

## Refine the specification before building

A practical refinement loop is:

1. Gather the rough idea, sketches, notes, stakeholder input, and existing constraints.
2. Draft the product specification with goals, users or roles, core workflows, scope, assumptions, and open decisions.
3. Remove redundant roles, invented fields, speculative features, and implementation detail that does not affect product behavior.
4. Add lightweight technical constraints when they materially shape the product, such as runtime, data storage, accessibility, privacy, or deployment boundaries.
5. Ask the assistant to describe exactly what it would build. Separate requirements, assumptions, and optional enhancements, then resolve disagreements in the specification.
6. Repeat with visual and journey-based validation before extracting feature work.

For API and data-contract concerns discovered during refinement, use the existing guidance on [APIs and data flow](#/handbook/architecture-and-patterns#apis-and-data-flow).

## Validate interpretation before implementation

Mockups are probes into the current interpretation. They expose inferred fields, actions, filters, navigation, empty states, and layout assumptions while those choices are still inexpensive to change. They do not prove validation, authorization, persistence, failure recovery, accessibility, or any other behavior that must execute.

Two related reviews find different classes of omission:

- **Stress-testing** walks through already-known journeys and decisions under concrete conditions: an external service is unavailable, a user loses access, a request is repeated, or a permission boundary is crossed.
- **Gap analysis** asks which decisions are absent altogether: abuse controls, account recovery, data deletion, notification preferences, accessibility, operations, pagination, attachments, or other lifecycle concerns.

Present unresolved gaps with alternatives and consequences. Product decisions should be approved by a person accountable for the outcome, then written back into the canonical specification.

In the course example, an email outage exposed the friction of verifying every action by email. The example product moved to customer accounts, which reduced that friction but introduced password recovery and account-security obligations. That is a demonstration of tracing consequences, not a universal recommendation to add authentication.

## Extract traceable feature specifications

Derive features only after the product specification is coherent enough to support them. Each feature should point back to approved requirements and describe one independently understandable outcome. Split a feature when its flows, permissions, or dependencies make it too large to implement and verify safely.

Order features by real dependencies rather than presentation preference. If feature analysis reveals a product change, approve it and reconcile it into the product specification; do not let a downstream feature document silently become a second source of truth.

Acceptance criteria should describe observable success and important boundaries. Technical tasks belong in the later implementation plan. This separation keeps product intent stable while allowing the implementation to evolve.

## Scaffold and verify within agreed boundaries

Once the specification, feature boundaries, and design references agree, plan the smallest useful application shell. Establish shared layout, navigation, routes, and placeholder content without prematurely implementing authentication or business rules.

Before accepting generated work:

- inspect the agent's plan, commands, code, and dependency changes;
- compare the result with the approved scope and design references;
- confirm that placeholders are not presented as working behavior;
- run static analysis, tests, accessibility checks, and a production build appropriate to the risk;
- review the diff before committing, and keep consequential commands behind explicit approval.

The course scaffold used Laravel, Inertia.js, Vue.js, MySQL, and Tailwind CSS. That stack was specific to its example and does not prescribe technology for another repository.

## Reusable prompt sequence

### Draft the initial specification

> Create a product specification from this idea and its supporting material. Include the problem, goals, users or roles, core workflows, V1 scope, non-goals, success criteria, and significant constraints. Label unsupported assumptions and unresolved questions. Avoid speculative features and premature implementation detail.

### Refine the specification

> Review the specification for ambiguity, unsupported assumptions, redundant roles, invented fields, excessive implementation detail, and missing requirements. Propose each change with its rationale. Update the living specification only after the decision is accepted, and keep unresolved questions tracked.

### Add agreed constraints

> Add the agreed high-level technical and operational constraints that affect product decisions. Do not invent technology choices or expand into low-level architecture.

### Reveal scope assumptions

> Describe exactly which features, journeys, and technical choices you would implement from this specification. Separate explicit requirements, assumptions, and optional enhancements. Flag scope creep, obsolete dependencies, and anything that should be excluded or deferred from V1.

### Generate interpretation mockups

> Produce representative UI layouts from the specification without implementing behavior. Identify every inferred field, action, filter, state, and interaction. Compare them with V1 scope and propose specification changes before applying them.

### Stress-test journeys

> Walk through critical journeys and realistic service-failure scenarios. For each step, distinguish specified from assumed behavior, identify missing states, and explain the product and technical trade-offs. Request decisions where the specification is silent.

### Find missing decisions

> Look for missing decisions involving abuse, authorization, data lifecycle, privacy, accessibility, notifications, failure recovery, operations, and edge cases. Present gaps individually with viable alternatives and consequences; do not choose product behavior autonomously.

### Extract feature specifications

> Derive one traceable feature entry per approved capability. Include its purpose, user outcome, behavior, boundaries, failure cases, measurable acceptance criteria, and dependencies. Do not invent features or implementation details. Split oversized features, order them by dependency, and reconcile approved product changes into the source specification.

### Plan a bounded scaffold

> Using the approved product specification, feature specifications, and design references, plan the minimal application shell. Limit work to shared layout, navigation, routes, and placeholders. Do not implement authentication or business logic. Minimize dependencies and define the validation required before commit.

## Templates and review checklist

A compact product specification can start with:

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

A feature specification can start with:

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

Before implementation, confirm that:

- a teammate can explain the purpose and behavior without reading code;
- each feature traces to an approved requirement;
- assumptions are visible instead of silently implemented;
- V1, deferred work, and explicit exclusions are distinguishable;
- permissions, failure modes, accessibility, privacy, misuse, and operations have been considered at the depth their risk requires;
- mockups, feature specifications, and the product specification agree;
- the implementation order respects dependencies;
- scaffolding avoids unrequested business logic and dependencies;
- generated code and commands will be reviewed and validated.

## Evidence, examples, and limits

This chapter synthesizes a ten-lesson course workflow from user-provided notes; it does not reproduce course transcripts or proprietary templates. The course compared a vaguely prompted to-do application with a preplanned demonstration, but that comparison was not a controlled benchmark. Treat its speed and polish as illustrative, not proof of a universal productivity effect.

Other example decisions were contextual too. Combining overlapping administrator roles reduced one example's complexity; excluding duplicate merging or attachments kept its V1 narrow; choosing pagination, rate limits, password recovery, and disposable-email blocking addressed its particular gaps. Real products require their own evidence, threat model, legal review, and accessibility work. Non-functional constraints belong early whenever they change the product decision, even if the first draft is intentionally lean.
