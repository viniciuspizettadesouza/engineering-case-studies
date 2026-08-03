# Financial Operations Platform — Accessibility Review

Review date: 2026-08-03.

Status: completed for the MVP; this is not a WCAG certification.

## Scope and method

The review covered both application pages, validation errors, recoverable submission failure, confirmation, queue filters, responsive application lists, application details and the agent decision form.

Evidence came from:

- semantic and accessible-name inspection of the rendered React structure;
- keyboard-focused checks for the skip link, form controls, error recovery, navigation and agent actions;
- desktop Chromium and Pixel 7 viewport journeys through Playwright;
- light and dark colour-token inspection;
- reduced-motion behaviour already defined by the portfolio stylesheet.

No external screen-reader session or formal WCAG audit was available in this environment. A screen-reader spot check remains recommended before describing the study as conformant.

## Results

### Passed

- every input has a persistent visible label;
- native input, select, checkbox, button, link, table and heading semantics are used;
- invalid fields expose `aria-invalid` and associated descriptions;
- validation moves focus to a linked error summary;
- submission progress uses a polite live region;
- simulated service failures use alerts and preserve entered data;
- status changes are announced and also written into visible history;
- the wide queue table becomes touch-friendly cards at mobile widths;
- status meaning is expressed in text rather than colour alone;
- visible focus styles and minimum-height primary actions are present;
- the critical workflow completes at both configured viewports.

### Finding corrected during review

The initial mobile dashboard retained the desktop table. Its action column required horizontal scrolling and could be obscured during automated interaction. The final implementation renders application cards below the small-screen breakpoint while retaining the data table for wider layouts.

## Follow-up recommendations

- conduct VoiceOver/Safari and NVDA/Firefox spot checks;
- test browser zoom at 200% and Windows high-contrast mode;
- validate error and decision language with representative users;
- add automated accessibility tooling only as a supplement to manual review.
