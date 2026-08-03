import {
  Container,
  Eyebrow,
  Tag,
} from '@engineering-case-studies/design-system'
import { Link, useParams } from 'react-router-dom'
import { getCaseStudy } from '../content/case-studies'

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  if (!study) {
    return (
      <main id="main-content" tabIndex={-1}>
        <Container className="py-24">
          <Eyebrow>404 / Not found</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            This study does not exist.
          </h1>
          <Link
            className="mt-8 inline-block font-semibold text-teal-700 underline underline-offset-4 dark:text-teal-300"
            to="/"
          >
            Return to the collection
          </Link>
        </Container>
      </main>
    )
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <Container className="py-16 sm:py-24">
        <Link
          className="rounded-sm text-sm font-medium text-slate-600 outline-offset-4 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-300 dark:hover:text-teal-300"
          to="/"
        >
          ← All case studies
        </Link>
        <div className="mt-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>
              {study.domain} / {study.period}
            </Eyebrow>
            <Tag>{study.status === 'next' ? 'Building next' : 'Planned'}</Tag>
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-7xl dark:text-white">
            {study.title}
          </h1>
          <p className="mt-7 text-xl leading-9 text-slate-600 dark:text-slate-300">
            {study.summary}
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-slate-300 pt-12 lg:grid-cols-2 dark:border-slate-700">
          <section aria-labelledby="intent-heading">
            <Eyebrow>What this will explore</Eyebrow>
            <h2 id="intent-heading" className="sr-only">
              Study intent
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              {study.narrative}
            </p>
            <ul className="mt-7 flex flex-wrap gap-3" aria-label="Capabilities">
              {study.capabilities.map((capability) => (
                <li key={capability}>
                  <Tag>{capability}</Tag>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="workflow-heading">
            <Eyebrow>Executable workflow</Eyebrow>
            <h2 id="workflow-heading" className="sr-only">
              Planned executable workflow
            </h2>
            <ol className="mt-5 space-y-3">
              {study.workflow.map((step, index) => (
                <li
                  className="flex items-center gap-4 border-b border-slate-200 pb-3 text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  key={step}
                >
                  <span className="font-mono text-xs text-teal-700 dark:text-teal-300">
                    0{index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="mt-16 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>Planning state.</strong> This page describes intended scope;
          it does not claim that the executable study has been delivered yet.
        </aside>
      </Container>
    </main>
  )
}
