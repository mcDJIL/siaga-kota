import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingLayout } from './layouts/LandingLayout'
import { LandingPage } from './features/landing/pages/LandingPage'
import { PredictionPage } from './features/prediction/pages/PredictionPage'
import { MapPage } from './features/map/pages/MapPage'
import { ReportPage } from './features/report/pages/ReportPage'
import { EducationPage } from './features/education/pages/EducationPage'
import { ArticleDetailPage } from './features/education/pages/ArticleDetailPage'
import { QuizPage } from './features/education/pages/QuizPage'
import { QuizResultPage } from './features/education/pages/QuizResultPage'

function App() {
  return (
    <BrowserRouter>
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
        </Routes>
      </LandingLayout>
    </BrowserRouter>
  )
}

export default App
