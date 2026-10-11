# Course knowledge handoff: Spec a Product Before AI Builds It

Source: Unlearn, Product Engineer workflow, 10 lessons. Synthesized from user-provided transcripts. This is an original summary, not a reproduction of transcripts or proprietary templates.

## Central thesis

AI-assisted implementation benefits from deliberate specification before coding. A product specification is a living, shared source of truth; use it to align product intent, constrain AI assumptions, validate workflows and derive independently implementable features. The 15–20 minute planning demonstration is illustrative, not a universal performance guarantee.

## End-to-end workflow

1. Start with rough product ideas, sketches, meeting notes, emails and stakeholder input.
2. Generate an initial `spec.md` describing purpose, goals, users/roles and core features. Distinguish sourced requirements from AI assumptions.
3. Refine the specification. Simplify roles, remove inferred or premature fields and low-level implementation details. Keep open questions until resolved or tracked.
4. Add lightweight early technical constraints (framework, frontend/backend, database, styling), as they may affect product feature decisions.
5. Ask the AI to describe what it would build, including user flows and technology choices. Identify unrequested features, questionable choices and V1 non-goals.
6. Generate UI mockups from the spec; examine fields, actions, filters, empty states and layout assumptions. Update the spec and regenerate until coherent.
7. Stress-test the spec with concrete failure modes and end-to-end user journeys. Examine service outages, friction and access controls.
8. Ask what the spec is missing. Walk through each gap, review alternatives and trade-offs, make explicit decisions and update the spec.
9. Extract `features.md` from `spec.md`. Only include supported features; define purpose, behavior and boundaries, split oversized features and order by dependencies. Reconcile approved feature changes back into `spec.md`.
10. Scaffold the app according to chosen stack. Begin with the shell/layout and placeholders, keeping functionality separate. Inspect the agent plan and resulting code; validate before commit.

## Essential conceptual distinctions

- Product spec: what and why; audience, goals, scope, high-level technical choices.
- Feature spec: expected behavior, user flows, boundaries, acceptance criteria; enough for team alignment, not low-level architecture.
- Implementation plan: files, code changes, technical design, dependencies, tests and execution.
- Explicit requirement versus agent inference versus optional suggestion.
- In-scope V1 versus deferred versus explicitly excluded.
- Mockups validate interpretation; they do not prove behavior.
- Stress-testing existing decisions versus detecting entirely missing decisions.
- Requirement-to-feature traceability; changes must not silently widen approved scope.

## Specific course examples

- A vague to-do-app prompt led to extra iterations; a preplanned specification and design produced a more polished demonstration, including sorting and notes. Not a controlled benchmark.
- Feedback/idea product: combined redundant admin/team roles; intentionally excluded duplicate-idea merging, chronological status history and customer-facing filters.
- Mail outage/user-flow review revealed cumbersome per-action email verification. Changed to customer accounts and email/password login for posting and voting while allowing public browsing. This is an example decision, not a universal authentication recommendation.
- Gap analysis exposed password recovery, email changes, deletion policy, notification opt-outs, rate limiting, disposable-email domains, attachments and pagination. Course V1 decisions included password reset, email change, no account-delete feature, rate limits, disposable-domain blocking, no attachments, pagination preference. Reassess privacy/legal implications for real products.
- Technical stack in the example: Laravel, Inertia.js, Vue.js, MySQL, Tailwind CSS. This is the course example, NOT a prescribed stack for this repository.
- Scaffolded a fresh Laravel project with the layout before functionality. Agent noticed missing Vue/Inertia from the scaffold. The instructor allowed edits/commands with few guardrails for demonstration; production use should prefer approvals and baseline checks.

## Prompt library (adapted from the course, not verbatim paid materials)

### Initial spec
Create `spec.md` from this product idea and supporting material. Include overview, goals, user roles and core features. Label unsupported assumptions and unresolved questions. Avoid speculative features and premature implementation details. Keep it readable for technical and nontechnical stakeholders.

### Refine spec
Review `spec.md` for ambiguity, unsupported assumptions, redundant roles, over-detailed fields and missing requirements. Propose changes with rationale and edit the living spec only after decisions are accepted. Keep open questions tracked.

### Add constraints
Update `spec.md` with the agreed high-level technical stack and significant constraints. Do not invent technology choices or add low-level architecture.

### Reveal scope assumptions
Using `spec.md`, describe exactly what features, user journeys and technical decisions you would implement. Separate explicit requirements, assumptions and optional enhancements. Flag scope creep, obsolete dependencies and items to exclude/defer from V1.

### Generate mockups
Generate representative UI layouts from `spec.md` without implementing features. Identify every inferred field, action, filter and interaction. Compare with V1 scope; propose spec changes before updating it.

### Stress test
Walk through critical user journeys and service-failure scenarios. For each, distinguish specified behavior from assumed behavior, identify missing states and show product/technical trade-offs. Ask for decisions where the spec is silent.

### Gap analysis
Based on `spec.md`, what might we have missed? Consider abuse, authorization, data lifecycle, notifications, failure recovery, accessibility, operations and edge cases. Present gaps one by one with alternative resolutions and implications; do not make product decisions autonomously.

### Feature extraction
Extract `features.md` from `spec.md` with one traceable entry per feature. Include purpose, behavior, boundaries and measurable acceptance criteria. Do not invent features or add implementation details. Split oversized features, order by dependencies and reconcile approved changes into the source spec.

### Scaffold
Use `spec.md`, `features.md` and available design references to plan a minimal application shell. Only scaffold shared layout, navigation and placeholder content. Do not implement authentication or business logic. Review changes, minimize dependencies and run existing validation before committing.

## Suggested spec template

```md
# Product specification
## Overview and problem
## Goals and success criteria
## Users, roles and permissions
## Core capabilities and workflows
## Technical direction and constraints
## V1 scope and non-goals
## Open decisions and assumptions
```

## Suggested feature template

```md
# Feature: <name>
- Requirement references:
- User outcome:
- In scope:
- Out of scope:
- Primary flow:
- Failure/edge cases:
- Acceptance criteria:
- Dependencies:
```

## Suggested review checklist

- Can a teammate explain the purpose and intended behavior without reading code?
- Can each feature be traced to an approved requirement?
- Are assumptions explicitly identified instead of silently implemented?
- Are V1 boundaries clear, including what the system does not do?
- Have major journeys, permissions, failure modes, privacy and misuse cases been evaluated?
- Are architectural constraints proportional and decisions recorded?
- Is the feature order dependency-aware and are tasks appropriately scoped?
- Do mockups and features agree with the source specification?
- Does scaffolding avoid unrequested business logic and dependencies?
- Are generated code and commands reviewed and validated?

## Engineering interpretation / critical notes

- Planning reduces avoidable rework but cannot guarantee first-pass correctness.
- Do not delete unanswered questions merely to shorten a document; resolve or track them.
- Accessibility, security, privacy, reliability and other non-functional constraints belong early when they alter product decisions, despite the instructor's preference for a lean initial spec.
- A simple login system may eliminate repeated email verification but introduces its own account-security and recovery requirements.
- Consider data-deletion obligations where relevant; 'not in V1' is not automatically legally acceptable.
- AI-generated UI fields should not be treated as approved data collection.
- Prefer human-approved decisions, repository guardrails, static analysis, tests and scoped tool permissions over unreviewed auto-accept.

## Repository integration brief for Codex

Target repository: `viniciuspizettadesouza/engineering-case-studies` (Engineering Practice Lab).
The existing README identifies canonical handbook Markdown under `apps/portfolio/src/content/handbook/`, plus a Study Mode under `apps/portfolio/src/study/` with active-recall cards and FSRS. Inspect actual repository files and conventions, not just the README, before selecting new filenames or making changes.

Instructions:
1. Inspect existing handbook topics, metadata, taxonomy, routing, knowledge-map links, review/flashcard generation or registration, and tests.
2. Integrate a concise, high-signal topic on specification-driven development using existing content conventions, without duplicating adjacent topics.
3. Add prompts and templates in appropriate existing structures if those structures exist. Keep `spec.md` and `features.md` as examples, NOT an instruction to create root-level product specs for the portfolio itself.
4. Add study/review prompts or recall cards only via established Study Mode mechanisms; avoid creating a parallel system.
5. Cross-link to related architecture, requirements, testing, AI-agent and engineering-effectiveness material when present.
6. Clearly distinguish course claims, illustrative decisions and critical commentary. Never claim all practices were experimentally proven.
7. Do not paste raw transcripts or proprietary Unlearn artifacts; use this synthesized knowledge.
8. Preserve project architecture and existing content, avoid unrelated edits, and do not auto-commit or push.
9. Run relevant existing validation (format, lint, typecheck, tests, build, as appropriate); report outcomes and any skipped checks.
