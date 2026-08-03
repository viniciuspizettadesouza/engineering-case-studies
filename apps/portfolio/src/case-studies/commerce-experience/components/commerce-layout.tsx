import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { commerceBasePath } from '../routes/route-paths'

interface CommerceLayoutProps {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}

export function CommerceLayout({
  eyebrow,
  title,
  description,
  children,
}: CommerceLayoutProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="border-b border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <Link
            className="font-semibold text-slate-950 outline-offset-4 hover:text-amber-800 dark:text-white dark:hover:text-amber-300"
            to={commerceBasePath}
          >
            Wayfinder Vehicles
          </Link>
          <nav aria-label="Vehicle study navigation">
            <ul className="flex gap-5 text-sm font-medium">
              <li>
                <Link
                  className="text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
                  to={`${commerceBasePath}/vehicles`}
                >
                  Browse vehicles
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
                  to={commerceBasePath}
                >
                  Case study
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

export const commercePrimaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-700 px-5 py-2.5 font-semibold text-white outline-offset-4 hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300'

export const commerceSecondaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 outline-offset-4 hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-amber-700 dark:border-slate-700 dark:text-slate-200'
