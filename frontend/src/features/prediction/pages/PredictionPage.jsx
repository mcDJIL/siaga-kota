import { HeroPrediction } from '../components/HeroPrediction'
import { WarningBanner } from '../components/WarningBanner'
import { FloodMapSection } from '../components/FloodMapSection'
import { SystemMetrics } from '../components/SystemMetrics'
import { HistoricalComparison } from '../components/HistoricalComparison'
import { InfrastructureHealth } from '../components/InfrastructureHealth'
import { CTASection } from '../components/CTASection'
import {
  SystemMetricsSkeleton,
  FloodMapSkeleton,
  HistoricalComparisonSkeleton,
  InfrastructureHealthSkeleton,
} from '../components/skeletons'
import { usePredictionData } from '../hooks/usePredictionData'

export function PredictionPage() {
  const { isLoading } = usePredictionData()

  return (
    <>
      <HeroPrediction />
      {isLoading ? <FloodMapSkeleton /> : <FloodMapSection />}
      {isLoading ? <SystemMetricsSkeleton /> : <SystemMetrics />}
      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-20 sm:px-8 lg:flex-row">
        {isLoading ? <HistoricalComparisonSkeleton /> : <HistoricalComparison />}
        {isLoading ? <InfrastructureHealthSkeleton /> : <InfrastructureHealth />}
      </section>
      {!isLoading && <CTASection />}
    </>
  )
}
