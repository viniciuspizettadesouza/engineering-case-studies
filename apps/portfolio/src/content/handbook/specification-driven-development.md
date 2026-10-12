# Specification-Driven Development

A specification gives people and AI assistants a shared account of what should be built, why it matters, and where the boundaries are. It is a living decision record, not a promise that planning will remove uncertainty or make implementation correct on the first attempt.

This chapter combines two related course workflows. **Course teaching** identifies ideas demonstrated or explicitly described in the lessons. **Reconstructed prompt/template** identifies original reusable material derived from those workflows rather than copied course assets. **Engineering recommendation** identifies safeguards or interpretations added for practical use.

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

## From approved change to reviewable feature design

**Course teaching:** A product or change specification can authorize a capability without giving an implementation agent enough detail to build it safely. Before coding, extract one bounded feature, trace it to the approved requirements or delta, and resolve the behavioral and consequential technical decisions that would otherwise be inferred during implementation.

Ask how the agent proposes to use existing framework capabilities, dependencies, routes, authentication and authorization boundaries, validation, data, and integrations. Classify every answer using the existing provenance model: mandated requirement, recommendation awaiting approval, or unresolved decision. The course used Laravel Fortify and disposable-email validation while designing authentication; these are contextual examples of reviewing framework reuse and dependency choices, not prescriptions for this React and TypeScript repository.

Non-goals deserve the same precision as intended behavior. Record unrequested flows, fields, routes, packages, background work, permissions, and refactors as excluded or explicitly deferred. A plausible agent suggestion is not an approved feature. If design work changes product behavior, reconcile the decision into the upstream product or change specification before treating the feature document as approved.

**Course teaching:** Reviewable steps represent independently understandable outcomes, not arbitrary file groups. In the authentication example, an initial four-step plan became three steps—setup, registration, and login/logout—when guest-route protection did not justify its own delivery stage. Each step should name its outcome, prerequisites, behavior and non-goals, likely change boundary, test plan, and approval checkpoint.

Plan Mode or an equivalent read-only preview lets reviewers inspect proposed files, commands, dependencies, and assumptions before edits begin. It is a review aid, not proof that the eventual implementation will follow the plan. Continue with the handbook's [AI-agent implementation controls](#/handbook/testing-delivery-and-devops#ai-agent-implementation-controls) when executing an approved step.

A **behavioral test plan** states what evidence the feature needs before framework-specific tests are written. It records the precondition, stimulus, observable outcome, failure or edge case, and required evidence level. The test implementation then encodes appropriate parts of that plan. Review generated assertions before trusting them: a passing test can preserve the wrong behavior, and unit tests alone do not prove the UI, persistence, authorization, or integration path works. See [Test strategy](#/handbook/testing-delivery-and-devops#test-strategy) for the controlled tests-first cycle.

### Reconstructed feature-design prompts

These are **reconstructed prompts**, not instructor wording or copied course assets.

> Based only on this approved feature specification, identify the technical decisions required before implementation. For each, cite the source requirement and label it mandated, recommended, or unresolved. Prefer existing framework capabilities where appropriate, name dependencies and trade-offs, and do not write code.

> Audit the feature and proposed design for inferred flows, fields, routes, packages, jobs, permissions, or refactors. Recommend retain, defer, or exclude for each item, but do not convert a suggestion into scope without approval.

> Decompose this feature into the fewest independently understandable and verifiable outcomes. For each step, state prerequisites, behavior, explicit non-goals, likely change boundary, evidence, and an approval checkpoint. Merge steps that do not produce a meaningful review boundary.

> Preview how you would implement step [N]. List the files and commands likely to be involved, existing code to reuse, assumptions, dependencies, risks, and validation. Stop before editing so the approach can be reviewed.

> Write a behavioral test plan for each approved step before generating test code. Include preconditions, stimulus, observable success, validation and failure cases, preserved behavior, authorization boundaries, and the required unit, integration, browser, persistence, or manual evidence. Flag any behavior the specification does not decide.

## Scaffold and verify within agreed boundaries

Once the specification, feature boundaries, and design references agree, plan the smallest useful application shell. Establish shared layout, navigation, routes, and placeholder content without prematurely implementing authentication or business rules.

Before accepting generated work:

- inspect the agent's plan, commands, code, and dependency changes;
- compare the result with the approved scope and design references;
- confirm that placeholders are not presented as working behavior;
- run static analysis, tests, accessibility checks, and a production build appropriate to the risk;
- review the diff before committing, and keep consequential commands behind explicit approval.

The course scaffold used Laravel, Inertia.js, Vue.js, MySQL, and Tailwind CSS. That stack was specific to its example and does not prescribe technology for another repository.

## From product specifications to change specifications

**Course teaching:** Product specification and change specification solve different problems. The product workflow above decides what product or feature should exist: its users, outcomes, scope, and major behavior. The OpenSpec workflow starts from one proposed change to a codebase and preserves the intent, behavioral difference, implementation plan, and history of that change.

They form a useful progression:

```text
Product intent → feature boundaries → focused change proposal
→ behavioral delta → implementation and evidence → living behavior
```

Do not treat the artifacts as interchangeable. A product specification may authorize a capability without deciding its implementation. A change proposal narrows one increment and connects it to the current system. An implementation plan names technical work, while behavioral requirements and scenarios state what users or other systems should observe.

OpenSpec is a tool-specific example of spec-driven development, not a requirement for applying the underlying practice. This repository teaches the workflow; it must not be initialized as an OpenSpec project merely because the workflow is documented here.

## OpenSpec lifecycle and change artifacts

**Course teaching:** The smallest demonstrated lifecycle is **Propose → Apply → Archive**. Explore is optional discovery before a proposal, review and refinement happen before implementation, and Verify is an optional alignment workflow. Testing and code review remain separate evidence.

```text
Explore uncertainty (optional)
→ Propose a focused change
→ Review and refine its artifacts
→ Apply the implementation tasks
→ Test, inspect, and manually validate where appropriate
→ Verify artifact-to-code alignment (optional)
→ Archive the change and deliberately sync eligible deltas
```

The course demonstrated these agent commands. Their names and behavior are version-dependent; inspect the installed tool's current help and official documentation before operational use.

| Command                       | Purpose                                                      | Boundary                                       |
| ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `/opsx:explore <question>`    | Investigate the codebase or clarify an uncertain feature     | Should not silently become implementation      |
| `/opsx:propose <change>`      | Generate a focused set of change artifacts                   | Requires human review before Apply             |
| `/opsx:apply <change-slug>`   | Implement or resume one named change                         | Checklist progress is not correctness evidence |
| `/opsx:verify <change-slug>`  | Compare implementation with accepted artifacts               | Does not replace tests or manual review        |
| `/opsx:archive <change-slug>` | Preserve completed change history and optionally sync deltas | Archive and sync have different effects        |

One demonstrated version used this representative structure:

```text
openspec/
├── config.yaml
├── changes/
│   ├── <active-change>/
│   │   ├── proposal.md
│   │   ├── design.md
│   │   ├── tasks.md
│   │   └── specs/<capability>/spec.md
│   └── archive/<completed-change>/
└── specs/<capability>/spec.md
```

The artifact responsibilities are more durable than the exact directory shape:

| Artifact    | Responsibility                                                         | Review focus                                                             |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Proposal    | Why the change exists, what changes, affected capabilities, and impact | Product value, scope, exclusions, and compatibility                      |
| Design      | Context, goals/non-goals, decisions, risks, and trade-offs             | Architecture fit, alternatives, migrations, rollback, and operations     |
| Tasks       | Dependency-ordered execution checklist                                 | Missing integration paths, tests, deployment work, and safe resumability |
| Delta spec  | Requirements and scenarios added, changed, or removed by this proposal | Observable behavior and preserved invariants                             |
| Living spec | Current intended behavior after accepted deltas are synchronized       | Accuracy after concurrent or superseding changes                         |
| Archive     | Historical proposal, reasoning, and change artifacts                   | Why behavior evolved, even when a stale delta must not be synced         |

**Course teaching:** Cross-referenced artifacts can be refined through ordinary conversation. In the example, the instructor replaced a generated accessor decision with a plain method and had the related design and tasks updated before Apply. Interrupted work retained task progress and could be resumed.

**Engineering recommendation:** Before resuming, inspect partial edits, migrations, jobs, and other side effects; a task checkbox does not prove an operation is idempotent. Stop immediately for destructive, security-sensitive, or irreversible mistakes. For a minor mismatch, reconcile the accepted artifacts rather than allowing an ad hoc code fix to make the specification stale.

## Delta specs and living behavior

**Course teaching:** A delta describes only the requirements changed by one proposal. The course compared a living spec to an account balance and deltas to the transactions that produced it.

| Delta section           | Meaning                                                      | Example                                                        |
| ----------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `ADDED Requirements`    | Introduces new observable behavior                           | Allow editing an account name                                  |
| `MODIFIED Requirements` | Changes an existing requirement while the capability remains | Allow addresses previously rejected by a disposable-email rule |
| `REMOVED Requirements`  | Retires an entire requirement                                | Stop feedback-comment email notifications                      |

Classify the requirement boundary, not the verb in the request. “Remove disposable-email blocking” modifies the broader email-acceptance behavior because email validation still exists. Removing comment notifications can remove a complete notification requirement.

A spec delta and a code diff answer different questions:

- the delta states which intended behavior should change;
- the proposal and design preserve why and with which trade-offs;
- the code diff shows how the implementation changed;
- tests and validation provide evidence about actual behavior.

**Engineering recommendation:** Scenarios should cover observable success, validation or failure, boundaries, backward compatibility, and important existing behavior that must remain unchanged. Precise requirements are useful; polished but untested artifacts are only spec theater.

## Collaboration, verification, and archive order

**Course teaching:** OpenSpec artifacts live beside application code so proposals can be reviewed through the same branches and pull requests before implementation. This preserves context for teammates and agents, supports onboarding, and makes partially completed work resumable.

Concurrent changes require behavioral ordering as well as clean Git merges. The course used two proposals affecting account names: editing the original name and later replacing it with first and last names. Archiving the newer change first made the older delta stale. The older change was preserved in the archive without syncing its outdated `users.name` requirement into the newer living specification.

Archive and sync are distinct:

- **Archive** preserves completed change history and reasoning.
- **Sync** incorporates eligible delta requirements into the current living spec.

A conflict-free merge does not prove compatible requirements. Compare affected capabilities, decide whether one change depends on or supersedes another, and agree on merge, verification, sync, and archive order.

**Course teaching:** Verify compares tasks, requirements, scenarios, design decisions, and implementation evidence. In the branding demonstration it reported complete task and scenario mappings with no issues, but the instructor still required review of the original specification.

**Engineering recommendation:** “Scenario satisfied” may be static agent judgment rather than an executed test. Keep evidence channels distinct:

| Evidence                        | Question                                                   | Limitation                                         |
| ------------------------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| Proposal/design review          | Are the intended change and approach appropriate?          | Reviewers can miss requirements                    |
| Automated tests                 | Did executable assertions pass?                            | Untested behavior remains unknown                  |
| Manual or end-to-end validation | Does the relevant workflow operate correctly?              | Coverage can be incomplete or environment-specific |
| OpenSpec Verify                 | Does the implementation appear aligned with the artifacts? | Agent analysis is fallible                         |
| Git review                      | Is the implementation scoped and maintainable?             | Code alone does not explain intended behavior      |
| Living-spec review              | Is current intended behavior accurately recorded?          | Depends on correct synchronization and ordering    |

## Proportional adoption and failure modes

**Course teaching:** Sustainable use rests on three habits: correct the plan when intended behavior is wrong, keep changes independently reviewable, and adopt incrementally instead of backfilling every historical feature. Existing systems can start with the next meaningful change.

Avoid full change-specification ceremony for trivial non-behavioral edits or disposable exploration. Prototype to learn when necessary, discard unsafe experimental code, and specify the chosen behavior before building the durable version. A change that looks cosmetic or routine may still need planning when accessibility, security, data, or compatibility risk is material.

The main failure modes are:

- **Over-proposing:** process cost exceeds the risk or behavioral value of the change.
- **Skipping review:** generated artifacts merely move unexamined assumptions earlier.
- **Stale specifications:** code or ad hoc prompts change behavior without reconciling the written contract.
- **Oversized proposals:** unrelated behaviors become difficult to review, apply, or abandon independently.
- **Solo adoption:** teammates bypass the practice and the shared record drifts.
- **False green:** checked tasks or a successful Verify report are mistaken for tested correctness.
- **Unsafe recovery:** partially executed migrations or jobs are repeated without inspecting side effects.

**Engineering recommendation:** Urgent production remediation should not wait for perfect documentation. Apply a safe hotfix when required, then reconcile the intended behavior promptly. Team adoption should define minimum artifact quality, ownership, and how drift is detected when work bypasses the workflow.

## Reusable prompt sequence

The nine product-specification prompts below are **reconstructed prompts** derived from the earlier course workflow, not verbatim course assets.

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

## Reconstructed OpenSpec prompts

These prompts are **reconstructed prompts**, not instructor files or verbatim course prompts. Adapt command syntax to the installed OpenSpec and agent versions.

### Explore and prioritize with evidence

> `/opsx:explore` Inspect this codebase for maintainability, reliability, and performance risks. For each material finding, provide its code location, observable evidence, impact, confidence, and a low-risk validation method. Recommend one priority with a concise comparison to the next-best option. Do not change code or combine unrelated fixes.

### Explore an uncertain design

> `/opsx:explore` We need [behavior]. Inspect the current implementation and ask the questions needed to clarify user behavior, failures, compatibility, security, constraints, and non-goals. Present two or three viable approaches and their trade-offs. Do not generate code before the decisions are approved.

### Generate a narrow proposal

> `/opsx:propose` Implement [specific observable change] because [reason]. In scope: [behaviors and integration paths]. Out of scope: [exclusions]. Preserve: [contracts and compatibility]. Include acceptance scenarios, failure behavior, trade-offs, and implementation and verification tasks.

### Audit artifact consistency

> Review `proposal.md`, `design.md`, `tasks.md`, and every change-specific delta spec. Identify contradictions, invented business assumptions, incorrect ADDED/MODIFIED/REMOVED classifications, missing edge cases, and dependencies. Rank findings by risk and cite the affected artifacts. Do not implement.

### Refine a decision across artifacts

> For task [ID], prefer [approach] over [generated choice] because [reason]. Update every affected change artifact while preserving the accepted functional requirement. Explain the changed trade-offs and do not modify implementation code yet.

### Examine migration safety

> Explain the migration and backfill for existing records, including data-shape edge cases, old-consumer compatibility, locking and transaction risks, rollback, idempotency, and verification evidence. Separate documented facts from unresolved decisions. Do not run the migration.

### Split and order changes

> Split this proposal into the smallest independently useful behavioral changes. Show affected capabilities, dependencies, review boundaries, and implementation, merge, sync, and archive order. Do not split solely by source file or implement anything.

### Review implementation against intent

> Compare the implementation with its proposal, design, delta specs, and tasks. Build a requirement-to-code-to-test evidence matrix. Report missing behavior, unintended behavior, incomplete tests, stale documentation, and uncertain evidence with file references and severity. Do not auto-fix.

### Detect stale living specifications

> Compare living specifications and archived reasoning with current code. Identify documented behavior that differs from implementation and meaningful implemented behavior absent from the specs. Propose reconciliation steps without silently rewriting living requirements.

### Assess overlapping changes

> Review active changes for overlapping requirements or capabilities. Recommend a dependency-aware merge, verification, sync, and archive sequence. Identify stale deltas that must not overwrite newer living behavior. Do not merge, sync, or archive without explicit approval.

### Run a pre-archive gate

> Before archiving [slug], review incomplete tasks, artifact-to-code alignment, actual automated test results, manual checks, merge dependencies, and stale-delta risks. Distinguish observed evidence from inferred coverage. Return READY or BLOCKED with reasons; do not archive automatically.

## Templates and review checklist

The templates in this section are **reconstructed templates** intended to be adapted to established team conventions.

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

A reviewable feature step and its behavioral evidence can be planned together:

```md
### Step <N>: <observable outcome>

- Requirement references:
- Prerequisites:
- In scope / explicit non-goals:
- Expected change boundary:
- Approval checkpoint:

| Scenario            | Preconditions | Stimulus  | Observable outcome                 | Evidence level                      |
| ------------------- | ------------- | --------- | ---------------------------------- | ----------------------------------- |
| Happy path          | `<state>`     | `<event>` | `<result>`                         | `<unit/integration/browser/manual>` |
| Failure or boundary | `<state>`     | `<event>` | `<result and preserved invariant>` | `<evidence>`                        |
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

For a change-level artifact review, confirm that:

- the business problem, desired outcome, and impacted user are clear;
- one coherent behavior is scoped and non-goals are explicit;
- affected capabilities and integration paths are identified;
- ADDED, MODIFIED, and REMOVED describe requirement semantics correctly;
- success, validation, failure, boundary, and regression scenarios are covered;
- existing contracts, data, and necessary backward compatibility are preserved;
- technical decisions include rationale, alternatives, and trade-offs;
- migration, deployment, rollback, security, and operational risks are considered;
- tasks cover implementation and evidence in dependency order;
- assumptions and contradictions across artifacts are resolved.

An acceptance-scenario pattern can start with:

```md
### Requirement: <observable behavior>

The system SHALL <specific action or invariant> when <condition>.

#### Scenario: <successful path>

- GIVEN <relevant initial state, when useful>
- WHEN <user or system event>
- THEN <observable result>

#### Scenario: <validation or failure>

- WHEN <invalid input or failure event>
- THEN <defined outcome and preserved invariant>

#### Scenario: <regression boundary>

- WHEN <an unaffected workflow is exercised>
- THEN <the existing behavior remains unchanged>
```

The course displayed WHEN/THEN-style scenario descriptions. Including GIVEN is an **engineering recommendation**, not a claim about a required OpenSpec parser grammar.

Keep verification evidence explicit:

| Requirement or scenario | Implementing code     | Executable test       | Manual validation | Result or gap                      |
| ----------------------- | --------------------- | --------------------- | ----------------- | ---------------------------------- |
| `<requirement>`         | `<path and location>` | `<test name or none>` | `<check or none>` | `<supported, partial, or unknown>` |

An agent statement that a scenario is satisfied belongs in analysis evidence; it must not be recorded as a passing executable test.

## OpenSpec course examples and trade-offs

The examples below are **course teaching** unless a qualification is explicitly marked as an engineering recommendation.

| Example                                       | Teaching point                                                                               | Important qualification                                                                 |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Add editable account name                     | Full proposal, Apply, browser validation, Archive, and Sync cycle                            | One small sentence can begin a proposal, but generated artifacts still need review      |
| Split `name` into first and last names        | Design choices, migration/backfill concerns, and wider integration impact                    | Data splitting is not automatically lossless; migration safety needs evidence           |
| Prefer a method over an accessor              | Revise a generated technical decision across related artifacts                               | The user-visible behavior matters more than the implementation mechanism                |
| Stop disposable-email blocking                | Removing one rule can modify a broader email requirement                                     | Classification follows the requirement boundary, not the word “remove”                  |
| Remove comment-email notifications            | A complete behavior can be a REMOVED requirement                                             | Check whether other notification behavior remains                                       |
| Paginate idea-board endpoints                 | Explore and prioritize one performance proposal                                              | **Engineering recommendation:** measure the bottleneck before accepting agent diagnosis |
| Move notification fan-out asynchronously      | Keep independent performance changes in separate proposals                                   | Queue semantics, retries, idempotency, and operations require separate review           |
| Explore passwordless authentication           | Clarify coexistence with passwords, exclude passkeys, and compare email OTP with magic links | Demo defaults were not a production-ready security design                               |
| Merge overlapping name proposals              | Capability overlap requires dependency-aware merge and archive order                         | A successful Git merge does not reconcile stale requirements                            |
| Replace hardcoded branding with configuration | Verify can map requirements and scenarios to implementation evidence                         | A green Verify report does not prove tests ran or behavior is correct                   |

## Evidence, examples, and limits

The product-level sections synthesize the ten-lesson Unlearn course _Spec a Product Before AI Builds It_. The change-level sections synthesize the nine-lesson course _Spec-Driven Development with OpenSpec_. The feature-design section synthesizes the seven-lesson course _Design a Feature AI Can Execute Without Guessing_. These are based on learner-provided transcripts, notes, and lesson-level reconstruction; the feature-design handoff has high-confidence topic coverage but was not re-audited line by line against every transcript. This chapter does not reproduce transcripts or proprietary templates. Prompts, templates, matrices, and combined playbooks labeled reconstructed are original study aids derived from the workflows.

The product course compared a vaguely prompted to-do application with a preplanned demonstration, but that comparison was not a controlled benchmark. Treat its speed and polish as illustrative, not proof of a universal productivity effect.

Other example decisions were contextual too. Combining overlapping administrator roles reduced one example's complexity; excluding duplicate merging or attachments kept its V1 narrow; choosing pagination, rate limits, password recovery, and disposable-email blocking addressed its particular gaps. Real products require their own evidence, threat model, legal review, and accessibility work. Non-functional constraints belong early whenever they change the product decision, even if the first draft is intentionally lean.

The OpenSpec course demonstrated one 2026 tool environment. It does not establish a permanent command set or universal file schema, that unqualified Apply safely handles every active proposal, that Verify executes scenarios as tests, that checked tasks prove correctness, or that Archive equals deployment. Existing systems need not backfill every historical feature, and trivial non-behavioral changes or throwaway prototypes do not automatically require the full workflow.
