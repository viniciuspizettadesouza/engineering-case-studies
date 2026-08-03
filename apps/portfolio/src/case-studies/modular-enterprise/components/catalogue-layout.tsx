import { Container, Eyebrow } from '@engineering-case-studies/design-system'
import type { CSSProperties, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { CatalogueTenant } from '../domain/catalogue'
import { catalogueTenants } from '../fixtures/tenants'

type TenantStyle = CSSProperties &
  Record<
    | '--catalogue-primary'
    | '--catalogue-primary-dark'
    | '--catalogue-surface'
    | '--catalogue-focus',
    string
  >

export const catalogueBasePath =
  '/case-studies/modular-enterprise-workspace/catalogue'

export function CatalogueLayout({
  tenant,
  children,
}: {
  readonly tenant: CatalogueTenant
  readonly children: ReactNode
}) {
  const navigate = useNavigate()
  const style: TenantStyle = {
    '--catalogue-primary': tenant.tokens.primary,
    '--catalogue-primary-dark': tenant.tokens.primaryDark,
    '--catalogue-surface': tenant.tokens.surface,
    '--catalogue-focus': tenant.tokens.focus,
  }

  return (
    <main
      className="max-w-full overflow-x-hidden"
      id="main-content"
      style={style}
      tabIndex={-1}
    >
      <div className="border-b border-slate-200 bg-[var(--catalogue-surface)] dark:border-slate-800 dark:bg-slate-900">
        <Container className="flex flex-wrap items-center justify-between gap-5 py-5">
          <div>
            <strong className="text-lg text-[var(--catalogue-primary)] dark:text-[var(--catalogue-primary-dark)]">
              {tenant.name}
            </strong>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Fictional tenant catalogue
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-5">
            <div>
              <label
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                htmlFor="catalogueTenant"
              >
                Retail tenant
              </label>
              <select
                className="mt-1 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-[var(--catalogue-focus)] focus:ring-2 focus:ring-[var(--catalogue-focus)]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                id="catalogueTenant"
                onChange={(event) =>
                  void navigate(`${catalogueBasePath}/${event.target.value}`)
                }
                value={tenant.id}
              >
                {catalogueTenants.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              className="min-h-11 py-3 text-sm font-semibold text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
              to="/case-studies/modular-enterprise-workspace"
            >
              Case study
            </Link>
          </div>
        </Container>
      </div>
      <Container className="min-w-0 max-w-full py-12 sm:py-16">
        <div className="max-w-3xl">
          <Eyebrow>Bulk catalogue workspace</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            Import and validate products
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {tenant.tagline} Drafts, validation rules and simulated publications
            stay isolated to this tenant.
          </p>
        </div>
        {children}
      </Container>
    </main>
  )
}

export const cataloguePrimaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--catalogue-primary)] px-5 py-2.5 font-semibold text-white outline-offset-4 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-[var(--catalogue-focus)] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[var(--catalogue-primary-dark)] dark:text-slate-950'

export const catalogueSecondaryButton =
  'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 outline-offset-4 hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-[var(--catalogue-focus)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'
