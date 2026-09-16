import { Container } from '@engineering-case-studies/design-system'
import { NavLink, Outlet } from 'react-router-dom'
import { StudyProvider } from '../study-context'
import { useStudy } from '../use-study'

const links = [
  ['/study', 'Today'],
  ['/study/knowledge-map', 'Knowledge map'],
  ['/study/history', 'History'],
  ['/study/settings', 'Settings'],
] as const

export function StudyLayout() {
  return (
    <StudyProvider>
      <StudyShell />
    </StudyProvider>
  )
}

function StudyShell() {
  const { ready } = useStudy()
  if (!ready)
    return (
      <main className="px-5 py-20" id="main-content" tabIndex={-1}>
        <p aria-live="polite">Loading local study progress…</p>
      </main>
    )

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="border-b border-slate-200 dark:border-slate-800">
        <Container>
          <nav aria-label="Study navigation" className="overflow-x-auto">
            <ul className="flex min-w-max gap-6 py-4 text-sm font-semibold">
              {links.map(([to, label]) => (
                <li key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      `rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-teal-600 ${isActive ? 'text-teal-700 dark:text-teal-300' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`
                    }
                    end={to === '/study'}
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
      <Outlet />
    </main>
  )
}
