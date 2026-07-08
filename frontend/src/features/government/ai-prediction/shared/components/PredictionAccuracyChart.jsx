import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PREDICTION_ACCURACY } from '../../data/predictionAccuracy'

export function PredictionAccuracyChart({ period }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-1 flex-col gap-4 rounded-xl border border-[#C4C6CF]/30 bg-white p-5 shadow-[0_4px_14px_0_rgba(26,54,93,0.08)]"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-semibold text-text-body">Akurasi Prediksi AI</h3>
        <span className="rounded-md bg-[#8EF5B5] px-2 py-1 text-xs font-semibold tracking-[0.6px] text-[#007243]">{period}</span>
      </div>

      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PREDICTION_ACCURACY} margin={{ top: 10, left: -20, right: 4 }}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#002045" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#002045" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#C4C6CF" strokeOpacity={0.3} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#43474E', fontWeight: 600 }} />
            <YAxis hide domain={[70, 100]} />
            <Tooltip cursor={{ stroke: '#C4C6CF' }} formatter={(value) => [`${value}%`, 'Akurasi']} />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="#002045"
              strokeWidth={2}
              fill="url(#accuracyGradient)"
              isAnimationActive
              animationDuration={800}
              dot={{ r: 3, fill: '#002045' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
