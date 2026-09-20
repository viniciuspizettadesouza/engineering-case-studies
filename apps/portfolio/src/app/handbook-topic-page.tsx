import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { getHandbookTopic, handbookTopics } from '../content/handbook'

export function HandbookTopicPage() {
  const { slug } = useParams()
  const location = useLocation()
  const topic = getHandbookTopic(slug)

  useEffect(() => {
    if (!topic || !location.hash) return

    let headingId = location.hash.slice(1)
    try {
      headingId = decodeURIComponent(headingId)
    } catch {
      return
    }

    document.getElementById(headingId)?.scrollIntoView?.({ block: 'start' })
  }, [location.hash, topic])

  if (!topic) {
    return (
      <main className="py-20" id="main-content" tabIndex={-1}>
        <Container>
          <Eyebrow>Handbook</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            Topic not found
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            The requested handbook topic does not exist.
          </p>
          <Link
            className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600"
            to="/handbook"
          >
            Browse the handbook
          </Link>
        </Container>
      </main>
    )
  }

  const topicIndex = handbookTopics.indexOf(topic)
  const previous = handbookTopics[topicIndex - 1]
  const next = handbookTopics[topicIndex + 1]

  return (
    <main id="main-content" tabIndex={-1}>
      <Container className="py-12 sm:py-16">
        <Link
          className="rounded-sm text-sm font-semibold text-teal-700 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-teal-300"
          to="/handbook"
        >
          ← All handbook topics
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
          <article className="handbook-prose min-w-0">
            <ReactMarkdown
              components={{
                pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
                table: ({ children }) => (
                  <div
                    aria-label="Scrollable data table"
                    className="handbook-table-scroll"
                    role="group"
                    tabIndex={0}
                  >
                    <table>{children}</table>
                  </div>
                ),
              }}
              rehypePlugins={[rehypeSlug]}
              remarkPlugins={[remarkGfm]}
            >
              {topic.content}
            </ReactMarkdown>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-950 dark:text-white">
              On this page
            </h2>
            <nav aria-label="On this page" className="mt-4">
              <ol className="space-y-2 text-sm">
                {topic.headings.map((heading) => (
                  <li
                    className={heading.depth === 3 ? 'pl-4' : undefined}
                    key={heading.id}
                  >
                    <button
                      className="cursor-pointer rounded-sm border-0 bg-transparent p-0 text-left text-slate-600 outline-offset-2 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-300 dark:hover:text-teal-300"
                      onClick={() =>
                        document
                          .getElementById(heading.id)
                          ?.scrollIntoView({ block: 'start' })
                      }
                      type="button"
                    >
                      {heading.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <nav
          aria-label="Handbook pagination"
          className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800"
        >
          {previous ? (
            <Link
              aria-label={`Previous: ${previous.title}`}
              className="rounded-xl border border-slate-300 p-5 outline-offset-4 hover:border-teal-600 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-700"
              to={`/handbook/${previous.slug}`}
            >
              <span className="block text-sm text-slate-500 dark:text-slate-400">
                Previous
              </span>
              <span className="mt-1 block font-semibold text-slate-950 dark:text-white">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              aria-label={`Next: ${next.title}`}
              className="rounded-xl border border-slate-300 p-5 text-right outline-offset-4 hover:border-teal-600 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-700"
              to={`/handbook/${next.slug}`}
            >
              <span className="block text-sm text-slate-500 dark:text-slate-400">
                Next
              </span>
              <span className="mt-1 block font-semibold text-slate-950 dark:text-white">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </Container>
    </main>
  )
}
