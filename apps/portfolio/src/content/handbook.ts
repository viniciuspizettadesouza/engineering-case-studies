import GithubSlugger from 'github-slugger'
import architectureContent from './handbook/architecture-and-patterns.md?raw'
import cssContent from './handbook/css-and-ui.md?raw'
import toolingContent from './handbook/developer-tooling.md?raw'
import graphqlContent from './handbook/graphql-and-messaging.md?raw'
import interviewContent from './handbook/interview-strategy.md?raw'
import javascriptContent from './handbook/javascript.md?raw'
import reactContent from './handbook/react.md?raw'
import leadershipContent from './handbook/technical-leadership.md?raw'
import exercisesContent from './handbook/technical-exercises.md?raw'
import deliveryContent from './handbook/testing-delivery-and-devops.md?raw'
import typescriptContent from './handbook/typescript.md?raw'
import vueContent from './handbook/vue.md?raw'
import performanceContent from './handbook/web-performance-and-seo.md?raw'

export const handbookCategories = [
  'Career',
  'Frontend foundations',
  'Systems',
  'Delivery',
  'Practice',
] as const

export type HandbookCategory = (typeof handbookCategories)[number]

export interface HandbookHeading {
  readonly depth: 2 | 3
  readonly title: string
  readonly id: string
}

export interface HandbookTopic {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly category: HandbookCategory
  readonly keywords: readonly string[]
  readonly order: number
  readonly content: string
  readonly headings: readonly HandbookHeading[]
}

type TopicDefinition = Omit<HandbookTopic, 'headings'>

function plainHeading(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim()
}

export function extractMarkdownHeadings(
  markdown: string,
): readonly HandbookHeading[] {
  const headings: HandbookHeading[] = []
  const slugger = new GithubSlugger()
  let fence: '`' | '~' | undefined

  for (const line of markdown.split('\n')) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      const markerSource = fenceMatch[1]
      if (!markerSource) continue
      const marker = markerSource.charAt(0) as '`' | '~'
      fence = fence === marker ? undefined : (fence ?? marker)
      continue
    }

    if (fence) continue

    const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/)
    if (!headingMatch) continue

    const hashes = headingMatch[1]
    const rawTitle = headingMatch[2]
    if (!hashes || !rawTitle) continue
    const title = plainHeading(rawTitle)
    headings.push({
      depth: hashes.length as 2 | 3,
      title,
      id: slugger.slug(title),
    })
  }

  return headings
}

const topicDefinitions: readonly TopicDefinition[] = [
  {
    slug: 'interview-strategy',
    title: 'Interview Strategy and Team Evaluation',
    summary:
      'Evaluate roles, teams, technical culture, business health, and your own evidence with better questions.',
    category: 'Career',
    keywords: ['interview', 'career', 'culture', 'remote work', 'red flags'],
    order: 1,
    content: interviewContent,
  },
  {
    slug: 'javascript',
    title: 'JavaScript Foundations',
    summary:
      'Values, scope, prototypes, asynchronous execution, events, collections, and everyday language patterns.',
    category: 'Frontend foundations',
    keywords: ['event loop', 'closures', 'promises', 'objects', 'arrays'],
    order: 2,
    content: javascriptContent,
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    summary:
      'Model reliable contracts with inference, unions, generics, narrowing, and deliberate runtime validation.',
    category: 'Frontend foundations',
    keywords: ['types', 'interfaces', 'generics', 'strict', 'type safety'],
    order: 3,
    content: typescriptContent,
  },
  {
    slug: 'react',
    title: 'React',
    summary:
      'State placement, effects, composition, hooks, performance, and practical component design.',
    category: 'Frontend foundations',
    keywords: ['hooks', 'state', 'effects', 'memoization', 'components'],
    order: 4,
    content: reactContent,
  },
  {
    slug: 'css-and-ui',
    title: 'CSS, UI Architecture, and Accessibility',
    summary:
      'Layout, style organization, design-system boundaries, and an accessible interface baseline.',
    category: 'Frontend foundations',
    keywords: ['css', 'scss', 'bem', 'design systems', 'accessibility'],
    order: 5,
    content: cssContent,
  },
  {
    slug: 'vue',
    title: 'Vue',
    summary:
      'Current application setup, lifecycle concepts, composables, integration, and template security.',
    category: 'Frontend foundations',
    keywords: ['vue 2', 'vue 3', 'composition api', 'lifecycle'],
    order: 6,
    content: vueContent,
  },
  {
    slug: 'architecture-and-patterns',
    title: 'Architecture and Design Patterns',
    summary:
      'System boundaries, API contracts, persistence, frontend data flow, integration styles, and patterns used in proportion to risk.',
    category: 'Systems',
    keywords: [
      'architecture',
      'microservices',
      'mvvm',
      'mvi',
      'design patterns',
      'cqrs',
      'event sourcing',
      'idempotency',
      'uuid',
      'databases',
      'http',
      'api design',
      'pagination',
      'transactions',
      'indexes',
      'migrations',
      'backups',
    ],
    order: 7,
    content: architectureContent,
  },
  {
    slug: 'web-performance-and-seo',
    title: 'Web Performance and SEO',
    summary:
      'Current web metrics, practical performance work, rendering, metadata, and discoverability.',
    category: 'Systems',
    keywords: [
      'core web vitals',
      'inp',
      'lcp',
      'seo',
      'code splitting',
      'http 2',
      'http 3',
    ],
    order: 8,
    content: performanceContent,
  },
  {
    slug: 'graphql-and-messaging',
    title: 'GraphQL and Messaging',
    summary:
      'GraphQL operational controls, real-time browser communication, and a semantics-first comparison of event logs and message brokers.',
    category: 'Systems',
    keywords: [
      'graphql',
      'sse',
      'server-sent events',
      'websockets',
      'kafka',
      'rabbitmq',
      'pub sub',
      'queues',
    ],
    order: 9,
    content: graphqlContent,
  },
  {
    slug: 'testing-delivery-and-devops',
    title: 'Testing, Delivery, and DevOps',
    summary:
      'Test boundaries, application security, code quality, continuous delivery, observability, reliability, and operations.',
    category: 'Delivery',
    keywords: [
      'testing',
      'ci cd',
      'devops',
      'quality',
      'priority',
      'adr',
      'cyclomatic complexity',
      'ai review',
      'security',
      'authentication',
      'authorization',
      'observability',
      'slo',
      'incident response',
    ],
    order: 10,
    content: deliveryContent,
  },
  {
    slug: 'developer-tooling',
    title: 'Developer Tooling and Command-Line Reference',
    summary:
      'A safe, compact reference for Git, package maintenance, editors, local environments, and pipelines.',
    category: 'Delivery',
    keywords: [
      'git',
      'npm',
      'pnpm',
      'terminal',
      'editor',
      'daily commands',
      'command reference',
    ],
    order: 11,
    content: toolingContent,
  },
  {
    slug: 'technical-exercises',
    title: 'Frontend Technical Exercises',
    summary:
      'Nineteen JavaScript, React, asynchronous, and TypeScript exercises with discussion prompts.',
    category: 'Practice',
    keywords: ['exercises', 'javascript', 'react', 'typescript', 'debugging'],
    order: 12,
    content: exercisesContent,
  },
  {
    slug: 'technical-leadership',
    title: 'Technical Leadership',
    summary:
      'Engineering judgment, mentoring, product partnership, metrics, and a contextual 30–60–90 day approach.',
    category: 'Career',
    keywords: ['tech lead', 'leadership', 'mentoring', 'rfc', 'metrics'],
    order: 13,
    content: leadershipContent,
  },
]

export const handbookTopics: readonly HandbookTopic[] = topicDefinitions
  .map((topic) => ({
    ...topic,
    headings: extractMarkdownHeadings(topic.content),
  }))
  .sort((left, right) => left.order - right.order)

export function getHandbookTopic(slug: string | undefined) {
  return handbookTopics.find((topic) => topic.slug === slug)
}

export interface HandbookSearchResult {
  readonly topic: HandbookTopic
  readonly matchingHeading?: HandbookHeading
  readonly score: number
}

function searchableMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*(`{3,}|~{3,})[\s\S]*?^\s*\1.*$/gm, ' ')
    .replace(/[`*_#[\]()]/g, ' ')
    .toLocaleLowerCase()
}

export function searchHandbook(query: string): readonly HandbookSearchResult[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)

  if (terms.length === 0) return []

  return handbookTopics
    .map((topic): HandbookSearchResult | undefined => {
      const title = topic.title.toLocaleLowerCase()
      const summary = topic.summary.toLocaleLowerCase()
      const category = topic.category.toLocaleLowerCase()
      const keywords = topic.keywords.join(' ').toLocaleLowerCase()
      const body = searchableMarkdown(topic.content)
      const matchingHeading = topic.headings.find((heading) =>
        terms.every((term) => heading.title.toLocaleLowerCase().includes(term)),
      )

      const termScores = terms.map(
        (term) =>
          (title.includes(term) ? 8 : 0) +
          (matchingHeading ? 6 : 0) +
          (keywords.includes(term) ? 4 : 0) +
          (category.includes(term) ? 3 : 0) +
          (summary.includes(term) ? 2 : 0) +
          (body.includes(term) ? 1 : 0),
      )

      if (termScores.some((score) => score === 0)) return undefined
      const score = termScores.reduce(
        (total, termScore) => total + termScore,
        0,
      )

      return score > 0 ? { topic, matchingHeading, score } : undefined
    })
    .filter((result): result is HandbookSearchResult => result !== undefined)
    .sort(
      (left, right) =>
        right.score - left.score || left.topic.order - right.topic.order,
    )
}
