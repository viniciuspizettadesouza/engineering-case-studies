# CSS, UI Architecture, and Accessibility

## Visibility and layout

- `display: none` removes an element from layout and the accessibility tree.
- `visibility: hidden` preserves layout space but hides the element and normally removes it from interaction.
- `opacity: 0` makes an element transparent while preserving layout and, unless separately controlled, interaction and accessibility exposure.

Use Flexbox for one-dimensional alignment and Grid for two-dimensional layout. `clamp()` can create bounded fluid values such as `font-size: clamp(1rem, 2vw, 2rem)`.

## Organizing styles

OOCSS separates structure from visual skin. SMACSS groups rules into base, layout, module, state, and theme categories. BEM names blocks, elements, and modifiers explicitly. These are tools, not goals: choose conventions that make ownership, variants, and deletion predictable for the team.

Sass mixins emit reusable declarations; `@extend` combines selectors. Both can reduce repetition but may also create hidden coupling. Modern CSS custom properties, layers, nesting, and component-scoped styles often solve the same problems more transparently.

## Design systems

A design system should encode recurring decisions through tokens and accessible primitives. Extract shared components only after real consumers demonstrate a stable boundary. Component libraries can accelerate delivery, but teams still own semantics, interaction, content, and testing.

## Accessibility baseline

- Start with semantic HTML and native controls.
- Ensure all actions work with a keyboard and have visible focus.
- Associate labels, instructions, and errors with their fields.
- Move focus deliberately after route changes or failed submissions.
- Respect reduced-motion preferences and sufficient contrast.
- Test with browser automation and assistive technology; automated checks cannot prove full accessibility.

Design reviews should examine comprehension, hierarchy, touch targets, responsive behavior, empty/error/loading states, and whether the interface helps users recover.

Further reading: [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
