import { getHandbookTopic } from '../../content/handbook'
import type { StudyCardDefinition } from '../domain/study'

const exerciseCards: readonly StudyCardDefinition[] = (
  [
    [
      'objects-with-const',
      'Why can a property of an object declared with const still change?',
      'const prevents rebinding the variable; it does not freeze the referenced object. Object properties remain mutable unless the object is frozen or treated immutably.',
    ],
    [
      'block-scope-let',
      'Why does reading a let variable outside its if block throw?',
      'let is block-scoped. The binding exists only inside the block where it was declared, so the outer scope cannot resolve it.',
    ],
    [
      'hoisting-var-const',
      'What happens when var and const are read before their declarations?',
      'A var binding is hoisted and initialized to undefined. A const binding is hoisted but remains in the temporal dead zone, so reading it throws a ReferenceError.',
    ],
    [
      'function-hoisting',
      'Why can a function declaration be called before its source line but a const arrow function cannot?',
      'Function declarations are initialized during environment setup. A const binding is uninitialized until its declaration executes, even when its eventual value is a function.',
    ],
    [
      'arrow-constructor',
      'Why does new fail with an arrow function?',
      'Arrow functions have no [[Construct]] capability or prototype property. Use a constructable function/class, or call an arrow factory without new.',
    ],
    [
      'arrow-this',
      'How does this differ between an arrow and a regular object method?',
      'An arrow captures this lexically from its surrounding scope. A regular method receives this from its call site, so obj.method() binds obj.',
    ],
    [
      'missing-props',
      'Why can destructuring a component parameter fail when the component is called directly?',
      'Calling the function without an argument makes the parameter undefined, and destructuring undefined throws. React normally supplies a props object when rendering a component.',
    ],
    [
      'missing-hook-import',
      'What should you check when a React hook produces a “not defined” error?',
      'Verify that the hook is imported from React (or its defining module) and called inside a component or custom hook. A missing identifier fails before hook semantics matter.',
    ],
    [
      'promise-vs-timeout',
      'In the exercise, why do Promise callbacks run before zero-delay timers?',
      'After synchronous code completes, the event loop drains the microtask queue, including Promise reactions, before taking the next timer task. Timers created during a microtask join the timer queue later.',
    ],
    [
      'logger-design',
      'When should a logger be a class instance rather than a plain object?',
      'Use an instance when separate configuration/state, substitution, or lifecycle is useful. A plain object is enough for one stateless shared implementation; the behavior and dependency boundary matter more than syntax.',
    ],
    [
      'tabs-by-city',
      'How should selected tab state be modeled for a city tabs interface?',
      'Store a stable city identifier as the single selected value, render controls from data, and derive the visible panel. Give tabs and panels their required accessible relationships.',
    ],
    [
      'toggle-and-spawn',
      'How can a component update color and append a square safely from previous state?',
      'Use functional state updates when the next value depends on the previous value. Keep stable keys for appended items and avoid mutating the existing array.',
    ],
    [
      'carousel',
      'What state and accessibility concerns belong in a basic carousel?',
      'Track the current slide with bounded or wrapped navigation. Label controls, expose slide position in text, preserve keyboard operation, and avoid forced auto-advance.',
    ],
    [
      'composition-prop-drilling',
      'When can composition reduce prop drilling?',
      'When intermediate components only forward UI, pass a rendered child/slot closer to where data is owned. Context is more appropriate for genuinely shared ambient data.',
    ],
    [
      'memo-callback',
      'When do React.memo and useCallback actually reduce work?',
      'They help when a measured expensive child can skip rendering and its props remain referentially stable. Memoization also costs comparison, memory, and complexity, so it is not automatic.',
    ],
    [
      'render-props-timer',
      'What makes a countdown timer suitable for a render-prop API?',
      'The timer owns reusable state and lifecycle while the caller owns presentation. Cleanup must cancel the interval, and the API should avoid creating needless timers or updates.',
    ],
    [
      'async-hook-cleanup',
      'What should a data-fetching effect do when its component unmounts or inputs change?',
      'Abort obsolete requests with an AbortController and ignore stale completion paths. Cleanup prevents superseded work from updating the current UI and saves resources.',
    ],
    [
      'generic-custom-hook',
      'Why use a generic result type in a reusable data-fetching hook?',
      'The generic carries the caller’s response shape through data and callbacks without using any. Runtime validation is still required because TypeScript does not validate network data.',
    ],
    [
      'debug-custom-hook',
      'What invariants should you inspect when debugging a custom fetching hook?',
      'Check hook-call rules, dependency stability, loading/error transitions, stale-request cleanup, response validation, and whether retries can start a fresh request.',
    ],
  ] as const
).map(([id, prompt, answer], index) => ({
  id: `exercise-${id}`,
  prompt,
  answer,
  topicSlug: 'technical-exercises',
  headingId:
    index === 18 ? '19-debugging-a-custom-hook-usefetchcakests' : undefined,
  category: 'Practice',
  tags: ['technical exercise', 'interview'],
  source: 'interview',
  interviewEvidence: 'asked',
  priority: 'high',
  type: 'exercise',
}))

const conceptCards: readonly StudyCardDefinition[] = [
  {
    id: 'javascript-event-loop-microtasks',
    prompt:
      'How do microtasks and tasks differ in browser event-loop scheduling?',
    answer:
      'After the current stack finishes, microtasks are drained before the browser takes the next task. Promise reactions are microtasks; timers and DOM events normally enqueue tasks. A long microtask chain can delay rendering and other tasks.',
    topicSlug: 'javascript',
    headingId: 'asynchronous-execution',
    category: 'Frontend foundations',
    tags: ['event loop', 'promises'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'comparison',
  },
  {
    id: 'typescript-unknown-vs-any',
    prompt: 'Why is unknown safer than any at a trust boundary?',
    answer:
      'unknown accepts any input but requires narrowing before use. any disables checking and lets unsafe assumptions spread. Validate and narrow unknown data before converting it to a domain type.',
    topicSlug: 'typescript',
    headingId: 'core-tools',
    category: 'Frontend foundations',
    tags: ['typescript', 'narrowing'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'comparison',
  },
  {
    id: 'react-effect-cleanup',
    prompt: 'What problem does React effect cleanup solve?',
    answer:
      'Cleanup releases or cancels work owned by the previous effect—subscriptions, timers, and requests—before rerun or unmount. This prevents stale work, leaks, and races.',
    topicSlug: 'react',
    headingId: 'effects-and-asynchronous-work',
    category: 'Frontend foundations',
    tags: ['react', 'effects'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'scenario',
  },
  {
    id: 'css-hidden-choices',
    prompt: 'Compare display: none, visibility: hidden, and opacity: 0.',
    answer:
      'display: none removes layout and accessibility-tree participation. visibility: hidden preserves layout but hides the element. opacity: 0 keeps layout and can remain interactive/focusable, so it needs additional handling when meant to be unavailable.',
    topicSlug: 'css-and-ui',
    headingId: 'visibility-and-layout',
    category: 'Frontend foundations',
    tags: ['css', 'accessibility'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'comparison',
  },
  {
    id: 'vue-template-security',
    prompt:
      'What is the main security boundary when rendering external HTML in Vue?',
    answer:
      'Treat external HTML as untrusted. Avoid raw HTML rendering when possible; otherwise sanitize with a well-maintained policy before it reaches the template. Escaping interpolation is the safe default.',
    topicSlug: 'vue',
    headingId: 'security-and-integration',
    category: 'Frontend foundations',
    tags: ['vue', 'security'],
    source: 'interview',
    interviewEvidence: 'related',
    priority: 'normal',
    type: 'scenario',
  },
  {
    id: 'architecture-observer-pattern',
    prompt:
      'When does the Observer pattern help, and what is its main operational risk?',
    answer:
      'Observer decouples publishers from multiple subscribers for in-process notifications. Hidden control flow, ordering, reentrancy, and forgotten unsubscription can make behavior difficult to reason about.',
    topicSlug: 'architecture-and-patterns',
    headingId: 'object-and-collaboration-patterns',
    category: 'Systems',
    tags: ['observer', 'patterns'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'concept',
  },
  {
    id: 'performance-core-web-vitals',
    prompt: 'What user experiences do LCP, INP, and CLS represent?',
    answer:
      'LCP measures main-content loading, INP measures interaction responsiveness across the visit, and CLS measures unexpected layout movement. Diagnose the specific user experience rather than chasing a combined score.',
    topicSlug: 'web-performance-and-seo',
    headingId: 'core-web-vitals',
    category: 'Systems',
    tags: ['performance', 'web vitals'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'concept',
  },
  {
    id: 'messaging-kafka-rabbitmq',
    prompt: 'When would RabbitMQ redelivery differ from Kafka replay?',
    answer:
      'A broker queue commonly redelivers an unacknowledged message for competing consumption. Kafka retains an ordered log; consumers can reset offsets and replay retained records independently.',
    topicSlug: 'graphql-and-messaging',
    headingId: 'kafka-and-rabbitmq',
    category: 'Systems',
    tags: ['kafka', 'rabbitmq'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'comparison',
  },
  {
    id: 'testing-boundaries',
    prompt:
      'How should unit, integration, and end-to-end tests divide confidence?',
    answer:
      'Unit tests isolate fast domain behavior, integration tests verify meaningful boundaries, and E2E tests cover a small set of critical user journeys. Choose the cheapest level that can detect the target risk.',
    topicSlug: 'testing-delivery-and-devops',
    headingId: 'test-strategy',
    category: 'Delivery',
    tags: ['testing'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'comparison',
  },
  {
    id: 'tooling-git-amend',
    prompt: 'When is git commit --amend safe, and what changes after pushing?',
    answer:
      'Amend is straightforward for an unpublished local commit. It creates a new commit ID; after publishing, updating the branch rewrites shared history and requires explicit coordination and a guarded force push.',
    topicSlug: 'developer-tooling',
    headingId: 'git-identity-and-configuration',
    category: 'Delivery',
    tags: ['git', 'safety'],
    source: 'interview',
    interviewEvidence: 'related',
    priority: 'normal',
    type: 'scenario',
  },
  {
    id: 'leadership-tradeoffs',
    prompt: 'What makes a technical trade-off decision credible?',
    answer:
      'State the goal and constraints, compare viable options against explicit criteria, record risks and reversibility, involve affected people, and define evidence that would trigger revisiting the choice.',
    topicSlug: 'technical-leadership',
    headingId: 'core-responsibilities',
    category: 'Career',
    tags: ['leadership', 'decisions'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'scenario',
  },
  {
    id: 'interview-team-signals',
    prompt:
      'Which questions help reveal whether an engineering team can support good work?',
    answer:
      'Ask how success is measured, how decisions and incidents are handled, what autonomy looks like, why the role is open, and what changed after recent feedback. Seek concrete examples rather than slogans.',
    topicSlug: 'interview-strategy',
    headingId: 'three-questions-to-always-ask',
    category: 'Career',
    tags: ['interview', 'culture'],
    source: 'interview',
    interviewEvidence: 'asked',
    priority: 'high',
    type: 'scenario',
  },
]

export const studyCards = [...exerciseCards, ...conceptCards] as const

export function getStudyCard(id: string) {
  return studyCards.find((card) => card.id === id)
}

export function validateStudyCards(cards: readonly StudyCardDefinition[]) {
  const ids = new Set<string>()
  const errors: string[] = []
  for (const card of cards) {
    if (!card.id || ids.has(card.id))
      errors.push(`Duplicate or empty card id: ${card.id}`)
    ids.add(card.id)
    if (!card.prompt.trim() || !card.answer.trim())
      errors.push(`Card ${card.id} has empty content`)
    const topic = getHandbookTopic(card.topicSlug)
    if (!topic)
      errors.push(`Card ${card.id} has unknown topic ${card.topicSlug}`)
    if (
      card.headingId &&
      !topic?.headings.some((heading) => heading.id === card.headingId)
    )
      errors.push(`Card ${card.id} has unknown heading ${card.headingId}`)
    if (topic && topic.category !== card.category)
      errors.push(`Card ${card.id} has the wrong category`)
  }
  return errors
}
