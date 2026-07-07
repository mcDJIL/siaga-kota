import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/Button'
import { warningData } from '../data/predictionData'
import { WarningTriangleIcon } from './icons'

export function WarningBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mx-auto -mt-10 w-full max-w-[1440px] px-4 sm:px-8"
    >
      <div className="flex flex-col gap-6 rounded-2xl border-l-[6px] border-[#715C00] bg-[#FFE17C] p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <WarningTriangleIcon className="h-8 w-9 shrink-0 text-[#4D3E00]" />
          <div className="flex flex-col gap-1">
            <h2 className="font-sans text-xl font-bold leading-7 text-[#4D3E00]">{warningData.title}</h2>
            <p className="text-base leading-6 text-[#4D3E00]/90">{warningData.description}</p>
          </div>
        </div>
        <Button className="w-full shrink-0 bg-[#715C00] text-white hover:bg-[#5c4a00] sm:w-auto" size="md">
          {warningData.cta}
        </Button>
      </div>
    </motion.section>
  )
}
