import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import type { CSSProperties, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { TransitTenant } from '../domain/ticketing'
import { transitTenants } from '../fixtures/tenants'
import { transitBasePath, transitTenantPath } from '../routes/route-paths'

type TenantStyle = CSSProperties &
  Record<
    | '--tenant-primary'
    | '--tenant-primary-dark'
    | '--tenant-surface'
    | '--tenant-focus',
    string
  >

export function TransitLayout({
  tenant,
  eyebrow,
  title,
  description,
  children,
}: {
  readonly tenant: TransitTenant
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}) {
  const navigate = useNavigate()
  const style: TenantStyle = {
    '--tenant-primary': tenant.tokens.primary,
    '--tenant-primary-dark': tenant.tokens.primaryDark,
    '--tenant-surface': tenant.tokens.surface,
    '--tenant-focus': tenant.tokens.focus,
  }

  return (
    <main id="main-content" style={style} tabIndex={-1}>
      <div className="border-b border-slate-200 bg-[var(--tenant-surface)] dark:border-slate-800 dark:bg-slate-900">
        <Container className="flex flex-wrap items-center justify-between gap-5 py-5">
          <div>
            <Link
              className="font-semibold text-[var(--tenant-primary)] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--tenant-focus)] dark:text-[var(--tenant-primary-dark)]"
              to={`${transitTenantPath(tenant.id)}/plan`}
            >
              {tenant.name}
            </Link>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Fictional transport demonstration
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-5">
            <div>
              <label
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                htmlFor="transitTenant"
              >
                Transport operator
              </label>
              <select
                className="mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-[var(--tenant-focus)] focus:ring-2 focus:ring-[var(--tenant-focus)]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                id="transitTenant"
                onChange={(event) =>
                  void navigate(`${transitTenantPath(event.target.value)}/plan`)
                }
                value={tenant.id}
              >
                {transitTenants.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              className="min-h-11 py-3 text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
              to={transitBasePath}
            >
              Case study
            </Link>
          </div>
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

export const transitPrimaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--tenant-primary)] px-5 py-2.5 font-semibold text-white outline-offset-4 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-[var(--tenant-focus)] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[var(--tenant-primary-dark)] dark:text-slate-950'

export const transitSecondaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 outline-offset-4 hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-[var(--tenant-focus)] dark:border-slate-700 dark:text-slate-200'
