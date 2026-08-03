# Commerce Experience — Accessibility Review

Review date: 2026-08-03.

Status: completed for the MVP; this is not a WCAG certification.

## Scope and method

The review covers catalogue filters and service states, vehicle cards and details, reservation validation, availability conflicts, review/edit, recoverable submission failure and confirmation. Evidence comes from semantic inspection, keyboard-focused interaction checks and the desktop/mobile Chromium Playwright journey.

No external screen-reader session or formal WCAG audit was available in this environment. VoiceOver/Safari and NVDA/Firefox spot checks remain recommended.

## Results

- every form field has a persistent visible label;
- filters use native selects and update a shareable URL without taking focus;
- result counts and submission progress use polite announcements;
- empty and error states explain a recovery action;
- invalid fields expose `aria-invalid` and linked descriptions;
- validation moves focus to an alert summary whose links target the fields;
- an availability conflict preserves all contact details;
- review content uses headings and description lists rather than visual position alone;
- buttons and links meet the study's minimum 44-pixel target height;
- original vehicle images have descriptive alternative text and fixed dimensions;
- reduced-motion behavior is inherited from the portfolio stylesheet;
- the critical journey completes in both configured Playwright viewports.

## Follow-up recommendations

- complete screen-reader checks in VoiceOver/Safari and NVDA/Firefox;
- inspect reflow at 200% and 400% zoom and in Windows high-contrast mode;
- validate availability and conflict wording with representative users;
- add automated accessibility scanning as a supplement to manual review;
- measure focus visibility and target spacing on additional physical mobile devices.
