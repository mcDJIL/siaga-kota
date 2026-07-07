import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingLayout } from './layouts/LandingLayout'
import { LandingPage } from './features/landing/pages/LandingPage'
import { PredictionPage } from './features/prediction/pages/PredictionPage'

function App() {
  return (
    <BrowserRouter>
      <LandingLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prediction" element={<PredictionPage />} />
        </Routes>
      </LandingLayout>
    </BrowserRouter>
  )
}

export default App
