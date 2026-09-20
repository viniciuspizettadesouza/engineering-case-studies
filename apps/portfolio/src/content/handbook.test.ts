import { describe, expect, it } from 'vitest'
import {
  extractMarkdownHeadings,
  getHandbookTopic,
  handbookCategories,
  handbookTopics,
  searchHandbook,
} from './handbook'

describe('handbook content', () => {
  it('provides complete, ordered, unique topic metadata', () => {
    expect(handbookTopics).toHaveLength(13)
    expect(new Set(handbookTopics.map((topic) => topic.slug)).size).toBe(
      handbookTopics.length,
    )
    expect(new Set(handbookTopics.map((topic) => topic.order)).size).toBe(
      handbookTopics.length,
    )

    for (const topic of handbookTopics) {
      expect(topic.content.trim()).not.toBe('')
      expect(topic.content).toContain(`# ${topic.title}`)
      expect(topic.headings.length).toBeGreaterThan(0)
      expect(handbookCategories).toContain(topic.category)
      const introduction = topic.content
        .split('\n')
        .slice(1)
        .find((line) => line.trim())
      expect(introduction).toBeDefined()
      expect(introduction!).not.toMatch(/^#/)
    }
  })

  it('extracts stable headings without indexing fenced code', () => {
    const markdown = `# Title

## First section

\`\`\`bash
## Not a heading
\`\`\`

### Repeated heading
### Repeated heading
`

    expect(extractMarkdownHeadings(markdown)).toEqual([
      { depth: 2, title: 'First section', id: 'first-section' },
      { depth: 3, title: 'Repeated heading', id: 'repeated-heading' },
      { depth: 3, title: 'Repeated heading', id: 'repeated-heading-1' },
    ])
  })

  it('finds topics from titles, headings, keywords, and body content', () => {
    expect(searchHandbook('event loop')[0]?.topic.slug).toBe('javascript')
    expect(searchHandbook('Core Web Vitals')[0]?.topic.slug).toBe(
      'web-performance-and-seo',
    )
    expect(searchHandbook('mentoring')[0]?.topic.slug).toBe(
      'technical-leadership',
    )
    expect(searchHandbook('')).toEqual([])
    expect(searchHandbook('term-that-does-not-exist')).toEqual([])
  })

  it('indexes the failure-driven scaling guide and its stable headings', () => {
    const topic = getHandbookTopic('architecture-and-patterns')
    expect(topic).toBeDefined()
    expect(topic!.headings).toEqual(
      expect.arrayContaining([
        {
          depth: 2,
          title: 'Scaling from observed bottlenecks',
          id: 'scaling-from-observed-bottlenecks',
        },
        {
          depth: 3,
          title: 'Start simple and scale the application',
          id: 'start-simple-and-scale-the-application',
        },
        {
          depth: 3,
          title: 'Make horizontally scaled servers stateless',
          id: 'make-horizontally-scaled-servers-stateless',
        },
        {
          depth: 3,
          title: 'Scale database access',
          id: 'scale-database-access',
        },
        {
          depth: 3,
          title: 'Cache repeated expensive reads',
          id: 'cache-repeated-expensive-reads',
        },
        {
          depth: 3,
          title: 'Move deferrable work to a queue',
          id: 'move-deferrable-work-to-a-queue',
        },
        {
          depth: 3,
          title: 'Shard only after simpler options are exhausted',
          id: 'shard-only-after-simpler-options-are-exhausted',
        },
        {
          depth: 3,
          title: 'Production refinements beyond the video',
          id: 'production-refinements-beyond-the-video',
        },
      ]),
    )

    for (const query of [
      'connection pooling',
      'replication lag',
      'background jobs',
      'sharding',
    ]) {
      expect(searchHandbook(query)[0]?.topic.slug).toBe(
        'architecture-and-patterns',
      )
    }
  })

  it('looks up a topic by slug', () => {
    expect(getHandbookTopic('react')?.title).toBe('React')
    expect(getHandbookTopic('missing')).toBeUndefined()
  })

  it('keeps technical exercises at one consistent structural level', () => {
    const topic = getHandbookTopic('technical-exercises')
    expect(topic).toBeDefined()

    const exercises = topic!.headings.filter((heading) => heading.depth === 2)
    expect(exercises).toHaveLength(19)
    expect(
      exercises.map((heading) => Number.parseInt(heading.title, 10)),
    ).toEqual(Array.from({ length: 19 }, (_, index) => index + 1))
    expect(exercises.map((heading) => heading.title).join(' ')).not.toMatch(
      /[🕰🧪🧑🎠❓✅]/u,
    )
    expect(
      topic!.headings.filter(
        (heading) => heading.depth === 3 && heading.title === 'Prompt',
      ),
    ).toHaveLength(19)
    expect(topic!.content).not.toMatch(/Questions \(Q\d+\)|Answers \(Q\d+\)/)
  })
})
