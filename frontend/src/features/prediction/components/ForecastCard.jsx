import { forecastData, forecastSummary } from '../data/forecastData'
import { SparkleIcon } from './icons'

export function ForecastCard() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-navy p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-[22px] w-[22px] text-brand-green-light" />
          <h3 className="font-heading text-xl font-bold text-white">Forecasting AI (24 Jam)</h3>
        </div>
        <span className="text-xs font-semibold tracking-[0.6px] text-white/60">
          Terupdate: {forecastSummary.updatedAt}
        </span>
      </div>

      <div className="flex h-32 items-end justify-center gap-1.5 px-2">
        {forecastData.map((bar) => (
          <div
            key={bar.hour}
            className={bar.isPeak ? 'relative flex-1 rounded-t-sm bg-[#74DB9D]' : 'flex-1 rounded-t-sm bg-white'}
            style={{ height: `${bar.height}%`, opacity: bar.isPeak ? 1 : bar.opacity / 100 }}
          >
            {bar.isPeak && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap text-white">
                PUNCAK
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="border-t border-white/10 pt-4 text-sm leading-[22.75px] text-white tracking-[0.14px]">
        Prediksi puncak curah hujan pukul{' '}
        <span className="text-[#74DB9D]">{forecastSummary.peakTime}</span> dengan probabilitas limpasan sungai{' '}
        {forecastSummary.overflowProbability}%.
      </p>
    </div>
  )
}
