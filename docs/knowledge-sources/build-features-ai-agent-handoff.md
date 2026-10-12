# Build Features with an AI Agent — Knowledge Handoff

> **Source:** Unlearn / Product Engineer, 12 lessons (~1h38m), learner-provided in conversation “unlearn 4”, October 2026.  
> **Retrieval audit:** Lesson-level coverage 12/12; earlier conversation supplied all 12 transcripts. In this current session, verbatim content is not fully retrievable for every lesson; the materials below synthesize recoverable lesson summaries plus the Lesson 12 checklist excerpt. Some titles are near-verbatim from prior summaries, but Lesson 1's exact title is not independently recoverable. **Not a line-by-line transcript audit.**  
> **Destination:** `docs/knowledge-sources/build-features-ai-agent-handoff.md`.  
> **Provenance labels:** **[COURSE]** = supported by recovered course details; **[RECONSTRUCTED]** = original reusable prompt/template extrapolated from those details; **[ENGINEERING EXTENSION]** = additional safeguard or application; **[VERIFY]** = not known verbatim.

## 1. Central model: the agent is an implementer, not the product authority

**[COURSE]** Coding agents move rapidly through tests, dependencies and code generation; quality depends on supplying the existing repo's guardrails, clear instructions, human decisions, and an inspectable feedback cycle. Instead of a giant “build everything” request, work in focused stages with executable tests, checks on each change and explicit review of agent conclusions.

```text
Reviewed feature spec and per-step test plan (Unlearn 3)
  → repository quality baseline and AGENTS.md
  → Plan Mode / scoped implementation
  → tests before implementation and verification
  → auto-running quality tools / hooks
  → inspect and correct agent design decisions
  → small branches and reviews
  → resume via persistent plans and checklists
  → final code review, remediation, human approval
```

Treat output claims separately from evidence. A green test suite can miss a race; a clean static analysis run can coexist with a wrong business rule. **[ENGINEERING EXTENSION]** Record which assertions/tests actually exercised each changed behavior.

## 2. Establish executable code-quality guardrails before agent coding

**[COURSE]** Lesson 1 configures a Laravel/Vue codebase's baseline before the agent starts substantial feature work: **Laravel Pint** for PHP formatting, **Vue ESLint**, **Larastan** for static analysis, and tests. The expected developer loop runs lint/format, analysis and the relevant tests. Existing conventions and initial baseline failures need to be understood first.

Guardrails have two categories:

1. **Executable constraints:** formatting, linting, static analysis, type checking, tests, build, repository security rules. These fail with evidence.
2. **Advisory instructions:** project conventions, architectural preferences, what to avoid, review style and agent expectations. The agent may disregard or misinterpret these and must still be reviewed.

**[ENGINEERING EXTENSION]** Record a clean (or explicitly known-failing) baseline before implementation, avoid broad “fix all” formatting in feature PRs, scope expensive checks sensibly, and provide a visible failure signal when hooks cannot execute. In TypeScript projects the analogy may be ESLint + TypeScript + Vitest + build, not a reason to install Laravel tools.

### Quality-gate template [RECONSTRUCTED]

| Gate           | Command from this repo | Baseline        | When to run              | Failure action                       |
| -------------- | ---------------------- | --------------- | ------------------------ | ------------------------------------ |
| Format         | `<repo command>`       | known pass/fail | changed files / PR       | inspect diff and retry               |
| Lint           | `<repo command>`       | known pass/fail | edit / PR                | fix warnings in-scope                |
| Static types   | `<repo command>`       | known pass/fail | after relevant edits     | diagnose root cause                  |
| Targeted tests | `<repo command>`       | known pass/fail | each implementation step | resolve test/implementation mismatch |
| Broader suite  | `<repo command>`       | known pass/fail | PR / risky change        | compare regression to baseline       |
| Build/browser  | `<repo command>`       | known pass/fail | relevant routes / PR     | manual flow check                    |

## 3. Learn your coding agent's operating model

**[COURSE]** Lesson 2, _Navigating Your AI Agent_, covers permissions, Plan Mode, context and targeted inputs, multi-modal references, model selection, and tool/command interfaces. The crucial operational distinction is **investigation and planning** versus **authorizing tool-executed changes**. Ensure the agent has the relevant local files, not a sprawling undifferentiated context dump.

**[ENGINEERING EXTENSION]** Identify shell, network, package installation, database and filesystem scopes. Ask for explicit approval before consequential or irreversible commands. Tool modes differ by provider/version; inspect installed help instead of copying potentially obsolete UI steps. Never expose secrets to an agent just to make a demo work.

### Agent task entry contract [RECONSTRUCTED]

```md
Task: <one outcome>
Canonical references: <feature spec / delta / acceptance scenarios>
Relevant code: <paths or search direction>
In scope: <behavior>
Out of scope: <explicit constraints>
Baseline checks: <commands>
Expected evidence: <tests and runtime checks>
Permissions: inspect and plan first; pause before destructive work
Deliverable: concise diff summary, risks, test evidence, unanswered questions
```

## 4. Make durable repository knowledge visible in AGENTS.md

**[COURSE]** Lesson 3, _Start with AGENTS.md_, recommends persistent local agent guidance for stack facts, code philosophy and conventions. A rule in a prompt is still advisory; enforce important constraints with automated checks where possible. Update agent guidance when recurring errors reveal missing or ambiguous instructions.

### Example AGENTS.md outline [RECONSTRUCTED]

```md
# Working in this repository

## What the project is and where canonical specifications live

## Toolchain and approved framework patterns

## How to run quick checks and comprehensive validation

## What code conventions are non-negotiable

## Data, security, privacy and side-effect boundaries

## Work process: plan → reviewed tests → implementation → verification → diff review

## Commands needing explicit approval

## How to report failures, unknowns and skipped tests
```

Avoid making this document an encyclopaedia or copying long course transcripts into it. Keep executable project rules in code/config. **[ENGINEERING EXTENSION]** Add a short “do not change unrelated files” rule and require listing tests that were skipped; never pretend AGENTS.md grants permission for risky operations.

## 5. Implement tests before AI-generated code

**[COURSE]** Lesson 4, _Implementing Tests Before AI Generated Code_, operationalizes the test plan: ask the agent to write tests from reviewed expected behavior, inspect those assertions, observe that they fail for the right reason, then allow feature implementation. Authentication provides the demonstration; visual/browser checks remain necessary for relevant user flows.

A productive loop is:

```text
Expected behavior and exclusions approved
 → agent proposes test cases
 → human reviews assertions and missing branches
 → tests added, red state explained
 → implement the minimum behavior
 → rerun targeted tests, static checks, integration/browser checks
 → inspect diff and validate acceptance outcomes
```

Wrong tests are a first-class defect. Tests that only mock and assert calls may not catch the implementation using incorrect data or authorization. **[ENGINEERING EXTENSION]** Use non-neutral fixtures, persistence checks and cross-entry-point coverage when risk warrants; for complex writes, consider concurrency and idempotency scenarios.

### Tests-first prompt [RECONSTRUCTED]

> Using the approved feature specification and Step N test plan, add tests only. Cover observable success, failures, authorization, persistence and backward-compatibility as applicable. Show how each test traces to one acceptance criterion. Run the targeted tests and report why they fail. Do **not** write production implementation code until the assertions are reviewed.

## 6. Hooks as an automatic feedback loop

**[COURSE]** Lesson 5, _Using Hooks as Part of Our Workflow_, demonstrates **PostToolUse** hooks running checks after agent edits so the agent sees formatter/linter/static-analysis/test failures and can correct them without relying on a human to remember every check.

**[ENGINEERING EXTENSION]** Use fast, deterministic, scoped checks after edits and heavier tests at logical checkpoints. Hooks should be observable, not silently best-effort; confirm correct working directory, exit codes and failure propagation. Avoid loops where an auto-fixer repeatedly rewrites unrelated files. Treat hook configuration as tool/version dependent and validate against current documentation before use.

### Hook design checklist [RECONSTRUCTED]

- Trigger only on relevant edit/write tools or affected paths.
- Run least-expensive reliable checks first.
- Capture output and exit status; fail visibly on errors.
- Restrict auto-fixes to changed files when feasible.
- Prevent recursive auto-edit loops and unbounded retry.
- Retain broader CI checks as the independent gate.

## 7. Review architectural choices, not just syntax

**[COURSE]** Lesson 6, _Reviewing and Refining Agent Decisions_, inspects a generated authentication implementation and asks the agent to refactor toward existing **Fortify** primitives rather than duplicate framework features. Persist the lesson in AGENTS.md if the same error pattern could recur.

**[COURSE]** Lesson 7, _Rapid Review and Refine Cycle_, demonstrates a batch of targeted code-level corrections: follow the appropriate **Inertia helper**, avoid problematic broad request usage such as `request()->all()` when narrower input is required, and prefer named routes where that is repository convention. The point is fast, specific feedback grounded in actual code and project practices.

### Targeted review prompt [RECONSTRUCTED]

> Review the changes against our approved stack, feature spec and AGENTS.md. Find unnecessary custom framework code, overly broad input handling, inconsistent named routes, poor reuse, authorization gaps and hidden dependencies. Cite exact files and affected behavior; rank actionable findings. Do not change functionality or expand scope without approval.

**[ENGINEERING EXTENSION]** After each fix, rerun the smallest applicable verification set and the full required PR checks; avoid blind batch refactors when one correction changes shared behavior.

## 8. Plan inside the agent, but preserve checkpoints

**[COURSE]** Lesson 8, _Planning Inside Your Agent_, uses conversational planning to define scope, discuss alternatives and decide human checkpoints before implementation. The example explores idea submission and voting while deferring some functionality. The planning conversation is not approval for every agent suggestion.

**[RECONSTRUCTED] Prompt:**

> Plan only the approved idea-submission and voting slice. Read current specs and code, show proposed behavior, integration paths, assumptions, non-goals, migrations, test approach, dependencies and review checkpoints. Clearly mark proposals deferred for later. No code edits until the plan is approved.

**[ENGINEERING EXTENSION]** Keep a versioned or saved plan when the work may span sessions; when deviating, explain which requirement, constraint or new evidence caused the change.

## 9. Small focused branches and resumable context

**[COURSE]** Lesson 9, _Small, Focused Branches_, explains keeping PRs independently reviewable, including **stacked PRs** where one branch/change depends on another. Saved plans in `.claude/plans` can preserve work context. Structure branching around a coherent behavior and its tests, not arbitrary file boundaries.

**[COURSE]** Lesson 10, _Picking up Where You Left Off_, resumes a voting-related feature using saved plans and checklists. Concurrency/race-condition concerns emerged in the voting example. A previous assistant session summary is not a substitute for inspecting live code/diff/test state.

### Resume protocol [RECONSTRUCTED]

1. Read source spec, latest approved plan, saved checklist, and current branch status.
2. Inspect uncommitted changes and previous commit boundaries.
3. Rerun relevant checks to establish the live baseline.
4. Identify incomplete steps, assumptions and any partially executed side effects.
5. Review concurrency, locking, deduplication and idempotency for shared writes.
6. Resume one reviewed step; validate and record evidence before marking complete.

**[ENGINEERING EXTENSION]** Stacked PRs demand clear base/target branch naming and careful handling after parent changes; avoid merging a dependent branch before required upstream behavior exists.

## 10. Local multi-agent review, evidence and severity

**[COURSE]** Lesson 11, _Local Code Reviews without Humans_, demonstrates a reusable local `SKILL.md` that delegates review to another model/agent (**Codex**) and reports findings grouped by **Critical, Error, Warning, Suggestion, Nitpick**. In the voting example, review identified a concurrency/race-condition risk and judged the feature **not safe to ship**. Automated agent review helps identify defects but does not replace accountable human acceptance or runtime evidence.

### Reusable review skill outline [RECONSTRUCTED]

```md
# Feature change reviewer

Inputs: feature spec, accepted tasks, git diff, relevant tests and conventions.
Process:

1. Read changed files and surrounding write/read paths.
2. Compare observable behavior with acceptance criteria and non-goals.
3. Assess auth, data integrity, concurrency, migration, retry and error paths.
4. Inspect tests for ability to detect realistic regressions.
5. Report actionable findings with file/line, severity and evidence.
   Output sections: Critical | Error | Warning | Suggestion | Nitpick.
   Do not silently edit files; recommend ship/no-ship with reasons.
```

**[ENGINEERING EXTENSION]** Concurrency review should cover repeat requests, uniqueness constraints, atomic database operations and failure under parallel attempts, not only single-thread UI behavior. Validate apparent races using executable tests or database-level reasoning before calling them proven.

## 11. Checklists turn reviews into safe incremental remediation

**[COURSE]** Lesson 12, _Using Checklists_, recommends asking the agent to write a persistent local checklist for a list of fixes/refactors, such as findings produced by the prior code review. The reported example used a voting-fix file like `fixes-voting.md`. Work one item at a time, pause to review, verify results, mark the item complete, and pick up where you left off. This is especially useful for long reviews, interruptions and multi-session changes.

### Checklist template [RECONSTRUCTED]

```md
# Remediation: <feature> (derived from review <link/id>)

## Constraints

- Canonical specification:
- Branch / current commit:
- Validation commands:
- Non-goals:

## Findings

- [ ] R1 [Critical] <behavioral risk>
  - Evidence / location:
  - Proposed fix:
  - Tests to add or update:
  - Done when:
- [ ] R2 [Warning] <smaller issue>
  - Evidence / location:
  - Proposed fix:
  - Tests to add or update:
  - Done when:

## Progress log

- Date / item / changes / tests / unresolved risks:
```

### Checklist-processing prompt [RECONSTRUCTED]

> Read `fixes-voting.md` and the related accepted feature spec. Work on **only the first unchecked item**. First explain its risk and intended change; then implement the smallest fix and appropriate regression tests. Run relevant checks, show the diff and results, and **stop for review**. Check off the item only after its acceptance evidence is recorded. Do not proceed to the next item automatically.

**[ENGINEERING EXTENSION]** An unchecked box may mean unstarted, blocked or partially implemented; use a small status note where needed. For security and data-integrity issues, do not let a checklist completion signal override failing tests or unresolved production risk.

## 12. Consolidated work patterns [RECONSTRUCTED]

### Pattern A — New feature with an AI agent

1. Approve the feature spec and per-step test plan (from Unlearn 3).
2. Record baseline, AGENTS.md expectations and available command permissions.
3. Plan one feature increment and inspect expected edits.
4. Ask the agent for tests first, review their claims and red-state causes.
5. Implement bounded behavior; let hooks provide immediate feedback.
6. Run integration/browser checks, then inspect diff and framework reuse.
7. Get an independent review focused on failure modes and hidden behavior.
8. Fix verified findings through a persistent, prioritized checklist.
9. Record evidence, reconcile changes to specs and prepare the small PR.

### Pattern B — Revising agent-generated framework code

Inspect architecture decisions; list places where custom code duplicates trusted stack functionality; propose focused fixes without changing accepted UX; implement, rerun tests and update AGENTS.md with reusable repo-specific rules.

### Pattern C — Interrupted risky change

Read saved plan and checklist; assess actual branch/tests, database changes and partially executed operations; choose next safe increment; confirm effects before repeating commands; update the checklist only on evidence.

### Pattern D — Voting/concurrent-write feature

Check unique vote identity, authorization, duplicate submission, simultaneous request behavior, transactions/atomic writes, retry or reversal paths, derived counters, and both DB-level and API-level tests. **Engineering extension:** these are reasonable review dimensions, not claims that all were exhaustively demonstrated in the transcript.

## 13. Anti-patterns and trade-offs

| Failure mode                       | Why it matters                                       | Countermeasure                               |
| ---------------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| One enormous prompt/PR             | Hard to inspect; hidden assumptions                  | Steps, Plan Mode and scoped branches         |
| AGENTS.md mistaken for enforcement | Agent can ignore text                                | Executable checks and review                 |
| Tests written to fit code          | Self-confirming faulty behavior                      | Reviewed test plan and test-first iteration  |
| Hooks as the only CI               | Hooks may not run, may miss end-to-end risk          | Independent PR checks                        |
| Agent insists a change is complete | Passing checks may not address races or requirements | Behavioral acceptance and independent review |
| Automatic multi-fix sweep          | Cross-cutting regressions, hard rollback             | One checklist issue then review              |
| Resume based only on chat memory   | Branch and database may have drifted                 | Inspect real files, commits, state and logs  |
| Every issue made a separate PR     | Excess overhead and coupling                         | Coherent behavior-based boundaries           |

## 14. Prompt collection [RECONSTRUCTED]

**Plan one increment**

> Read [feature spec] and [test plan]. Inspect existing code. Present the minimal implementation of Step N, file/command impact, risks, test mapping, non-goals and approval checkpoints. Do not edit yet.

**Test-first**

> Translate Step N acceptance criteria into observable tests using existing conventions. Run and explain failing tests before changing production code; do not rewrite expectations merely to pass.

**Investigate a bad framework choice**

> Compare this code with the framework's native capabilities and project conventions. Propose a minimal refactor retaining approved behavior. Show justification and regression tests before editing.

**Review my diff with a second agent**

> Independently assess this branch versus its base against the feature spec. Prioritize correctness, data integrity, authorization, concurrency and tests. Return Critical/Error/Warning/Suggestion/Nitpick with locations, evidence and unresolved uncertainty. Make no edits.

**Turn review into a resumable worklist**

> Create a Markdown checklist from actionable review findings. Preserve severity, source location, proposed outcome, tests and dependencies. Do not implement until I choose an item.

**Resume a paused task**

> Before editing, inspect the saved plan/checklist, Git status, tests and any partial side effects. Show what is verified complete, incomplete or uncertain, then propose the safest next step.

## 15. Active-recall Q&A — INACTIVE, NOT REGISTERED

| ID    | Question                                                             | Answer                                                                                       |
| ----- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| AI-01 | Why set up quality tools before agent coding?                        | Agents get immediate executable feedback and a reproducible baseline.                        |
| AI-02 | Which tools were configured in the example stack?                    | Laravel Pint, Vue ESLint, Larastan and tests.                                                |
| AI-03 | How are AGENTS.md and ESLint different?                              | AGENTS.md gives advisory instructions; ESLint enforces configured static rules.              |
| AI-04 | What is the main use of Plan Mode?                                   | Review scope, approach and commands before edit execution.                                   |
| AI-05 | Why avoid massive context dumps?                                     | Relevant, targeted input makes constraints and sources clearer.                              |
| AI-06 | What is the test-first sequence for agent work?                      | Review behavior, add/review tests, confirm meaningful red, implement, verify green and diff. |
| AI-07 | Why should failing tests be inspected?                               | A broken test environment is different from the intended missing functionality.              |
| AI-08 | What does PostToolUse automate?                                      | Tool-triggered code-quality checks and feedback after edits.                                 |
| AI-09 | Why can PostToolUse not replace CI?                                  | It can be skipped, misconfigured or limited in scope.                                        |
| AI-10 | What architectural correction was illustrated with authentication?   | Prefer existing Laravel Fortify capabilities to redundant custom code.                       |
| AI-11 | Name two rapid-review conventions.                                   | Appropriate Inertia helper use, avoiding indiscriminate request()->all(), named routes.      |
| AI-12 | Why update AGENTS.md after a recurring mistake?                      | To reduce repeat misunderstanding of repository-specific conventions.                        |
| AI-13 | What makes an agent plan trustworthy?                                | Reviewed requirements, constraints, executable evidence and human approval—not polish alone. |
| AI-14 | Why use small branches?                                              | Narrow, reviewable behavioral changes and easier rollback.                                   |
| AI-15 | What is a stacked PR?                                                | A pull request depending on another branch/PR; merge order matters.                          |
| AI-16 | What do saved plans and checklists preserve?                         | State and decisions needed to resume a multi-session workflow.                               |
| AI-17 | What must you inspect before resuming?                               | Git status/diff, tests, accepted plan and any side effects.                                  |
| AI-18 | What risk surfaced during voting review?                             | A concurrency/race-condition concern that prevented a safe-to-ship judgment.                 |
| AI-19 | What does an independent AI code review add?                         | Another perspective on code risk, but not guaranteed correctness.                            |
| AI-20 | What severity categories were used?                                  | Critical, Error, Warning, Suggestion, Nitpick.                                               |
| AI-21 | What is the advantage of a persistent fix checklist?                 | One-by-one remediation and resumability across interruptions.                                |
| AI-22 | When should a checklist item be checked off?                         | Once implementation and agreed verification evidence have been reviewed.                     |
| AI-23 | Why are input and authorization boundaries important in code review? | Broad input handling and missing permissions can create unintended writes/exposure.          |
| AI-24 | Does a successful unit suite rule out concurrency defects?           | No; parallel writes and database constraints may require separate reasoning/tests.           |
| AI-25 | Why connect agent implementation back to upstream specs?             | To preserve decision traceability and avoid stale product/change contracts.                  |

No Study Mode registration or activation is authorized. Curate/deduplicate only after the existing recorded **Proceed** decision.

## 16. Lesson-by-lesson source map

| Lesson | Title known from earlier conversation                             | Distinct teaching preserved                                          | Retrieval status                                       |
| ------ | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------ |
| 1      | **[VERIFY exact title]** Set up code-quality tools before AI work | Laravel Pint, Vue ESLint, Larastan, tests and baseline               | Topic confirmed; exact title unavailable               |
| 2      | Navigating Your AI Agent                                          | Permissions, Plan Mode, context, multi-modal inputs, commands/models | Recovered summary; exact transcript not available here |
| 3      | Start with AGENTS.md                                              | Persistent stack/convention guidance, advisory vs enforced rules     | Recovered summary                                      |
| 4      | Implementing Tests Before AI Generated Code                       | Reviewed tests-first; authentication and browser checks              | Recovered summary                                      |
| 5      | Using Hooks as Part of Our Workflow                               | PostToolUse quality feedback                                         | Recovered summary                                      |
| 6      | Reviewing and Refining Agent Decisions                            | Fortify reuse over custom duplicate implementation                   | Recovered lesson-level summary                         |
| 7      | Rapid Review and Refine Cycle                                     | Inertia helper, request input handling, named routes                 | Recovered lesson-level summary                         |
| 8      | Planning Inside Your Agent                                        | Scope, ideas/voting, deferred enhancements, checkpoints              | Recovered summary                                      |
| 9      | Small, Focused Branches                                           | Stacked PRs; `.claude/plans`                                         | Recovered summary                                      |
| 10     | Picking up Where You Left Off                                     | Resuming voting plans, concurrency and checkpoints                   | Recovered lesson-level summary                         |
| 11     | Local Code Reviews without Humans                                 | SKILL.md, Codex severity review, voting race warning                 | Recovered lesson-level summary                         |
| 12     | Using Checklists                                                  | `fixes-voting.md`, incremental fixes, review/checkoff/resume         | Direct excerpt in project context plus summary         |

**All 12 lessons accounted for at concept level.** Exact verbatim source prompts, configurations, hook scripts, exact Lesson 1 title, example commands and timeline are **not certified** and should be verified against original transcripts if complete fidelity is required. No exact tool configuration file has been claimed as course-provided.

## 17. Target repository integration rules

- Preserve this complete handoff in `docs/knowledge-sources/`.
- Canonical explanations may belong in `apps/portfolio/src/content/handbook/testing-delivery-and-devops.md` (AI-assisted engineering workflow, test strategy, code quality, CI) and/or the existing `specification-driven-development.md` (handoff from feature spec into agent execution); avoid duplicating entire sections.
- Update `apps/portfolio/src/content/handbook.ts` only if a **new** canonical topic is justified by actual navigation/size, not automatically.
- Keep tooling-specific snippets version-aware, framed as example guidance; do not install PHP, OpenSpec or Claude tooling in this React/TypeScript learning app.
- Maintain `apps/portfolio/src/study/roadmap/study-roadmap.ts` and the existing five-stage learning progression. Preserve Study Mode Hold and existing card registry unmodified.
- Do not treat an independent agent's approval as evidence of executed tests or a go-live authorization.
