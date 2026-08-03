import {
  Container,
  Eyebrow,
  Tag,
} from '@engineering-case-studies/design-system'
import { CaseStudyCard } from './case-study-card'
import { caseStudies } from '../content/case-studies'
import { repositoryUrl } from '../content/project-links'
import { Link } from 'react-router-dom'

const principles = [
  [
    'Executable',
    'Each study contains one focused workflow that can be explored and tested.',
  ],
  [
    'Transparent',
    'Architecture decisions, constraints and trade-offs will be documented alongside the code.',
  ],
  [
    'Responsible',
    'Every organisation, user, metric and business rule is invented for this portfolio.',
  ],
] as const

export function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        <div
          className="hero-grid absolute inset-0 -z-10 opacity-50"
          aria-hidden="true"
        />
        <Container>
          <div className="max-w-5xl">
            <Eyebrow>Career systems, rebuilt in the open</Eyebrow>
            <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-7xl lg:text-[6.5rem] dark:text-white">
              Engineering lessons made{' '}
              <span className="text-teal-700 dark:text-teal-300">
                executable.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
              A focused collection of fictional products exploring financial
              workflows, commerce, accessible transport, multi-tenant platforms
              and responsible retail analytics.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Tag>React + TypeScript</Tag>
              <Tag>Architecture</Tag>
              <Tag>Accessibility</Tag>
              <Tag>Product thinking</Tag>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600"
                to="/#case-studies"
              >
                Explore the studies
              </Link>
              <a
                className="inline-flex min-h-11 items-center rounded-lg border border-slate-400 px-5 py-2.5 font-semibold text-slate-800 outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-100"
                href={repositoryUrl}
              >
                Inspect the source
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="purpose-heading"
        className="border-y border-slate-200 bg-white/60 py-16 sm:py-20 dark:border-slate-800 dark:bg-slate-900/40"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Project intent</Eyebrow>
              <h2
                id="purpose-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
              >
                More than interface replicas.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {principles.map(([title, description]) => (
                <div key={title}>
                  <h3 className="font-semibold text-slate-950 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="case-studies"
        aria-labelledby="studies-heading"
        className="scroll-mt-8 py-20 sm:py-28"
      >
        <Container>
          <div className="mb-14 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <Eyebrow>Completed collection</Eyebrow>
              <h2
                id="studies-heading"
                className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white"
              >
                Five products. Five focused MVPs.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600 md:justify-self-end dark:text-slate-300">
              Each product delivers one complete end-to-end workflow. The MVPs
              remain intentionally small so the architecture, accessibility,
              tests and trade-offs are easy to inspect.
            </p>
          </div>
          <div>
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="boundary-heading" className="pb-20 sm:pb-28">
        <Container>
          <div className="rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-12 sm:py-14 dark:bg-slate-900">
            <Eyebrow className="text-teal-300">A clear boundary</Eyebrow>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <h2
                id="boundary-heading"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Experience informs the questions—not the implementation.
              </h2>
              <p className="max-w-2xl leading-7 text-slate-300 lg:justify-self-end">
                These studies contain no employer code, branding, screenshots,
                customer data, internal documentation or private architecture.
                Their purpose is to demonstrate how I reason today.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
