# Spec-Driven Development with OpenSpec — Complete Knowledge Handoff

> **Source:** Unlearn, Product Engineer path, _Spec-Driven Development with OpenSpec_, nine lessons (transcripts supplied by the learner, October 2026).  
> **Purpose:** Self-contained knowledge transfer for an existing engineering handbook, learning roadmap, and future Study Mode.  
> **Target repository:** https://github.com/viniciuspizettadesouza/engineering-case-studies  
> **Status:** Knowledge source, **not** an instruction to install OpenSpec in this repository or to implement a sample feature.  
> **Coverage:** All nine lessons. This is an original synthesis, not verbatim course transcripts.

## Reader and integration contract

This document captures **what the course taught**, then offers separate **engineering extensions** and **reconstructed practical assets**. Codex should integrate the concepts into the repository's **existing** handbook architecture and learning roadmap rather than copying this file into a parallel documentation system by default.

**Non-negotiable repository constraints provided by the learner:**

1. Inspect the existing handbook architecture, organization, schemas, navigation, tests, and content conventions first.
2. Reuse existing relevant knowledge; consolidate rather than duplicate topics or build a separate learning system.
3. Add the subject to the existing **five-stage learning roadmap**, in the appropriate stage according to the actual repository implementation; do not invent stage labels.
4. Preserve proposed active-recall questions and answers for a future Study Mode integration.
5. **Study Mode stability gate is on Hold. Do not add, register, seed, activate, or expose new recall cards until the gate is explicitly approved.** The Q&A appendix in this handoff is reference material only.
6. Keep edits tightly scoped. Do not install OpenSpec, initialize it in the repo, generate proposals, change application behavior, or alter the Study Mode gate unless independently instructed.
7. Confirm compatibility with existing validations, tests, and conventions. Present an implementation plan before editing when running in Codex Plan Mode.

### Source labeling convention

- **[COURSE]** Directly supported concepts, descriptions, examples, or actions from the supplied lesson transcripts. Paraphrased unless otherwise stated.
- **[RECONSTRUCTED]** Example text, Markdown snippets, commands combined into a suggested sequence, templates, and prompts created for study or reuse. These are **not** files copied from the instructor's machine.
- **[ENGINEERING EXTENSION]** Additional recommendation, risk control, or interpretation beyond what the instructor explicitly demonstrated.
- **[REPO CONSTRAINT]** Learner's integration instructions, not an OpenSpec course teaching.

OpenSpec syntax and availability can change. Commands in this handoff reflect the demonstrated 2026 course environment; verify against installed tool help and official documentation before using operationally.

---

## 1. Executive mental model

**[COURSE; L1, L3, L5, L8–L9]** Unstructured AI-assisted development commonly follows `prompt → agent writes code → inspect diff → ship`. A vague prompt leaves behavior, edge cases, failure handling, and technical choices to the model. The developer may learn those decisions only at code-review time or after release.

Spec-driven development (SDD) instead asks the team to **agree on intended behavior before code is generated**. The spec acts as a reviewable contract for the agent. Revising a text plan is cheaper than undoing a large implementation. OpenSpec makes this repeatable through proposals, designs, behavioral specifications, task checklists, and archival into living specifications.

The complete conceptual lifecycle:

```text
[Explore uncertainty] (optional)
          ↓
Propose a focused change
          ↓
Review and refine proposal + design + delta specs + tasks
          ↓
Apply implementation using the reviewed artifacts
          ↓
Run tests + inspect code + manually validate when relevant
          ↓
Verify spec-to-implementation alignment (optional workflow, strongly useful)
          ↓
Archive the change; sync eligible deltas into living specifications
          ↓
Living specs + archived intent inform subsequent work
```

**[COURSE]** The minimal loop is **propose → apply → archive**; `explore` is a pre-proposal conversation, and `verify` is an optional additional workflow enabled in Lesson 8. Review and testing are essential checkpoints, even though the demonstration sometimes skipped them for speed.

**[ENGINEERING EXTENSION]** An approved spec is a _statement of intent_, not formal proof. Neither an AI-generated checklist nor an AI verification report guarantees correctness, security, complete test coverage, or delivery readiness.

### Core distinctions

| Concept     | Role                                                     | Important nuance                                                    | Lessons        |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------- | -------------- |
| Explore     | Investigate code and clarify product/technical decisions | No need to commit to a proposal immediately                         | L2, L6         |
| Proposal    | Business-readable reason and summary for one change      | Can be reviewed by nontechnical stakeholders                        | L3–L4          |
| Design      | Context, scope, decisions, risks, trade-offs             | Makes technical assumptions explicit                                | L3–L4          |
| Tasks       | Ordered implementation checklist                         | Tasks are planning/progress evidence, not proof of correct behavior | L3–L4, L8      |
| Delta Spec  | Behavioral requirements changed by a proposal            | Not a copy of the whole current spec                                | L5             |
| Living Spec | Current intended application behavior                    | Updated through synchronization when changes are archived           | L1, L3, L5, L7 |
| Archive     | Historical record of a completed change                  | Sync and archive can be separated when older deltas are stale       | L3, L7         |
| Verify      | Compare implementation against change artifacts          | Supplemental agent assessment; not equivalent to automated testing  | L8             |

---

## 2. Installation, integration, and repository structure

**[COURSE; L2]** OpenSpec is a framework integrated with existing AI coding agents, rather than a replacement IDE or separate coding agent. The instructor used Claude Code, and the setup flow allowed selecting more than one supported agent. The course used an existing Laravel-oriented application called **FeedbackPit**.

Demonstrated installation and initialization:

```bash
npm install -g @fission-ai/openspec
cd path/to/existing-app
openspec init
```

The instructor specifically recommends checking current documentation because installation steps can change. `openspec init` presents an interactive agent-selection flow.

**[COURSE]** A representative directory shape:

```text
project/
└── openspec/
    ├── config.yaml                # Tech-stack/domain/project context
    ├── changes/
    │   ├── <active-change>/
    │   │   ├── proposal.md
    │   │   ├── design.md
    │   │   ├── tasks.md
    │   │   └── specs/
    │   │       └── <capability>/
    │   │           └── spec.md    # Proposed delta for this capability
    │   └── archive/
    │       └── <archived-change>/ # Preserved reasoning and artifacts
    └── specs/
        └── <capability>/
            └── spec.md            # Living behavior specification
```

**[RECONSTRUCTED]** File layout is illustrative; actual generated directories, names, and config contents can depend on OpenSpec version and change shape.

**[COURSE; L2, L9]** Existing applications do **not** need a retrospective specification for every previous feature before starting. New proposed changes create the history incrementally. Greenfield work can start using specs from the first feature. `config.yaml` can carry technology/domain context, but the course does not fully detail configuration schema.

**[REPO CONSTRAINT]** The target `engineering-case-studies` repository is itself a learning/handbook repository. **Do not infer that documenting OpenSpec calls for running `openspec init` inside that repository.** The course teaches how to apply OpenSpec in a software project; here the task is to _teach_ that practice using existing handbook structures.

---

## 3. Commands and day-to-day lifecycle

**[COURSE; L2–L4, L6–L8]** The course illustrates commands made available inside the configured agent:

| Command                                    | Purpose                                                  | Typical use                                                                        |
| ------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/opsx:explore <question or idea>`         | Investigate, reason, ask questions before proposal       | Codebase performance investigation; passwordless authentication design             |
| `/opsx:propose <request or specification>` | Generate change artifacts                                | Add account name editing; convert a longer existing feature spec                   |
| `/opsx:apply [change-slug]`                | Carry out a change's tasks                               | Implement the approved plan or resume interrupted work                             |
| `/opsx:archive [change-slug]`              | Archive a completed proposal, optionally sync its deltas | Update living specifications while retaining history                               |
| `/opsx:verify [change-slug]`               | Check code and artifacts for alignment                   | Find implementation/spec drift before archive; must be enabled in the course setup |

**[COURSE; L3]** A proposal may start from a single sentence or a fully elaborated external feature specification. The instructor's first request was effectively:

```text
/opsx:propose Add name to account settings so we can update it alongside our email address.
```

OpenSpec/agent generated a named change, proposals and task list. When `/opsx:apply` ran, the example reported **0/13 tasks** initially; it then updated checkboxes as tasks were completed. Browser testing confirmed the account-name change before archive. During archive the instructor selected **Sync now**, and the account-settings capability was added to the living specs.

**[COURSE; L4]** Work is resumable: exiting mid-apply leaves a partially completed `tasks.md`; running `/opsx:apply` again allowed the agent to resume near task 3.1 in the demonstration. A task could have been started without its checkbox being marked.

**[ENGINEERING EXTENSION]** Before resuming, inspect partial edits, migrations, and side effects; a checklist position does not prove an operation is safe to repeat or idempotent.

**[COURSE; L6]** With multiple active changes, `/opsx:apply <change-slug>` targets one proposal. The instructor also describes applying without specifying a slug; **do not assume** an unqualified command will safely apply all proposals automatically. Prefer explicit targeting and inspect current prompts/tool semantics.

### How to change the plan

**[COURSE; L4]** The agent can update cross-referenced artifacts in response to ordinary conversation; no special command is required. Example: the generated task called for an accessor returning full name; the instructor preferred a plain method. He asked, approximately, _“For 2.2, can we use a method and not an accessor?”_ The agent requested clarification and then updated design and tasks to specify a full-name method.

**[COURSE]** Avoid manually changing only one file when other artifacts refer to the same decision. Ask the agent to coordinate revisions and **review the updated artifacts**.

**[ENGINEERING EXTENSION]** Direct edits are not inherently forbidden; consistency is the real concern. For critical changes, ask the agent for a cross-artifact consistency audit regardless of how edits were made.

### When apply goes wrong

**[COURSE; L4]** The instructor distinguishes (a) temporarily interrupting work, which can be resumed, from (b) discovering that the spec or build is wrong. His suggested options for a minor error included fixing it directly or issuing a follow-up proposal after completion; for a fundamental error he recommended interrupting, stashing work as appropriate, repairing the proposal, and restarting. He generally preferred letting a nearly finished build complete before making minor fixes.

**[ENGINEERING EXTENSION]** Stop immediately when an agent is making destructive, security-sensitive, or irreversible mistakes. Do not interpret the demo's “let it finish” practice as a safety rule.

---

## 4. The four change artifacts: responsibilities and review criteria

**[COURSE; L3–L4]** OpenSpec generates human- and agent-facing artifacts. They should be reviewed _before_ implementation.

### `proposal.md`: Why and what

The instructor shows a proposal with a **Why**, **What Changes**, affected/new/modified **Capabilities**, and **Impact**. It should be clear enough for a nontechnical reader to understand.

**[RECONSTRUCTED] Review questions:** Is the problem real? Is the desired outcome clear? What is included/excluded? What capabilities are affected? Are there breaking changes or product dependencies?

### `design.md`: How, constraints, and technical trade-offs

The instructor shows **Context**, **Goals and Non-Goals**, **Decisions**, and **Risks/Trade-offs**. These make the architectural direction explicit. The `name` to `first_name`/`last_name` change involved schema design, registration changes, and data migration considerations.

**[RECONSTRUCTED] Review questions:** Is the proposed approach compatible with the existing architecture? Are interfaces, migrations, rollbacks, and operational impacts understood? Are alternatives and rejected paths documented?

### `tasks.md`: Plan of execution

A Markdown checklist of implementation steps. The instructor calls this the closest thing to a **dry run** of what the agent will actually do and emphasizes spending meaningful review time here.

**[RECONSTRUCTED] Review questions:** Are steps ordered by dependencies? Are important integration paths included? Are data backfills and verification tasks explicit? Can work resume safely? Is the change scoped and independently testable?

### `changes/<slug>/specs/<capability>/spec.md`: The delta

Behavioral requirements and scenarios affected by this change. Detailed in §5 below. A single proposal may affect several capabilities and therefore carry multiple delta files.

**[RECONSTRUCTED] Review questions:** What **new behavior** is required? What old behavior changes or disappears? Do scenarios cover success, failure, boundary conditions, backward compatibility, and behavior that must remain unchanged?

### Example artifact skeletons — reconstructed, not exported from OpenSpec

```markdown
# proposal.md

## Why

<Problem, motivation, stakeholder impact>

## What Changes

<Behavior added/modified/removed; boundaries>

## Capabilities

<New and modified capabilities>
## Impact
<APIs, data, UI, operations, compatibility>
```

```markdown
# design.md

## Context

<Existing system and constraints>
## Goals / Non-Goals
<What success includes; what is intentionally excluded>
## Decisions
<Approach and rationale; alternatives rejected>
## Risks / Trade-offs
<Data migration, compatibility, deployment, testing, rollback>
```

```markdown
# tasks.md

- [ ] Inspect relevant existing behavior
- [ ] Implement persistence/schema/API changes (if needed)
- [ ] Implement application/UI changes
- [ ] Add behavioral and regression tests
- [ ] Validate failure paths and compatibility
- [ ] Perform necessary manual review and verification
```

**[ENGINEERING EXTENSION]** For each task or scenario, prefer evidence tied to observable outcomes rather than a statement that a function was called. Consider API paths, jobs, bulk operations, imports, and migration effects when applicable.

---

## 5. Delta Specs and living specifications

**[COURSE; L5]** This is OpenSpec's defining abstraction. **A delta describes only what changes; it does not restate the whole specification.** The instructor uses a bank-account analogy: the **balance** is the living specification, while **transactions** are deltas.

| Delta section              | Meaning                         | Demonstrated example                              |
| -------------------------- | ------------------------------- | ------------------------------------------------- |
| `## ADDED Requirements`    | Introduce a new requirement     | Account name can be edited in settings            |
| `## MODIFIED Requirements` | Change an existing requirement  | Single name becomes separate first and last names |
| `## REMOVED Requirements`  | Delete a requirement/capability | Remove feedback-comment email notifications       |

**[COURSE; L5]** A request to **remove** a piece of functionality may still produce a **MODIFIED** requirement. When the instructor proposed stopping disposable-email blocking, OpenSpec modified the broader email-handling requirement to describe newly allowed addresses rather than removing email handling altogether. The correct classification is based on the requirement boundary, _not_ the verb in the prompt.

### Illustrative delta structure

**[RECONSTRUCTED]** These samples show the instructional pattern, not exact course-generated text or a guaranteed parser schema:

```markdown
## ADDED Requirements

### Requirement: Edit account name

The system SHALL allow a user to update the name in account settings.

#### Scenario: Successful name update

- WHEN an authenticated user submits a valid name
- THEN the updated name is persisted and subsequently displayed
```

```markdown
## MODIFIED Requirements

### Requirement: Account identity fields

The system SHALL store and edit first and last names separately.

#### Scenario: Update personal details

- WHEN a user submits valid first and last names
- THEN both fields are saved without losing unrelated account data
```

```markdown
## REMOVED Requirements

### Requirement: Feedback comment email notifications

# Remove the requirement to notify by email when someone comments on feedback.
```

### Why deltas matter

**[COURSE; L5, L7]** They (1) show reviewers exactly which expected behaviors change, (2) preserve historical reasoning through archive artifacts, and (3) give coding agents a precise target. The instructor likens history to **`git blame` for why, not only what**. They also make concurrent team changes possible, though merges and sync order still require care.

**[ENGINEERING EXTENSION]** A delta and a Git diff answer different questions:

- **Spec delta:** What observable behavior should change?
- **Git/code diff:** What implementation was altered?
- **Design and proposal:** Why this solution, with which trade-offs?
- **Tests and verification:** What evidence supports correct behavior?

Specification deltas are especially useful in rule-heavy systems, but only when their requirements and scenarios are precise and kept current.

---

## 6. Explore before committing to a proposal

**[COURSE; L6]** `/opsx:explore` offers two distinct workflows.

### 6.1 Discover opportunities within a codebase

The instructor used:

```text
/opsx:explore Identify any performance issues in the codebase.
List the top issue you'd recommend fixing, in one short sentence.
```

The agent found several potential improvements. The instructor focused on **pagination of idea-board endpoints**, created a proposal, then asked for the **next** issue and created a separate proposal for **asynchronous notification fan-out**.

**[COURSE]** Keep independent improvements as separate, manageable proposals. Name and target them explicitly; choose implementation order rather than allowing a broad prompt to generate an unreviewable patch.

**[ENGINEERING EXTENSION]** Code-reading agents can hypothesize performance defects but do not establish a measured bottleneck. Request evidence such as query plans, timing, profiling, traffic characteristics, reproduction, and impact before accepting a recommendation.

### 6.2 Clarify an uncertain feature

The instructor explored passwordless authentication:

```text
/opsx:explore I want to implement passwordless auth. Let's explore.
```

The agent surveyed the current auth surface and asked questions. The instructor said user complaints motivated the change; the new flow should **coexist** with passwords; **passkeys** were excluded for a separate feature; and the discussion included **magic links vs. email OTP**, with OTP considered because cross-device magic-link use can add friction. He used agent-suggested defaults in the demo, while explicitly saying he would deliberate more for real security-critical work.

**[COURSE]** The result is a conversation that shapes requirements and a proposed design; the agent can draft a proposal afterward. Initial answers may be revised before or after proposal generation.

**[ENGINEERING EXTENSION]** For real authentication work, do not accept model defaults without evaluating threat modeling, token lifetime, replay prevention, rate limits, user enumeration, delivery failure, session handling, recovery, and auditability. The transcript does **not** provide a complete secure passwordless architecture.

### Explore vs Propose

| Situation                                 | Start with                       | Why                                            |
| ----------------------------------------- | -------------------------------- | ---------------------------------------------- |
| Well-defined small behavioral enhancement | `propose`                        | Scope already clear                            |
| Uncertain architecture or user behavior   | `explore`                        | Resolve assumptions and alternatives           |
| Find technical debt / performance work    | `explore`                        | Investigate and prioritize                     |
| Existing detailed feature specification   | `propose`                        | Reuse explicit requirements                    |
| Quick disposable experiment               | Prototype, then potentially spec | Learn before committing to a production design |

---

## 7. Team collaboration: Git, PRs, and overlapping deltas

**[COURSE; L7]** Commit OpenSpec files to the **same source-control repository as their application**. Ensure they are not unintentionally excluded by `.gitignore`. The instructor demonstrated `git status`, adding, committing, and pushing the OpenSpec structure, then using a feature branch and PR for a proposed name-editing change.

```bash
# [RECONSTRUCTED] Representative sequence, not a strict required Git policy
 git switch -c feature/edit-account-name
 # In the configured agent: /opsx:propose Add name editing to account settings
 git add openspec/
 git commit -m "Propose account name editing"
 git push -u origin feature/edit-account-name
 # Open a PR for proposed behavior/design review.
 # Once approved, /opsx:apply, test and commit implementation.
```

Benefits explicitly highlighted: **human and automated review before code exists; historical context for developers and agents; onboarding; resumability via committed partial tasks; spec-aware code review.** The instructor briefly pushed initial setup to `main` for convenience, while acknowledging normal branch-based team workflows.

### Overlap example and ordering

**[COURSE; L7]** Two independently developed PRs affected the same domain:

1. **Edit account name**: add a way to change the current single name field.
2. **Split name**: replace that field with `first_name` and `last_name`.

The rational **merge and archive order** was (1) then (2), because the second relies on or supersedes behavior from the first. The instructor intentionally archived (2) first to illustrate problems. Archiving (1) afterward revealed a **stale delta referencing `users.name`**, while the living spec already described first and last name columns. He archived the stale older change **without syncing** it, avoiding overwrite of the newer specification. He explicitly emphasized that this was a demonstration of a problematic order, not the ideal workflow.

### Archive vs sync

**[COURSE]** Archiving preserves history; syncing incorporates a change's delta into the living spec. These are distinct effects. With overlapping changes, syncing outdated requirements can regress the description of intended behavior.

**[ENGINEERING EXTENSION]** Git merges resolving successfully does **not** imply behavioral compatibility or correct spec reconciliation. Review active changes for overlapping capabilities and sequencing dependencies. For teams, align proposal review, branch integration, verification, and archive ownership. Do not treat a failed or skipped sync as a trivial administrative step.

---

## 8. Verify implementation drift before archive

**[COURSE; L8]** The instructor enabled an optional **Verify Change** workflow through:

```bash
openspec config profile
```

Then, from the interactive **Workflows** options, he enabled **Verify Change**, confirmed the current project, restarted his Claude agent, and used:

```text
/opsx:verify
```

**[COURSE]** The example proposed replacing every hardcoded occurrence of **FeedbackPit** branding with the application name from configuration. One part already used config, but other text occurrences did not. The instructor applied the proposal and ran Verify.

The demonstration report stated:

- **6/6** tasks completed.
- **1/1** requirements covered.
- **4/4** scenarios satisfied.
- Design followed; spec-to-implementation mapping showed implementation evidence.
- No critical issues, warnings, or suggestions; coherence checks and final assessment reported ready for archive.

**[COURSE]** Verify compares implementation to proposal artifacts, including tasks, requirements, scenarios, design decisions, and mappings to code. It can be invoked before archive, and the instructor repeatedly says it **does not replace manually reviewing the original spec**.

**[ENGINEERING EXTENSION]** Also distinguish AI assessment from executable evidence. A report saying “four scenarios satisfied” may reflect static agent inspection rather than four automated tests. Run relevant test suites, inspect diffs, manually test appropriate paths, and check security, migrations, and backwards compatibility separately. Do not archive solely because Verify prints green results.

### Verification matrix

| Evidence channel        | Core question                                           | Limitations                                |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------ |
| Proposal/design review  | Did we specify the right change and approach?           | Humans/agents can miss requirements        |
| Automated tests         | Does behavior pass actual assertions?                   | Only covers cases tested                   |
| Manual/end-to-end check | Does the user workflow work?                            | May be incomplete or environment-specific  |
| OpenSpec Verify         | Does code appear to match change artifacts?             | Agent-based analysis is fallible           |
| Git review              | Is implementation maintainable and scoped?              | Code diff alone may miss intended behavior |
| Living-spec check       | Is the current intended behavior documented accurately? | Requires correct sync/order                |

---

## 9. Sustainable habits, traps, and when NOT to spec

**[COURSE; L9] Three sustainable habits:**

1. **Fix the plan, not the code** when behavior is wrong: refine the specification and rerun or create a follow-up spec so the behavior's source of truth remains accurate. The instructor cautions that ad-hoc reprompting or manual behavioral patches can take the team back to vibe coding.
2. **Keep changes small:** independently reviewable, easier to archive, easier to abandon when requirements change. Several unrelated behaviors often belong in separate proposals.
3. **Do not backfill everything:** in a new application start with the first feature; in an old one begin with the next meaningful change and let the knowledge grow.

**[COURSE; L9] Three traps:**

- **Over-proposing:** writing specs for button-color tweaks, typos, simple dependency bumps, or isolated one-line maintenance makes the practice heavy.
- **Skipping review:** generating specs without inspecting and correcting them forfeits the main value of SDD.
- **Stale specs:** behavior changed via code or ad-hoc prompts without updating the written contract makes archived/current specifications untrustworthy.

**[COURSE; L9] Three situations where full SDD may be inappropriate:**

- **Throwaway prototyping** to understand product needs. Experiment, learn, potentially discard the code, then capture the stable decisions as a spec.
- **Team not aligned:** if only one developer maintains specs, others' behavioral changes will quickly make the shared record inaccurate.
- **Trivial non-behavioral changes:** changing a button's color generally does not require a spec; changing what a click does does.

**[COURSE]** Benefits recap: AI agents stay scoped; mistakes are discovered while cheap; teams can review intent before code; and archived deltas/design preserve _why_ the system is built as it is.

**[ENGINEERING EXTENSION] Important qualifications:**

- Fixing the plan should not prohibit urgent production remediation. If a hotfix is needed, implement it safely and reconcile the intended behavior in the spec promptly.
- The best unit of a proposal is a **coherent behavioral change**, not one source file or one UI screen. One feature may legitimately touch UI, API, database, and tests.
- Even an apparently cosmetic or dependency-only change may warrant a plan when accessibility, security, or compatibility risk is substantial.
- The team's adoption agreement should define minimum artifact quality and a mechanism for noticing drift when changes bypass OpenSpec.

---

## 10. Consolidated implementation playbooks

These are **[RECONSTRUCTED]** practical playbooks derived from multiple lessons, not verbatim instructor procedures.

### Playbook A: Small, defined behavioral change

1. Identify one user-observable behavior and reason for changing it.
2. `/opsx:propose <focused request>`.
3. Review `proposal.md`, `design.md`, affected delta specs, then `tasks.md`.
4. Challenge incorrect decisions conversationally and confirm cross-file consistency.
5. `/opsx:apply <slug>`.
6. Review diff, run test suite, manually verify relevant behavior and edge cases.
7. `/opsx:verify <slug>` where configured; investigate gaps and cite concrete evidence.
8. `/opsx:archive <slug>` with deliberate sync semantics and dependency-aware ordering.
9. Confirm the living spec reflects the final accepted system behavior.

### Playbook B: Underspecified/complex new feature

1. `/opsx:explore <business problem>`.
2. Inspect current capabilities, user needs, risks, approaches, non-goals, and open decisions.
3. Resolve ambiguous decisions; defer unrelated features into separate proposals.
4. Turn the agreed concept into `propose` and proceed through Playbook A.
5. For high-risk choices, get human/stakeholder agreement before apply.

### Playbook C: Codebase discovery and prioritization

1. `/opsx:explore <codebase question>`.
2. Ask for findings ranked by impact, risk, and concrete supporting evidence.
3. Validate whether the issues are real (especially performance claims).
4. Choose one high-value improvement, create a named proposal, and repeat for other independent improvements.
5. Apply individual slugs in an intentional order.

### Playbook D: Parallel work on overlapping capabilities

1. Compare active proposals and affected capabilities before merge.
2. Determine whether changes conflict or whether one supersedes another.
3. Agree on dependency ordering; rebase/resolve code and artifact conflicts.
4. Verify each implementation against its accepted spec.
5. Merge and sync/ archive in a consistent sequence, with stale-delta review.
6. Preserve superseded history without overwriting the final living spec.

### Playbook E: Interrupted or incorrect implementation

1. For a normal interruption: save code + `tasks.md` state; run `apply` again later with the explicit slug.
2. Before resuming: inspect partial operations and side effects.
3. For minor behavioral deviations: repair/review the spec or create a follow-up spec; keep documentation aligned.
4. For fundamental mismatch: stop, protect/stash partial changes, revise artifacts and reconsider a fresh implementation.
5. For dangerous/destructive output: stop immediately and assess recovery.

---

## 11. Reusable prompt library

All prompts below are **[RECONSTRUCTED]**, inspired by course workflows. They are not verbatim copyrighted course prompts. Adapt agent command syntax to the installed version.

### Discover and prioritize

```text
/opsx:explore Analyze this codebase for maintainability, reliability, and performance risks.
For each significant finding provide the code location, observable evidence,
expected impact, confidence level, and a low-risk validation method.
Do not change code and do not propose multiple unrelated fixes as one change.
```

```text
From the findings, recommend one improvement to prioritize.
Explain user/operational impact, supporting evidence, scope, dependencies,
and why it is preferable to the next-best option in five concise sentences.
```

### Explore design, without implementing

```text
/opsx:explore We need [feature / behavior]. Inspect the current implementation.
Ask the questions needed to clarify behavior, failure handling, constraints,
compatibility, security, and non-goals. Present 2–3 viable approaches and
trade-offs. Do not generate code until the plan is approved.
```

### Generate a narrow proposal

```text
/opsx:propose Implement [specific user-observable change] because [reason].
In scope: [behaviors and integration paths].
Out of scope: [explicit exclusions].
Preserve: [existing contracts or compatibility constraints].
Include acceptance scenarios, failure behavior, design trade-offs, and
implementation/verification tasks.
```

### Review artifacts for coherence

```text
Review proposal.md, design.md, tasks.md and all change-specific delta specs.
Identify contradictions, invented business assumptions, incorrect ADDED /
MODIFIED / REMOVED classifications, missing edge cases and dependencies.
List findings in risk order; reference exact artifacts. Do not implement yet.
```

### Refine technical decisions

```text
For task [ID], I prefer [approach] instead of [generated choice] because [reason].
Update all affected OpenSpec artifacts, preserve the functional requirements,
and explain the changed trade-offs. Do not modify implementation code yet.
```

### Examine data migrations

```text
Explain the proposed migration and backfill for existing production records.
Include data-shape edge cases, compatibility with old API consumers,
transaction/locking risks, rollback, idempotency and verification evidence.
State which items are already documented and which require decisions.
Do not run migrations.
```

### Break up a large change

```text
Split this proposal into the smallest independently useful behavioral changes.
Show dependencies, affected capabilities, review boundaries, and suggested
implementation/archive order. Avoid splitting solely by source file.
Do not implement.
```

### Spec-aware code review

```text
Review the implementation against its OpenSpec proposal, design, delta specs,
and tasks. Create a requirement-to-code-to-test evidence matrix.
Report missing behavior, additional unintended behavior, incomplete tests,
and outdated docs with file references and severity. Do not auto-fix.
```

### Detect stale specifications

```text
Compare living OpenSpec specs and archived change reasoning with current code.
Identify documented behavior that differs from actual code and meaningful
implemented behavior absent from the specs. Propose reconciliation steps;
do not silently rewrite the living specs.
```

### Assess parallel-change safety

```text
Review active OpenSpec changes for overlapping requirements and capabilities.
Recommend a dependency-aware merge, sync, and archive sequence.
Identify stale deltas that must not overwrite newer living requirements.
Do not merge or archive without explicit approval.
```

### Pre-archive gate

```text
Before archiving [slug], review incomplete tasks, spec-to-implementation
alignment, real automated test results, manual checks, merge dependencies,
and stale delta risks. Distinguish observed evidence from inferred coverage.
Say READY or BLOCKED with reasons. Do not archive automatically.
```

---

## 12. Reusable engineering templates

All content in this section is **[RECONSTRUCTED]** and adaptable to established team conventions.

### 12.1 Spec review checklist

```markdown
- [ ] Business problem, desired outcome, and impacted user are clear
- [ ] Change is scoped to one coherent behavior; non-goals are explicit
- [ ] Impacted capabilities and integration paths are enumerated
- [ ] ADDED / MODIFIED / REMOVED accurately reflect requirement semantics
- [ ] Success, validation, failure, and boundary scenarios are covered
- [ ] Existing contracts, data, and relevant backwards compatibility are preserved
- [ ] Technical decisions have rationale and alternatives/trade-offs
- [ ] Migration, deployment, rollback, security, and operational risks are considered
- [ ] tasks.md covers implementation and verification work in a sensible order
- [ ] Cross-artifact contradictions and assumptions have been resolved
```

### 12.2 Acceptance-scenario template

```markdown
### Requirement: <observable behavior>

The system SHALL <specific action or invariant> when <condition>.

#### Scenario: <happy path>

- GIVEN <relevant initial state> # Optional descriptive context
- WHEN <user/system event>
- THEN <observable result>

#### Scenario: <validation/failure>

- WHEN <invalid input or failure event>
- THEN <defined outcome and invariant>

#### Scenario: <regression>

- WHEN <existing unaffected workflow is exercised>
- THEN <existing behavior remains unchanged>
```

The `GIVEN` example is a general scenario-writing extension; the transcript explicitly displayed WHEN/THEN-style scenario descriptions, but did not establish a formal GIVEN parser requirement.

### 12.3 Spec-to-implementation evidence matrix

| Requirement / scenario | Implementing code   | Executable test | Manual validation | Result / remaining gap            |
| ---------------------- | ------------------- | --------------- | ----------------- | --------------------------------- |
| R1: `<name>`           | `<path + location>` | `<test name>`   | `<check if any>`  | `<supported / partial / unknown>` |
| R2: `<name>`           | `<path + location>` | `<test name>`   | `<check if any>`  | `<supported / partial / unknown>` |

Do not translate “agent says satisfied” into “test passed.” Record the kind of evidence.

### 12.4 Proposed change metadata for PRs

```markdown
## Intent

<Problem and change outcome>

## OpenSpec artifacts

- Proposal: <repo relative path>
- Design: <repo relative path>
- Delta specs: <repo relative path(s)>
- Tasks: <repo relative path>

## Review focus

<Requirements, compatibility, key trade-offs>

## Verification

<Automated results, manual evidence, OpenSpec Verify output if enabled>

## Dependencies / archive order

<Other proposals, sync requirements, stale-delta hazards>
```

### 12.5 Decision record for high-impact changes

```markdown
Decision: <choice>
Context: <constraints and observed evidence>
Alternatives: <considered options>
Reasoning: <trade-offs and non-goals>
Impact: <affected capabilities, APIs, data, or operations>
Confidence / open questions: <unknowns>
Verification: <how we will know the choice worked>
```

---

## 13. Extended real-world case studies

These are **[ENGINEERING EXTENSION]** applications derived from the techniques, not demonstrations completed by the instructor.

### Case A: Split an existing user name without losing production data

- Start with an explicit behavior change and a backward-compatibility question: are existing consumers still expecting `name`?
- Specify registration, profile editing, API serialization, sorting, notifications, and migrations as relevant paths.
- Challenge AI-generated `name` accessors vs. methods as a technical _choice_, not a behavioral requirement unless consumers depend on it.
- Decide how multi-part or missing names are represented; do not assume arbitrary splitting is lossless.
- Establish backfill and rollback behavior before deployment.
- Validate existing records and data access in executable tests and migration checks.

**Course connection:** L4 first/last name refactor, method vs accessor, migration question, L7 overlap example.

### Case B: Legacy bulk-update calculation

- Explore all mutation surfaces: individual edit, bulk update, upload/import, clone, API versions, async processes.
- Form one coherent proposal describing the _business rule_ and affected propagation paths.
- Use non-neutral fixtures and boundary scenarios; specify currency, rounding, missing data, and transaction rollback behavior if relevant.
- Review code changes against scenarios and preservation constraints, not just tasks completed.
- Archive only when the new rule is represented accurately in the living spec.

**Course connection:** L3–L5, L8, L9; the bulk-update example itself is an extension.

### Case C: Paginate an expensive endpoint

- Use Explore to locate the endpoint and gather concrete latency/query/load evidence.
- Proposal should include cursor/offset semantics, stable ordering, default limits, backward compatibility, and client consumption.
- Split separate performance improvements into separate proposals when independent.
- Verify correctness and performance using representative data, not only perceived responsiveness.

**Course connection:** L6 idea-board endpoint pagination.

### Case D: Passwordless authentication

- Explore product friction and existing auth flows first.
- Explicitly decide whether passwords coexist, whether passkeys are out of scope, and how magic links/email OTP differ in cross-device usage.
- Separate product decision from operational security design; obtain security review for tokens, replay, account enumeration, throttling, email delivery, recovery and sessions.
- Avoid “use defaults” as production sign-off.

**Course connection:** L6 passwordless exploration; listed security controls are extensions.

### Case E: Shared branding configuration

- Define exactly which displayed UI elements must consume the configured application name.
- Cover server- and client-rendered surfaces, fallback behavior, and old hardcoded strings if present.
- Apply and run Verify to map the requirement to actual code; also search/test affected surfaces.

**Course connection:** L8 FeedbackPit name-from-config verification demo.

---

## 14. Anti-patterns, uncertainties, and safeguards

**[COURSE]** Anti-patterns: vague prompt -> code -> diff without decisions; never reviewing generated specs; over-sized mixed changes; over-specifying trivial tasks; behavior patches that do not update specs; letting living specs go stale; isolated adoption in a team; careless archive order for overlapping deltas.

**[ENGINEERING EXTENSION]** Related hazards:

- **Spec theater:** polished artifacts without adequate scenarios, test evidence, or actual review.
- **False green:** Verify says complete while tests never exercised behavior or integration paths.
- **AI confidence substitution:** blindly accepting agent-generated performance findings, security defaults, or migration safety claims.
- **Confusing requirement with implementation:** mandating a full-name _method_ is a design choice; preserving correct full-name behavior is the core user requirement.
- **Accidental process sprawl:** adding duplicate systems for documentation, work tracking, decision records, and recall learning instead of integrating into existing governance.
- **Unsafe recovery:** repeating partially executed migrations or jobs without checking side effects.
- **History overwrite:** syncing old deltas after newer ones and degrading the final living spec.

### Claims the supplied transcripts do NOT establish

- An exact universal file schema for all OpenSpec versions, or a guaranteed CLI option set.
- That unqualified `/opsx:apply` automatically and safely applies all active proposals on every agent/version.
- That `/opsx:verify` executes each specified scenario as an automated test.
- That a checked task proves correctness.
- That archiving equals deploying, or that every team must archive at one fixed release stage.
- That existing applications require retrospective documentation of every feature.
- That OpenSpec is required for simple typo/cosmetic changes or throwaway prototypes.
- That passwordless authentication defaults selected in a rushed demo are production-ready.

---

## 15. Active-recall Q&A bank — PRESERVE, DO NOT ACTIVATE

> **[REPO CONSTRAINT]** These are proposed future Study Mode cards. **Study Mode stability gate: HOLD.** Do not create, seed, register, activate, publish, or expose new cards while the gate remains on Hold. Preserve this section as inert source material for later approved integration. Inspect the repository's existing card model and content style only when planning approved work.  
> **[RECONSTRUCTED]** Questions and answers are original study aids based on the course. Lesson links are references back to the transcripts. Answers are deliberately brief enough for recall while retaining distinguishing facts.

| ID    | Lesson | Question                                                                                    | Expected answer                                                                                                                         |
| ----- | ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| OS-01 | L1     | What fundamental decision is often skipped when prompting an AI agent to build immediately? | The team has not explicitly decided intended behavior, edge cases, failures, and constraints before implementation.                     |
| OS-02 | L1     | What is the minimum OpenSpec lifecycle?                                                     | Propose, apply, archive.                                                                                                                |
| OS-03 | L1     | Why can planning first be faster overall?                                                   | Wrong choices can be corrected in cheap-to-edit text rather than reversed in code and production.                                       |
| OS-04 | L2     | Does an existing app need specs backfilled for every old feature?                           | No; begin with the next meaningful change and grow the spec library incrementally.                                                      |
| OS-05 | L2     | What are the roles of `changes/` and top-level `specs/`?                                    | `changes/` houses active proposals and archived change history; top-level `specs/` holds living expected behavior.                      |
| OS-06 | L2     | Does OpenSpec replace the AI coding agent?                                                  | No; it integrates with supported existing agents.                                                                                       |
| OS-07 | L3     | What belongs in `proposal.md`?                                                              | Why the change exists, what changes, affected capabilities, and impact, understandable beyond technical readers.                        |
| OS-08 | L3     | What belongs in `design.md`?                                                                | Context, goals/non-goals, technical decisions, risks and trade-offs.                                                                    |
| OS-09 | L3     | Why review `tasks.md` carefully?                                                            | It is the planned sequence the agent uses to implement the change.                                                                      |
| OS-10 | L3     | When should a completed change be archived?                                                 | After appropriate verification and agreement; timing relative to deployment depends on team workflow.                                   |
| OS-11 | L4     | How do you change an accessor decision to a method in a proposal?                           | Explain the preference to the agent, clarify ambiguous terms, update cross-referenced artifacts, and review the result before applying. |
| OS-12 | L4     | Why can modifying just `tasks.md` be risky?                                                 | Proposal, design, specs, and tasks cross-reference one another; editing one may create contradictions.                                  |
| OS-13 | L4     | How did the course resume an interrupted apply?                                             | Run `/opsx:apply` again; unfinished tasks remained recorded in `tasks.md`.                                                              |
| OS-14 | L4     | What database concern arises when splitting `users.name` into two columns?                  | Existing data must be migrated/backfilled correctly, with compatibility and edge-case handling.                                         |
| OS-15 | L5     | What is a Delta Spec?                                                                       | The requirements added, modified or removed by one change, not a copy of the whole current spec.                                        |
| OS-16 | L5     | Explain the bank-balance analogy.                                                           | Living spec = balance/current state; deltas = transactions that alter that state.                                                       |
| OS-17 | L5     | What are the three delta categories shown?                                                  | ADDED, MODIFIED, REMOVED requirements.                                                                                                  |
| OS-18 | L5     | Why might removing disposable email checks be a MODIFIED rather than REMOVED requirement?   | Email validation remains a capability; only its acceptance behavior changes.                                                            |
| OS-19 | L5     | How do spec and code diffs differ?                                                          | A spec delta expresses intended behavioral changes; a code diff expresses implementation changes.                                       |
| OS-20 | L6     | What are the two purposes of Explore Mode?                                                  | Discover codebase issues/opportunities and refine an uncertain feature or architecture through dialogue.                                |
| OS-21 | L6     | Why did the instructor create two proposals for performance improvements?                   | To keep changes small, independently reviewable and separately applicable.                                                              |
| OS-22 | L6     | How do you explicitly select a proposal to implement?                                       | Use `/opsx:apply <change-slug>`.                                                                                                        |
| OS-23 | L6     | Which passwordless decision constrained feature scope?                                      | Passwordless should coexist with passwords; passkeys were deferred to separate work.                                                    |
| OS-24 | L6     | Should model-suggested auth defaults be accepted uncritically?                              | No; the instructor used defaults for the demo but said real work warrants more deliberation.                                            |
| OS-25 | L7     | Why store OpenSpec artifacts in Git with the app?                                           | Shared reviews, history of why decisions were made, onboarding context and resumability.                                                |
| OS-26 | L7     | How can proposals be reviewed before writing code?                                          | Commit artifacts on a branch and open a PR for design/requirements review.                                                              |
| OS-27 | L7     | Why does archive order matter for overlapping changes?                                      | Later deltas may supersede earlier requirements; syncing older deltas afterward can make the living spec stale.                         |
| OS-28 | L7     | Distinguish archive from sync.                                                              | Archive preserves completed change history; sync folds delta requirements into the living spec.                                         |
| OS-29 | L7     | What was done after intentionally archiving the newer split-name change first?              | The older stale name-editing change was archived without syncing its outdated requirements.                                             |
| OS-30 | L8     | How was Verify enabled in the lesson?                                                       | `openspec config profile`, enable Verify Change in Workflows for the project, restart the agent.                                        |
| OS-31 | L8     | What does `/opsx:verify` assess?                                                            | Tasks, requirement/scenario coverage, design alignment, spec-to-code mapping, issues, and coherence.                                    |
| OS-32 | L8     | What demo counts appeared in the Verify report?                                             | Six of six tasks, one of one requirements, four of four scenarios; no reported issues.                                                  |
| OS-33 | L8     | Does Verify replace reviewing specs or running tests?                                       | No; it supplements but does not prove behavior or replace human review/tests.                                                           |
| OS-34 | L9     | Name the three practices that sustain SDD.                                                  | Fix behavior by updating the plan/spec, keep changes small, and adopt incrementally without full retrospective backfill.                |
| OS-35 | L9     | What are three traps?                                                                       | Over-proposing, skipping spec review, and allowing specs to become stale.                                                               |
| OS-36 | L9     | What is the instructor's simple criterion for requiring a spec?                             | Does the change alter what the system actually does?                                                                                    |
| OS-37 | L9     | How should throwaway prototypes fit into SDD?                                               | Prototype to learn, possibly discard code, then specify the behavior chosen for a durable implementation.                               |
| OS-38 | L9     | Why does solo adoption within an unaligned team fail?                                       | Other developers may bypass updating the specs, causing documentation drift.                                                            |
| OS-39 | L4/L8  | Why is “all tasks checked” not sufficient evidence?                                         | It records execution progress, not necessarily correct or tested behavior.                                                              |
| OS-40 | L5/L7  | How do archived deltas help future engineers and agents?                                    | They preserve changes and reasoning, explaining why behavior evolved.                                                                   |

### Suggested future review methods — only after gate approval

**[ENGINEERING EXTENSION]** If/when the existing Study Mode stability gate is approved, optionally tag questions by `workflow`, `artifacts`, `deltas`, `collaboration`, `verification`, `adoption`, and `risk`. Use the repository's current card schema and scheduling logic; do not invent separate storage or a new spaced-repetition engine. Keep the Q&A here until governance permits inclusion.

---

## 16. Lesson-by-lesson source map

This preserves traceability while the main document is organized by concept rather than repeating each lesson's full summary.

| Lesson | Course title                                   | Unique contribution                                                                    | Principal sections |
| ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------ |
| L1     | Why Spec-Driven Development With OpenSpec?     | Prompt-first risk; contract-first thinking; propose/apply/archive                      | §1                 |
| L2     | Set Up OpenSpec on a Real Codebase             | Installation, initialization, agent integration, folders, incremental adoption         | §2–3               |
| L3     | Ship Your First Change With OpenSpec           | Account-name example; proposal/design/tasks; apply, manual verification, archive/sync  | §3–4               |
| L4     | Fix the Plan Before You Touch the Code         | Conversational editing, accessor vs method, first/last-name migration, resume/recover  | §3–4, §10          |
| L5     | Delta Specs: The Idea That Makes OpenSpec Work | ADDED/MODIFIED/REMOVED; balance analogy; disposable email and notification examples    | §5                 |
| L6     | Explore Before You Commit                      | Performance triage, independent proposals, passwordless auth requirements discovery    | §6                 |
| L7     | OpenSpec in Your Repo                          | Commit artifacts, PR review, concurrent changes, merge/archive order, sync stale delta | §7                 |
| L8     | Catch Drift Before You Archive                 | Enabling Verify, config-driven branding demo, evidence report, coverage vs correctness | §8                 |
| L9     | Make OpenSpec a Habit That Sticks              | Three habits, three traps, when not to spec, prototype and team adoption               | §9                 |

### Examples and provenance index

| Example                                         | Source                | Teaching point                                            |
| ----------------------------------------------- | --------------------- | --------------------------------------------------------- |
| Add editable account name alongside email       | Course L3             | Full propose/apply/archive cycle                          |
| Replace `users.name` with first/last names      | Course L4             | Scope expansion, design choice, data migration/backfill   |
| Choose method over accessor                     | Course L4             | Revise generated plan conversationally                    |
| Resume near task 3.1                            | Course L4             | Persisted checklist and interrupted execution             |
| Disposable email checks                         | Course L5             | Removal of behavior may be MODIFIED requirement           |
| Feedback-comment email notifications            | Course L5             | True REMOVED requirement                                  |
| Idea-board pagination                           | Course L6             | Discover and scope a performance proposal                 |
| Async notification fan-out                      | Course L6             | Separate small proposals and implementation targeting     |
| Passwordless auth coexistence and OTP           | Course L6             | Requirements discovery and constraints                    |
| Two name-related branches / PRs                 | Course L7             | Overlapping deltas, archive order, sync issues            |
| All FeedbackPit branding uses config            | Course L8             | Verify mapping and completeness demonstration             |
| Bulk update business rule and propagation paths | Engineering extension | Realistic application of spec and verification principles |

---

## 17. Repository integration instructions for Codex

**[REPO CONSTRAINT]** This section applies to the target learning repository, _not_ to an application adopting OpenSpec for its own features.

### Discovery before edits

Inspect the local repository, including its handbook content schema and navigation, current entries on AI-assisted engineering/specification/requirements, the five-stage learning roadmap implementation, the previously integrated _Spec a Product Before AI Builds It_ material, Study Mode logic, existing card storage/registration, and the explicit **Hold** gate. Read relevant tests and contribution conventions.

### Semantic placement

Integrate SDD as a bridge from _product discovery/specification_ into _implementation change control_. Preserve a clear distinction:

- **Product-level specification** (prior course): defining what product to build, feature scope, intended outcomes, and stakeholder scenarios.
- **Change-level OpenSpec workflow** (this course): proposing and reviewing modifications to an existing codebase, recording deltas, executing tasks, verifying drift, collaborating through Git, preserving living requirements.

They complement one another, but are not interchangeable. Do not duplicate the general benefits of planning in multiple full-length handbook pages if a shared concept already exists. Cross-link related topics.

### Content integration and validation

- Use existing handbook entries/components/metadata and established writing conventions.
- Introduce OpenSpec commands and key delta/archival semantics in the most appropriate existing category/topic; add a new topic only if the architecture warrants it.
- Fold high-value templates and checklists into existing reusable reference patterns.
- Include original lesson references and explicitly mark examples or prompts reconstructed here.
- Add an appropriately placed item to the **existing five-stage learning roadmap**, respecting the repository's real stage names, prerequisites, and routing.
- **Do not add active-recall records or change Study Mode behavior.** Retain the proposed Q&A appendix as a handoff reference or non-operative planning material only.
- Do not introduce a second handbook index, course archive, docs subsystem, parallel roadmap, or recall-card mechanism.
- Run the repository's normal formatting, validation, and test commands; explain any commands that cannot run.
- Summarize modified paths, consolidation decisions, roadmap mapping, tests, and confirmation that the Study Mode gate remained untouched.

### Suggested integration acceptance criteria

```markdown
- [ ] Relevant existing knowledge inspected and duplicate text avoided
- [ ] SDD vs product specification distinction is clear
- [ ] Core workflow (Explore/Propose/Review/Apply/Verify/Archive) documented
- [ ] Artifacts and living vs delta specs explained
- [ ] ADDED/MODIFIED/REMOVED classifications and examples preserved
- [ ] Archive vs sync; stale-delta and merge order explained
- [ ] Verification caveats and team adoption trade-offs included
- [ ] Reusable engineering guidance follows existing content patterns
- [ ] Existing five-stage roadmap updated consistently
- [ ] Active-recall Q&A retained for later, but NO cards added/activated
- [ ] Study Mode Hold gate and behavior unchanged
- [ ] Existing validation/tests pass or limitations reported
```

---

## 18. Short Codex Plan Mode prompt

**[RECONSTRUCTED; REPO CONSTRAINT]** Copy this into Codex Plan Mode after making this handoff accessible in the local repository workspace:

```text
Inspect this repository's existing engineering handbook, content conventions,
five-stage learning roadmap, prior product-specification course integration,
and Study Mode stability gate. Read the attached
docs/knowledge-sources/openspec-spec-driven-development-handoff.md as the source of truth.

Plan how to integrate its course concepts, OpenSpec workflows, delta specs,
examples, trade-offs, and reusable guidance into EXISTING handbook patterns.
Consolidate with existing knowledge; do not build parallel docs or systems.
Update the roadmap in its appropriate existing stage.

Study Mode is on HOLD: preserve the proposed recall Q&A for future use,
but DO NOT add, register, seed, expose, or activate any cards, and do not
change the stability gate. Distinguish course-derived material from new
recommendations. Do not install or initialize OpenSpec in this repo.

PLAN MODE ONLY: propose precise target files, edits, deduplication choices,
and validation steps; make no edits until I approve.
```

---

## 19. Quick reference

**Mental model:** `Specify intent → review before code → implement → verify against intent → preserve why`.

**Workflow:** `explore? → propose → review/refine → apply → test/verify → archive (+ sync when appropriate)`.

**Artifact meanings:** proposal = _why/what_; design = _how/trade-offs_; delta spec = _behavioral difference_; tasks = _execution plan_; living spec = _current intended behavior_; archive = _historical reasoning_.

**Delta categories:** ADDED = new requirement; MODIFIED = changed requirement; REMOVED = retired requirement. Removing a sub-rule may be MODIFIED rather than REMOVED.

**Quality:** an approved spec does not prove implementation correctness; a checked task does not prove test coverage; Verify does not replace tests or human review.

**Team discipline:** specs belong beside code, overlapping changes need merge/sync ordering, and stale deltas must not overwrite newer intended behavior.

**Scope discipline:** use SDD for meaningful behavioral change; skip bureaucracy for trivial tweaks; allow discovery prototypes; align the team; adopt incrementally.

**Repository-specific invariant:** this file is a **knowledge handoff**, not a request to initialize OpenSpec. Study Mode remains **HOLD**; proposed active-recall Q&A remain **inactive**.

---

## Source and further reading

- **Primary course source:** Unlearn — _Product Engineer → Spec-Driven Development with OpenSpec_, lessons 1–9, learner-provided transcripts. Lesson map above acts as the internal source index.
- **OpenSpec project (external link, version-dependent):** https://github.com/Fission-AI/OpenSpec
- **Target learning repository:** https://github.com/viniciuspizettadesouza/engineering-case-studies

_End of standalone handoff._
