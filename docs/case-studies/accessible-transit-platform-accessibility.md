# Accessible Transit Platform — Accessibility Review

Review date: 2026-08-03.

Status: completed for the MVP; this is not a WCAG certification.

## Scope and method

The review covers operator switching, journey fields and service states, expired and no-result journeys, fare comparison, passenger validation, review/edit, purchase failure and ticket confirmation. Evidence comes from semantic and accessible-name inspection, keyboard-oriented interaction checks, linked-error behavior and desktop/mobile Chromium Playwright journeys.

No external screen-reader session or formal WCAG audit was available in this environment. VoiceOver/Safari and NVDA/Firefox spot checks remain required before making a conformance claim.

## Results

- operator, origin, destination, time, passenger and demo controls use native labelled fields;
- a tenant switch changes visible fixtures and tokens without carrying the other tenant's form state into view;
- every invalid field uses `aria-invalid` and a linked persistent description;
- failed submission moves focus to an error summary or service alert;
- journey loading, result changes, fare selection and purchase progress use polite status announcements;
- expired journeys are explained in text and cannot be selected;
- fare cards provide price, purpose and restrictions without relying on colour or visual comparison alone;
- review sections use headings and description lists, with explicit edit links;
- controls retain at least a 44-pixel target height and visible tenant-coloured focus treatment;
- dark mode provides separate tenant accent tokens rather than reusing dark foreground colours;
- reduced-motion behavior is inherited from the portfolio stylesheet;
- the complete workflow passes at both configured Playwright viewports.

## Manual review notes

The native select, radio, checkbox, link and button sequence follows DOM order and can be completed without pointer-specific interaction. Alerts are focusable only when focus is deliberately moved after validation or a simulated failure. Visual token changes are supplemental: the operator name and fixture content also identify the selected tenant.

## Follow-up recommendations

- run VoiceOver/Safari and NVDA/Firefox purchase journeys;
- recruit disabled participants to evaluate fare and expiry explanations;
- test reflow at 200% and 400%, text spacing and Windows high-contrast mode;
- validate every tenant token set with automated contrast checks during configuration;
- add automated accessibility scanning as a supplement to manual review.
