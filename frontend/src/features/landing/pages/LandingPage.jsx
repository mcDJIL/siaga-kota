import { HeroSection } from '../components/HeroSection'
import { QuickStatsSection } from '../components/QuickStatsSection'
import { SolutionsSection } from '../components/SolutionsSection'
import { MapSummarySection } from '../components/MapSummarySection'
import { AnnouncementsSection } from '../components/AnnouncementsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { TipsSection } from '../components/TipsSection'
import { SupportedBySection } from '../components/SupportedBySection'

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <QuickStatsSection />
      <SolutionsSection />
      <MapSummarySection />
      <AnnouncementsSection />
      <TestimonialsSection />
      <TipsSection />
      <SupportedBySection />
    </>
  )
}
