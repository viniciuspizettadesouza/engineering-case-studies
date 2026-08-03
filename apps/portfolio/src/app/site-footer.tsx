import { Container } from '@engineering-case-studies/design-system'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <Container className="flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-end sm:justify-between dark:text-slate-400">
        <p>
          Designed and engineered by{' '}
          <a
            className="rounded-sm font-medium text-slate-900 underline decoration-teal-500 underline-offset-4 outline-offset-4 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-slate-100 dark:hover:text-teal-300"
            href="https://viniciuspizettadesouza.github.io/"
          >
            Vinicius Souza
          </a>
          .
        </p>
        <p className="max-w-xl sm:text-right">
          Fictional products and data. No employer source code, private systems
          or confidential information.
        </p>
      </Container>
    </footer>
  )
}
