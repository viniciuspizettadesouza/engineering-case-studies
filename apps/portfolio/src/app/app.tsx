import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CaseStudyPage } from './case-study-page'
import { HomePage } from './home-page'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { ApplicationDetailPage } from '../case-studies/financial-operations/routes/application-detail-page'
import { ConfirmationPage } from '../case-studies/financial-operations/routes/confirmation-page'
import { FinancialDetailsPage } from '../case-studies/financial-operations/routes/financial-details-page'
import { OperationsDashboardPage } from '../case-studies/financial-operations/routes/operations-dashboard-page'
import { PersonalDetailsPage } from '../case-studies/financial-operations/routes/personal-details-page'
import { CataloguePage } from '../case-studies/commerce-experience/routes/catalogue-page'
import { ReservationConfirmationPage } from '../case-studies/commerce-experience/routes/reservation-confirmation-page'
import { ReservationPage } from '../case-studies/commerce-experience/routes/reservation-page'
import { ReservationReviewPage } from '../case-studies/commerce-experience/routes/reservation-review-page'
import { VehicleDetailPage } from '../case-studies/commerce-experience/routes/vehicle-detail-page'
import { FarePage } from '../case-studies/accessible-transit/routes/fare-page'
import { JourneyPlanPage } from '../case-studies/accessible-transit/routes/journey-plan-page'
import { PassengerPage } from '../case-studies/accessible-transit/routes/passenger-page'
import { TicketConfirmationPage } from '../case-studies/accessible-transit/routes/ticket-confirmation-page'
import { TicketReviewPage } from '../case-studies/accessible-transit/routes/ticket-review-page'
import { CatalogueWorkspacePage } from '../case-studies/modular-enterprise/routes/catalogue-workspace-page'

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
        <Route
          path="/case-studies/financial-operations-platform/apply/personal"
          element={<PersonalDetailsPage />}
        />
        <Route
          path="/case-studies/financial-operations-platform/apply/financial"
          element={<FinancialDetailsPage />}
        />
        <Route
          path="/case-studies/financial-operations-platform/confirmation/:id"
          element={<ConfirmationPage />}
        />
        <Route
          path="/case-studies/financial-operations-platform/operations"
          element={<OperationsDashboardPage />}
        />
        <Route
          path="/case-studies/financial-operations-platform/operations/:id"
          element={<ApplicationDetailPage />}
        />
        <Route
          path="/case-studies/commerce-experience/vehicles"
          element={<CataloguePage />}
        />
        <Route
          path="/case-studies/commerce-experience/vehicles/:vehicleId"
          element={<VehicleDetailPage />}
        />
        <Route
          path="/case-studies/commerce-experience/vehicles/:vehicleId/reserve"
          element={<ReservationPage />}
        />
        <Route
          path="/case-studies/commerce-experience/vehicles/:vehicleId/review"
          element={<ReservationReviewPage />}
        />
        <Route
          path="/case-studies/commerce-experience/confirmation/:reservationId"
          element={<ReservationConfirmationPage />}
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets"
          element={
            <Navigate
              replace
              to="/case-studies/accessible-transit-platform/tickets/mossline/plan"
            />
          }
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets/:tenantId/plan"
          element={<JourneyPlanPage />}
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets/:tenantId/fares"
          element={<FarePage />}
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets/:tenantId/passenger"
          element={<PassengerPage />}
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets/:tenantId/review"
          element={<TicketReviewPage />}
        />
        <Route
          path="/case-studies/accessible-transit-platform/tickets/:tenantId/ticket/:ticketId"
          element={<TicketConfirmationPage />}
        />
        <Route
          path="/case-studies/modular-enterprise-workspace/catalogue"
          element={
            <Navigate
              replace
              to="/case-studies/modular-enterprise-workspace/catalogue/northstar"
            />
          }
        />
        <Route
          path="/case-studies/modular-enterprise-workspace/catalogue/:tenantId"
          element={<CatalogueWorkspacePage />}
        />
        <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<CaseStudyPage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}
