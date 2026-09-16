import { Route, Routes } from 'react-router-dom'
import { StudyLayout } from './components/study-layout'
import { KnowledgeMapPage } from './pages/knowledge-map-page'
import { StudyDashboardPage } from './pages/study-dashboard-page'
import { StudyHistoryPage } from './pages/study-history-page'
import { StudyReviewPage } from './pages/study-review-page'
import { StudySettingsPage } from './pages/study-settings-page'

export function StudyArea() {
  return (
    <Routes>
      <Route element={<StudyLayout />}>
        <Route index element={<StudyDashboardPage />} />
        <Route path="review" element={<StudyReviewPage />} />
        <Route path="knowledge-map" element={<KnowledgeMapPage />} />
        <Route path="history" element={<StudyHistoryPage />} />
        <Route path="settings" element={<StudySettingsPage />} />
      </Route>
    </Routes>
  )
}
