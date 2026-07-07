import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingLayout } from './layouts/LandingLayout'
import { LandingPage } from './features/landing/pages/LandingPage'
import { PredictionPage } from './features/prediction/pages/PredictionPage'
import { MapPage } from './features/map/pages/MapPage'
import { ReportPage } from './features/report/pages/ReportPage'

function App() {
  return (
    <BrowserRouter>
      <LandingLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </LandingLayout>
    </BrowserRouter>
  )
}

export default App
