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

  const isFinancialStudy = study.slug === 'financial-operations-platform'
  const isCommerceStudy = study.slug === 'commerce-experience'
  const isTransitStudy = study.slug === 'accessible-transit-platform'
  const isCatalogueStudy = study.slug === 'modular-enterprise-workspace'
  const statusLabel =
    study.status === 'complete'
      ? 'Complete'
      : study.status === 'in-progress'
        ? 'In progress'
        : study.status === 'next'
          ? 'Building next'
          : 'Planned'

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
            <Tag>{statusLabel}</Tag>
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-7xl dark:text-white">
            {study.title}
          </h1>
          <p className="mt-7 text-xl leading-9 text-slate-600 dark:text-slate-300">
            {study.summary}
          </p>
        </div>

        {isFinancialStudy ? (
          <section
            aria-labelledby="prototype-heading"
            className="mt-12 rounded-2xl border border-teal-300 bg-teal-50 p-6 dark:border-teal-800 dark:bg-teal-950/30"
          >
            <Eyebrow>Executable prototype</Eyebrow>
            <h2
              className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
              id="prototype-heading"
            >
              Submit and review a fictional application
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
              Complete both applicant steps, submit for verification, then open
              the separate agent view to inspect every field.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-600 dark:bg-teal-500 dark:text-slate-950"
                to="/case-studies/financial-operations-platform/apply/personal"
              >
                Start application
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-lg border border-teal-700 px-5 py-2.5 font-semibold text-teal-800 outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-teal-400 dark:text-teal-200"
                to="/case-studies/financial-operations-platform/operations"
              >
                Open agent dashboard
              </Link>
            </div>
          </section>
        ) : null}

        {isCommerceStudy ? (
          <section
            aria-labelledby="commerce-prototype-heading"
            className="mt-12 rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30"
          >
            <Eyebrow>Executable prototype</Eyebrow>
            <h2
              className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
              id="commerce-prototype-heading"
            >
              Find and reserve a fictional vehicle
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
              Filter the catalogue, inspect availability, enter fictional
              reservation details, review the request and simulate submission.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-amber-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-amber-700 dark:bg-amber-400 dark:text-slate-950"
              to="/case-studies/commerce-experience/vehicles"
            >
              Browse fictional vehicles
            </Link>
          </section>
        ) : null}

        {isTransitStudy ? (
          <section
            aria-labelledby="transit-prototype-heading"
            className="mt-12 rounded-2xl border border-green-300 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30"
          >
            <Eyebrow>Executable prototype</Eyebrow>
            <h2
              className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
              id="transit-prototype-heading"
            >
              Purchase a fictional transport ticket
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
              Switch invented operators, plan a journey, compare explained
              fares, enter minimal passenger details and simulate ticket
              confirmation.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-green-800 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-green-700 dark:bg-green-300 dark:text-slate-950"
              to="/case-studies/accessible-transit-platform/tickets/mossline/plan"
            >
              Plan a fictional journey
            </Link>
          </section>
        ) : null}

        {isCatalogueStudy ? (
          <section
            aria-labelledby="catalogue-prototype-heading"
            className="mt-12 rounded-2xl border border-indigo-300 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30"
          >
            <Eyebrow>Executable prototype</Eyebrow>
            <h2
              className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
              id="catalogue-prototype-heading"
            >
              Import a fictional product batch
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
              Switch isolated retail tenants, paste rows or upload CSV, correct
              tenant-specific issues, publish accepted products and export
              rejected rows.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-indigo-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-700 dark:bg-indigo-300 dark:text-slate-950"
              to="/case-studies/modular-enterprise-workspace/catalogue/northstar"
            >
              Open bulk catalogue
            </Link>
          </section>
        ) : null}

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

        {study.status === 'planned' || study.status === 'next' ? (
          <aside className="mt-16 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>Planning state.</strong> This page describes intended scope;
            it does not claim that the executable study has been delivered yet.
          </aside>
        ) : study.status === 'in-progress' ? (
          <aside className="mt-16 rounded-2xl border border-teal-300 bg-teal-50 p-6 text-sm leading-6 text-teal-950 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-100">
            <strong>Incremental delivery.</strong> The submission and
            agent-review slice is executable. Verification decisions and
            production security boundaries remain planned.
          </aside>
        ) : (
          <aside className="mt-16 rounded-2xl border border-teal-300 bg-teal-50 p-6 text-sm leading-6 text-teal-950 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-100">
            <strong>MVP complete.</strong>{' '}
            {isCommerceStudy
              ? 'The catalogue-to-confirmation journey is executable, tested and documented. Real inventory, payments, finance and dealer integrations remain explicitly out of scope.'
              : isTransitStudy
                ? 'The multi-tenant journey-to-ticket workflow is executable, tested and documented. Real routes, fares, payments and ticket fulfilment remain explicitly out of scope.'
                : isCatalogueStudy
                  ? 'The tenant-isolated import-to-publication workflow is executable, tested and documented. Real catalogues, production authentication and external APIs remain explicitly out of scope.'
                  : 'The applicant and agent journeys are executable, tested and documented. Production authentication, external integrations and real credit decisions remain explicitly out of scope.'}
          </aside>
        )}
      </Container>
    </main>
  )
}
