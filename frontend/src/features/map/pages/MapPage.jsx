import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ListFilter, X } from 'lucide-react'
import { TopInformationBar } from '../components/TopInformationBar'
import { MapContainer } from '../components/MapContainer'
import { ReportPreviewCard } from '../components/ReportPreviewCard'
import { LegendCard } from '../components/LegendCard'
import { FloatingReportButton } from '../components/FloatingReportButton'
import { StatisticsSection } from '../components/StatisticsSection'
import { wasteReports } from '../data/mapData'

export function MapPage() {
  const [isLegendOpen, setIsLegendOpen] = useState(false)

  return (
    <>
      <TopInformationBar />

      <section className="relative mx-4 my-4 h-[70vh] overflow-hidden rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] sm:mx-8 sm:h-[75vh] lg:h-[80vh]">
        <MapContainer />

        <div className="pointer-events-none absolute inset-0">
          <ReportPreviewCard report={wasteReports[0]} onLoginClick={() => {}} />

          <LegendCard className="absolute right-6 bottom-6 hidden lg:flex" />

          <button
            type="button"
            aria-label="Buka legenda peta"
            onClick={() => setIsLegendOpen(true)}
            className="pointer-events-auto absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)] lg:hidden"
          >
            <ListFilter size={16} />
            Legenda
          </button>

          <FloatingReportButton />
        </div>
      </section>

      <AnimatePresence>
        {isLegendOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-end bg-navy/40 lg:hidden"
            onClick={() => setIsLegendOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full rounded-t-2xl bg-white p-4"
            >
              <div className="flex justify-end pb-2">
                <button type="button" aria-label="Tutup legenda" onClick={() => setIsLegendOpen(false)}>
                  <X size={20} className="text-navy" />
                </button>
              </div>
              <LegendCard className="w-full shadow-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StatisticsSection />
    </>
  )
}
