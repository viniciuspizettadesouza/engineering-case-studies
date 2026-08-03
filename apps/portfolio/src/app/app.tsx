import { HashRouter, Route, Routes } from 'react-router-dom'
import { CaseStudyPage } from './case-study-page'
import { HomePage } from './home-page'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export function App() {
  const skipToMainContent = () => {
    document.getElementById('main-content')?.focus()
  }

  return (
    <HashRouter>
      <button className="skip-link" onClick={skipToMainContent} type="button">
        Skip to main content
      </button>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<CaseStudyPage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}
