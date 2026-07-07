import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingLayout } from './layouts/LandingLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <OfficerDashboardPage />
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
          path="*"
          element={
            <LandingLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/prediction" element={<PredictionPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/education/article/:slug" element={<ArticleDetailPage />} />
                <Route path="/education/quiz" element={<QuizPage />} />
                <Route path="/education/quiz/:id" element={<QuizPage />} />
                <Route path="/education/quiz/:id/result" element={<QuizResultPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </LandingLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
