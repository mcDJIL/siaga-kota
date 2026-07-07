import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export function LandingLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
