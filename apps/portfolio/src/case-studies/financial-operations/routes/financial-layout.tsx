import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { financialBasePath } from './route-paths'

interface FinancialLayoutProps {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}

export function FinancialLayout({
  eyebrow,
  title,
  description,
  children,
}: FinancialLayoutProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <Link
            className="font-semibold text-slate-950 outline-offset-4 hover:text-teal-700 dark:text-white dark:hover:text-teal-300"
            to={financialBasePath}
          >
            Fictional Finance Lab
          </Link>
          <nav aria-label="Financial study navigation">
            <ul className="flex gap-5 text-sm font-medium">
              <li>
                <Link
                  className="text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
                  to={`${financialBasePath}/apply/personal`}
                >
                  Apply
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
                  to={`${financialBasePath}/operations`}
                >
                  Agent dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        {children}
      </Container>
    </main>
  )
}
