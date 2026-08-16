import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './styles/index.css'
import App from './App.jsx'
import { FloodAlertListener } from './components/common/FloodAlertListener.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <FloodAlertListener />
    <Toaster richColors position="top-center" />
  </StrictMode>,
)
