# Project Brief

## What I understand

Vinicius wants to build a public engineering portfolio made of small, executable products. The products should reflect the progression of problems he has learned to solve during his career, without copying the companies or systems where that learning happened.

The portfolio should make engineering judgement visible—not only polished screens. A visitor should be able to use a focused workflow, inspect its code and understand why its boundaries, tests and trade-offs were chosen.

## Intended audience

The primary audience is engineering leaders, senior engineers, recruiters and potential collaborators evaluating Vinicius for senior frontend and technical leadership work.

They should leave with evidence of:

- strong frontend fundamentals;
- product and full-stack awareness;
- accessible interface engineering;
- architecture proportional to the problem;
- performance and quality practices;
- design-system and multi-tenant experience;
- clear written technical decisions;
- responsible use of AI;
- product thinking across regulated, consumer and enterprise workflows.

## Product principles

### Executable over decorative

Each completed study needs one small but meaningful workflow. Static mock-ups alone do not demonstrate state, failure handling, accessibility or domain modelling.

### Depth over volume

Studies are delivered sequentially. One finished, documented and tested journey is more valuable than five partially implemented applications.

### Fictional by construction

The studies start from invented organisations, users and rules. Career experience informs the engineering questions, never the reconstruction of a previous product.

### Architecture with evidence

Abstractions and dependencies require a demonstrated need. Important choices are recorded in ADRs, including rejected alternatives and consequences.

### Accessible by default

Semantic structure, visible focus, keyboard operation, useful errors, reduced motion and automated checks are part of normal delivery—not a final audit phase.

### Honest status

Planned, in-progress and complete work must be visually distinguishable. The portfolio must never present a placeholder as a delivered case study or simulated metrics as production outcomes.

## Product collection

1. **Financial operations:** a two-page credit application followed by a separate agent-verification dashboard.
2. **Vehicle commerce:** vehicle discovery followed by a reservation form and request confirmation.
3. **Public transport:** an accessible, white-label ticket-purchase journey for fictional operators.
4. **Enterprise catalogue:** bulk product registration for two fictional retail tenants using shadcn-based UI components.
5. **Retail insights:** daily AI-assisted sales insights and supporting visualisations for managers of fictional stores.

The five products are independent fictional studies, not employer profiles or replicas of existing products. The two retail studies may share an invented domain context, but remain separate products with different user goals and technical evidence.

## MVP strategy

The first product milestone is to define and deliver one narrow end-to-end workflow for each study. Each MVP must prove its central interaction and engineering boundary before optional features are added. Real payments, production identity systems, external decision engines and real company data are excluded.

## Success criteria

The project succeeds when:

- a visitor can understand the career progression without reading a résumé;
- every completed study has an executable workflow and supporting documentation;
- accessibility and automated quality checks are visible in code and CI;
- the repository contains no proprietary content;
- the architecture can evolve without requiring all future needs to be predicted;
- Vinicius can use each study as the basis for a substantive technical conversation.

## Explicit non-goals

- recreating former employer applications;
- building production businesses or complete SaaS products;
- proving expertise through the number of dependencies used;
- adding real payments, authentication or personal data to make a demo appear realistic;
- implementing all studies before publishing any of them;
- manufacturing performance or business impact claims.
