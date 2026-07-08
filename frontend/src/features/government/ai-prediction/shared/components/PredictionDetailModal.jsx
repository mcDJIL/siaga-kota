import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Modal } from '../../../../../components/ui/Modal'
import { PREDICTION_ZONES } from '../../data/predictionMapData'
import { CORRELATION_INSIGHT } from '../../data/predictionStatistics'
import { RISK_LABELS } from '../../utils/predictionColor'

const HISTORICAL_COMPARISON = [
  { week: 'Minggu 1', reports: 18 },
  { week: 'Minggu 2', reports: 24 },
  { week: 'Minggu 3', reports: 15 },
  { week: 'Minggu Ini', reports: 32 },
]

export function PredictionDetailModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={CORRELATION_INSIGHT.title} className="max-w-2xl">
      <div className="flex flex-col gap-6">
        <p className="text-sm text-text-muted">
          Analisis AI mendeteksi korelasi kuat ({CORRELATION_INSIGHT.correlationPercentage}%) antara penumpukan sampah di titik{' '}
          <span className="font-semibold text-text-body">{CORRELATION_INSIGHT.district}</span> dengan proyeksi peningkatan tinggi
          muka air selama curah hujan tinggi. Pembersihan sampah di area ini akan menurunkan risiko banjir secara signifikan
          sebesar {CORRELATION_INSIGHT.reductionPercentage}%.
        </p>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Distrik Terdampak</h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PREDICTION_ZONES.map((zone) => (
              <li
                key={zone.id}
                className="flex items-center justify-between rounded-lg border border-[#C4C6CF]/30 px-4 py-2.5 text-sm"
              >
                <span className="text-text-body">{zone.district}</span>
                <span className="font-bold text-text-body">
                  {zone.prediction}% &middot; {RISK_LABELS[zone.riskLevel]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text-body">Perbandingan Historis Laporan</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HISTORICAL_COMPARISON}>
                <CartesianGrid vertical={false} stroke="#E5EEFF" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#43474E', fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="reports" name="Laporan" fill="#002045" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Modal>
  )
}
