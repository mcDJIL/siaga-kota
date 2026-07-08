import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { LandingLayout } from './layouts/LandingLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { ErrorLayout } from './layouts/ErrorLayout'
import { NotFoundPage } from './features/error/pages/NotFoundPage'
import { InternalServerErrorPage } from './features/error/pages/InternalServerErrorPage'
import { LandingPage } from './features/landing/pages/LandingPage'
import { PredictionPage } from './features/prediction/pages/PredictionPage'
import { MapPage } from './features/map/pages/MapPage'
import { ReportPage } from './features/report/pages/ReportPage'
import { EducationPage } from './features/education/pages/EducationPage'
import { ArticleDetailPage } from './features/education/pages/ArticleDetailPage'
import { QuizPage } from './features/education/pages/QuizPage'
import { QuizResultPage } from './features/education/pages/QuizResultPage'
import { AboutPage } from './features/about/pages/AboutPage'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage'
import { OfficerDashboardPage } from './features/dashboard/officer/pages/OfficerDashboardPage'
import { OfficerWasteReportDetailPage } from './features/dashboard/officer/pages/OfficerWasteReportDetailPage'
import { OfficerFloodReportsPage } from './features/dashboard/officer/pages/OfficerFloodReportsPage'
import { OfficerActivityMapPage } from './features/dashboard/officer/pages/OfficerActivityMapPage'
import { OfficerNotificationPage } from './features/dashboard/officer/pages/OfficerNotificationPage'
import { OfficerProfilePage } from './features/dashboard/officer/pages/OfficerProfilePage'
import { OfficerWasteReportsPage } from './features/dashboard/officer/pages/OfficerWasteReportsPage'
import { CitizenDashboardPage } from './features/dashboard/citizen/pages/CitizenDashboardPage'
import { CitizenWasteReportPage } from './features/dashboard/citizen/reports/waste/pages/CitizenWasteReportPage'
import { CitizenFloodReportPage } from './features/reports/citizen/flood/pages/CitizenFloodReportPage'
import { CitizenMapPage } from './features/map/citizen/map/pages/CitizenMapPage'
import { CitizenReportTrackingPage } from './features/reports/citizen/reports/pages/CitizenReportTrackingPage'
import { CitizenGamificationPage } from './features/gamification/citizen/gamification/pages/CitizenGamificationPage'
import { CitizenBadgeCollectionPage } from './features/gamification/citizen/gamification/pages/CitizenBadgeCollectionPage'
import { CitizenProfilePage } from './features/profile/citizen/profile/pages/CitizenProfilePage'
import { CITIZEN_NAV_ITEMS, CITIZEN_PROFILE } from './features/dashboard/citizen/data/dashboardData'
import { GovernmentDashboardPage } from './features/government/dashboard/pages/GovernmentDashboardPage'
import { GOVERNMENT_NAV_ITEMS, GOVERNMENT_PROFILE } from './features/government/dashboard/data/dashboardData'
import { GovernmentWasteReportPage } from './features/government/waste-reports/pages/GovernmentWasteReportPage'
import { GovernmentFloodReportPage } from './features/government/flood-reports/pages/GovernmentFloodReportPage'
import { GovernmentActivityMapPage } from './features/government/activity-map/pages/GovernmentActivityMapPage'
import { GovernmentAIPredictionPage } from './features/government/ai-prediction/pages/GovernmentAIPredictionPage'
import { GovernmentUserManagementPage } from './features/government/user-management/pages/GovernmentUserManagementPage'
import { GovernmentAnnouncementsPage } from './features/government/announcements/pages/GovernmentAnnouncementsPage'
import { GovernmentExportDataPage } from './features/government/export-data/pages/GovernmentExportDataPage'
import { GovernmentProfilePage } from './features/government/profile/pages/GovernmentProfilePage'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingLayout><LandingPage /></LandingLayout>} />
          <Route path="/prediction" element={<LandingLayout><PredictionPage /></LandingLayout>} />
          <Route path="/map" element={<LandingLayout><MapPage /></LandingLayout>} />
          <Route path="/report" element={<LandingLayout><ReportPage /></LandingLayout>} />
          <Route path="/education" element={<LandingLayout><EducationPage /></LandingLayout>} />
          <Route path="/education/article/:slug" element={<LandingLayout><ArticleDetailPage /></LandingLayout>} />
          <Route path="/education/quiz" element={<LandingLayout><QuizPage /></LandingLayout>} />
          <Route path="/education/quiz/:id" element={<LandingLayout><QuizPage /></LandingLayout>} />
          <Route path="/education/quiz/:id/result" element={<LandingLayout><QuizResultPage /></LandingLayout>} />
          <Route path="/about" element={<LandingLayout><AboutPage /></LandingLayout>} />

          {/* Authentication */}
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />

          {/* Citizen Routes */}
          <Route
            path="/citizen/dashboard"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenDashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/reports-waste"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenWasteReportPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/reports-flood"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenFloodReportPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/map"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenMapPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/reports"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenReportTrackingPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/gamification"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenGamificationPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/gamification/badges"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenBadgeCollectionPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/citizen/profile"
            element={
              <DashboardLayout
                navItems={CITIZEN_NAV_ITEMS}
                profile={CITIZEN_PROFILE}
                profileHref="/citizen/profile"
                logoutHref="/login"
              >
                <CitizenProfilePage />
              </DashboardLayout>
            }
          />

          {/* Officer Routes */}
          <Route
            path="/officer/dashboard"
            element={
              <DashboardLayout>
                <OfficerDashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/reports/waste"
            element={
              <DashboardLayout>
                <OfficerWasteReportsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/reports/waste/:reportId"
            element={
              <DashboardLayout>
                <OfficerWasteReportDetailPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/reports/flood"
            element={
              <DashboardLayout>
                <OfficerFloodReportsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/activity-map"
            element={
              <DashboardLayout>
                <OfficerActivityMapPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/notifications"
            element={
              <DashboardLayout>
                <OfficerNotificationPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/officer/profile"
            element={
              <DashboardLayout>
                <OfficerProfilePage />
              </DashboardLayout>
            }
          />

          {/* Government Routes */}
          <Route
            path="/government/dashboard"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentDashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/waste-reports"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentWasteReportPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/flood-reports"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentFloodReportPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/activity-map"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentActivityMapPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/ai-prediction"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentAIPredictionPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/user-management"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentUserManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/announcements"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentAnnouncementsPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/export-data"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentExportDataPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/government/profile"
            element={
              <DashboardLayout
                navItems={GOVERNMENT_NAV_ITEMS}
                profile={GOVERNMENT_PROFILE}
                profileHref="/government/profile"
                logoutHref="/login"
              >
                <GovernmentProfilePage />
              </DashboardLayout>
            }
          />

          {/* Error Routes */}
          <Route path="/not-found" element={<ErrorLayout><NotFoundPage /></ErrorLayout>} />
          <Route path="/error" element={<ErrorLayout><InternalServerErrorPage /></ErrorLayout>} />

          {/* Catch-all: redirect unknown routes to /not-found */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
