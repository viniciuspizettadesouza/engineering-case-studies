import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import { Link } from 'react-router-dom'
import { getHandbookTopic } from '../../content/handbook'
import { studyRoadmapStages } from '../roadmap/study-roadmap'

export function StudyRoadmapPage() {
  return (
    <Container>
      <section className="py-16 sm:py-20">
        <Eyebrow>Study roadmap</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
          A guided path through the engineering handbook.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Follow the sequence from frontend foundations to career growth, or
          open any topic when it is useful. The roadmap organizes the canonical
          handbook without changing your adaptive review schedule.
        </p>

        <ol className="mt-12 space-y-10">
          {studyRoadmapStages.map((stage, stageIndex) => (
            <li
              className="relative border-l-2 border-teal-200 pl-8 sm:pl-12 dark:border-teal-900"
              key={stage.id}
            >
              <span
                aria-hidden="true"
                className="absolute -left-5 top-0 flex size-10 items-center justify-center rounded-full bg-teal-700 font-semibold text-white ring-4 ring-white dark:ring-slate-950"
              >
                {stageIndex + 1}
              </span>
              <section aria-labelledby={`roadmap-stage-${stage.id}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                  Stage {stageIndex + 1}
                </p>
                <h2
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white"
                  id={`roadmap-stage-${stage.id}`}
                >
                  {stage.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
                  {stage.description}
                </p>

                <ul className="mt-6 grid gap-5 lg:grid-cols-2">
                  {stage.topicSlugs.map((slug) => {
                    const topic = getHandbookTopic(slug)
                    if (!topic) return null

                    return (
                      <li
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        key={topic.slug}
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
                          {topic.category}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                          <Link
                            className="rounded-sm outline-offset-4 hover:text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600 dark:hover:text-teal-300"
                            to={`/handbook/${topic.slug}`}
                          >
                            {topic.title}
                          </Link>
                        </h3>
                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                          {topic.summary}
                        </p>
                        <h4 className="mt-6 text-sm font-semibold text-slate-950 dark:text-white">
                          Sections
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm">
                          {topic.headings
                            .filter((heading) => heading.depth === 2)
                            .map((heading) => (
                              <li key={heading.id}>
                                <Link
                                  className="inline-flex min-h-8 items-center rounded-sm text-slate-600 outline-offset-2 hover:text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-300 dark:hover:text-teal-300"
                                  to={`/handbook/${topic.slug}#${heading.id}`}
                                >
                                  {heading.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </section>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  )
}
