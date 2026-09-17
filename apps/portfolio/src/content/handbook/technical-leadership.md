# Technical Leadership

Technical leadership combines engineering judgment, people leadership, and communication. The role is to improve the team's ability to make and deliver sound decisions—not to become the only person allowed to make them.

## Core responsibilities

- connect technical plans to product outcomes;
- shape architecture and document consequential decisions;
- estimate with uncertainty and communicate risk;
- review code and system behavior at the appropriate level;
- resolve or facilitate difficult technical problems;
- mentor engineers and create opportunities for ownership;
- coordinate with product, design, quality, security, and operations;
- distribute work sustainably and make progress visible.

A product trio often frames risk through value and business viability, usability, and technical feasibility. These are shared concerns even when a product manager, designer, and lead engineer take primary responsibility for different questions.

## Developing as a lead

Become a trusted local reference by teaching, reviewing, and making reasoning reusable. Write small RFCs that connect code decisions to customer and business value. Ask for periodic 360-degree feedback. Delegate decisions with context and boundaries, then support rather than retake the work. Build successors so the team does not depend on one person.

Use engineering metrics such as lead time, deployment frequency, change-failure rate, and recovery time to understand systems. Never use a single metric to rank individual contributors. External writing, talks, and open-source work can sharpen communication, but internal team outcomes come first.

Technical breadth for a lead includes dependency health, architecture and scalability reviews, observability, performance engineering, and code-quality governance. The goal is not to personally approve every choice; it is to establish useful questions, ownership, evidence, and escalation paths. AI context design—selecting relevant constraints, examples, retrieval sources, and verification steps—is another engineering skill when assistants participate in research, planning, ADRs, implementation, or review.

## A 30–60–90 day approach

### Days 0–30: discover

- Hold structured one-to-ones across engineering, product, design, and quality.
- Observe delivery and incidents before prescribing process.
- Map system context, major containers, ownership, and dependencies.
- Establish a baseline for delivery and reliability signals.
- Record known experiments, risks, and unresolved decisions.

### Days 31–60: organize

- Agree on review expectations based on change risk rather than an arbitrary universal SLA.
- Publish the first useful ADR or RFC.
- Improve runbooks and clarify incident ownership where the product needs on-call support.
- Make team-level engineering signals visible and explain their limitations.

### Days 61–90: improve

- Select a small, measurable improvement to product flow or technical risk.
- Align goals with the team and stakeholders.
- Deliver the improvement, observe the result, and document what changed.
- Continue coaching and delegate the next decision to another engineer.

Leadership is contextual. A new lead should not impose rituals, dashboards, or on-call rotations before learning whether they solve the team's actual problems.
