import { Container } from '@engineering-case-studies/design-system'
import { Link } from 'react-router-dom'

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-stone-50/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link
          className="rounded-sm font-mono text-sm font-bold tracking-tight text-slate-950 outline-offset-4 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600 dark:text-white dark:hover:text-teal-300"
          to="/"
        >
          VS / ENGINEERING
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <li>
              <Link
                className="rounded-sm outline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-teal-600 dark:hover:text-white"
                to="/#case-studies"
              >
                Studies
              </Link>
            </li>
            <li>
              <a
                className="rounded-sm outline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-teal-600 dark:hover:text-white"
                href="https://viniciuspizettadesouza.github.io/"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
