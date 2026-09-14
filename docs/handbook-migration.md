# Handbook Migration Report

## Outcome

The standalone frontend guide was imported as rewritten, sanitized ancestry and
curated into the English-language Engineering Handbook. The destination's
original eleven commits remain unchanged. The guide's eleven commits have
sanitized counterparts with their authors, dates, subjects, and order retained;
hashes changed because paths and sensitive text changed.

The original local checkout remains the rollback copy. No unsafe original
object identifiers or identifier denylist are published here.

## Content coverage

| Source area                                                              | Destination                                  | Treatment                                             |
| ------------------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------- |
| Strategic interview questions, role context, culture, business and terms | Interview Strategy and Team Evaluation       | Translated, merged and reframed as two-way evaluation |
| Adaptability, remote work and technical warning signs                    | Interview Strategy and Team Evaluation       | Translated, deduplicated and qualified                |
| JavaScript questions and concept notes                                   | JavaScript Foundations                       | Consolidated and technically corrected                |
| TypeScript concepts and temperature example                              | TypeScript                                   | Consolidated and technically corrected                |
| React concepts, lifecycle and performance notes                          | React                                        | Consolidated and updated for current React            |
| CSS, Sass and organization methodologies                                 | CSS, UI Architecture, and Accessibility      | Consolidated with accessibility guidance              |
| Vue lifecycle, reuse and security                                        | Vue                                          | Corrected for Vue 2 and Vue 3                         |
| System architecture, frontend models and design patterns                 | Architecture and Design Patterns             | Consolidated and made technology-neutral              |
| Core Web Vitals, rendering, optimization and SEO                         | Web Performance and SEO                      | Updated and linked to primary references              |
| GraphQL controls, event streaming, queues and pub/sub                    | GraphQL and Messaging                        | Consolidated and corrected                            |
| Testing, code standards, delivery, DevOps, builds and priority           | Testing, Delivery, and DevOps                | Consolidated and qualified                            |
| Ubuntu, Git, editor, package and command-line notes                      | Developer Tooling and Command-Line Reference | Consolidated with safety guidance                     |
| JavaScript and React questions 1–19 and challenge themes                 | Frontend Technical Exercises                 | Retained, renamed and corrected where necessary       |
| Technical-lead responsibilities and 30–60–90 day notes                   | Technical Leadership                         | De-attributed, translated and made contextual         |

## Intentional removals

- interview-source organization names, challenge branding, and associated links;
- private or interview-specific personal attribution;
- internal-looking branch and ticket identifiers;
- credential-like text;
- duplicate wording after its unique meaning was retained elsewhere;
- obsolete claims replaced by current, sourced explanations.

## Verification contract

- Every reachable imported revision is scanned with an external uncommitted
  denylist before merge.
- Canonical Markdown is the only handbook content source used by the application.
- Registry tests require non-empty content, unique slugs and order values, valid
  categories, and at least one extracted section per topic.
- Existing case-study routes and the `/engineering-case-studies/` deployment base
  path remain unchanged.
