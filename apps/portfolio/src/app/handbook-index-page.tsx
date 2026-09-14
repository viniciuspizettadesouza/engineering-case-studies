import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Eyebrow,
  Tag,
} from '@engineering-case-studies/design-system'
import {
  handbookCategories,
  handbookTopics,
  searchHandbook,
} from '../content/handbook'

export function HandbookIndexPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchHandbook(query), [query])
  const searching = query.trim().length > 0

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="border-b border-slate-200 py-16 sm:py-24 dark:border-slate-800">
        <Container>
          <Eyebrow>Engineering handbook</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
            Practical notes for building, evaluating, and leading software.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A curated reference covering frontend foundations, architecture,
            delivery, technical leadership, and interview preparation. The
            content is maintained as Markdown and rendered directly by this
            site.
          </p>
          <div className="mt-8 max-w-2xl">
            <label
              className="block font-semibold text-slate-900 dark:text-white"
              htmlFor="handbook-search"
            >
              Search the handbook
            </label>
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-slate-400 bg-white px-4 text-slate-950 outline-offset-2 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              id="handbook-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “event loop”, “accessibility”, or “leadership”"
              type="search"
              value={query}
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          {searching ? (
            <div>
              <p
                aria-live="polite"
                className="text-slate-600 dark:text-slate-300"
              >
                {results.length === 0
                  ? `No topics found for “${query.trim()}”.`
                  : `${results.length} ${results.length === 1 ? 'topic' : 'topics'} found.`}
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {results.map(({ topic, matchingHeading }) => (
                  <TopicCard
                    key={topic.slug}
                    topic={topic}
                    context={
                      matchingHeading
                        ? `Matching section: ${matchingHeading.title}`
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {handbookCategories.map((category) => {
                const topics = handbookTopics.filter(
                  (topic) => topic.category === category,
                )
                if (topics.length === 0) return null

                return (
                  <section
                    aria-labelledby={`category-${category}`}
                    key={category}
                  >
                    <h2
                      className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white"
                      id={`category-${category}`}
                    >
                      {category}
                    </h2>
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      {topics.map((topic) => (
                        <TopicCard key={topic.slug} topic={topic} />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}

interface TopicCardProps {
  readonly topic: (typeof handbookTopics)[number]
  readonly context?: string
}

function TopicCard({ topic, context }: TopicCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Tag>{topic.category}</Tag>
      <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">
        <Link
          className="rounded-sm outline-offset-4 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:hover:text-teal-300"
          to={`/handbook/${topic.slug}`}
        >
          {topic.title}
        </Link>
      </h3>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
        {topic.summary}
      </p>
      {context ? (
        <p className="mt-4 text-sm font-medium text-teal-700 dark:text-teal-300">
          {context}
        </p>
      ) : null}
    </article>
  )
}
