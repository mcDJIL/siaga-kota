import { HeroSection } from '../components/HeroSection'
import { FeatureCards } from '../components/FeatureCards'
import { ReportForm } from '../components/ReportForm'
import { BenefitSection } from '../components/BenefitSection'
import { StatisticsSection } from '../components/StatisticsSection'
import { CTASection } from '../components/CTASection'

export function ReportPage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <ReportForm />
      <BenefitSection />
      <StatisticsSection />
      <CTASection />
    </>
  )
}
