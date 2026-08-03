import { Tag } from '@engineering-case-studies/design-system'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '../content/case-studies'

interface CaseStudyCardProps {
  readonly study: CaseStudy
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="group relative grid gap-6 border-t border-slate-300 py-8 md:grid-cols-[9rem_1fr_auto] md:items-start dark:border-slate-700">
      <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
        <span aria-hidden="true">{study.sequence}</span>
        <span>{study.period}</span>
      </div>
      <div className="max-w-2xl">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
            {study.domain}
          </p>
          {study.status !== 'planned' ? (
            <Tag>
              {study.status === 'complete'
                ? 'Complete'
                : study.status === 'in-progress'
                  ? 'In progress'
                  : 'Building next'}
            </Tag>
          ) : null}
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          <Link
            className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-teal-600"
            to={`/case-studies/${study.slug}`}
          >
            {study.title}
          </Link>
        </h3>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {study.summary}
        </p>
        <ul
          aria-label="Capabilities"
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400"
        >
          {study.capabilities.map((capability) => (
            <li key={capability}>• {capability}</li>
          ))}
        </ul>
      </div>
      <span
        className="hidden pt-8 text-2xl text-slate-400 transition-transform group-hover:translate-x-1 md:block dark:text-slate-500"
        aria-hidden="true"
      >
        →
      </span>
    </article>
  )
}
