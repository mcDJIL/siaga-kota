import { Plus, Minus, Layers } from 'lucide-react'

const LEGEND_ITEMS = [
  { label: 'Titik Sampah Terdeteksi', dotColor: 'bg-brand-green', bordered: false },
  { label: 'Zona Siaga Banjir', dotColor: 'bg-navy', bordered: true },
]

export function MapSummarySection() {
  return (
    <section className="bg-bg-blue-soft px-4 py-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,410px)_1fr]">
        <div className="flex flex-col gap-4 lg:justify-self-end">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Pantauan Kota Real-time
          </h2>
          <p className="text-base leading-6 text-text-muted">
            Monitor kondisi drainase dan titik rawan banjir di seluruh area perkotaan dalam satu dasbor yang
            intuitif.
          </p>
          <div className="flex flex-col gap-4 pt-2">
            {LEGEND_ITEMS.map((item) => (
              <div
                key={item.label}
                className={
                  item.bordered
                    ? 'flex items-center gap-2 rounded-lg border-2 border-navy-light bg-white p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]'
                    : 'flex items-center gap-2 rounded-lg bg-white p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]'
                }
              >
                <span className={`h-3 w-3 rounded-full ${item.dotColor}`} />
                <span className="font-sans text-sm font-medium tracking-[0.14px] text-text-body">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[320px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[420px] lg:h-[500px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/16c337420db4c9eca83f078fc279c5faf5b443ec?width=1787"
            alt="Peta pantauan kota real-time"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="flex flex-col items-center gap-1 rounded-lg border border-white/20 bg-white/70 p-2 backdrop-blur-[5px]">
              <button type="button" aria-label="Perbesar peta" className="rounded p-1 text-text-body">
                <Plus size={16} />
              </button>
              <button type="button" aria-label="Perkecil peta" className="rounded p-1 text-text-body">
                <Minus size={16} />
              </button>
            </div>
            <button
              type="button"
              aria-label="Tampilkan layer peta"
              className="flex items-center justify-center rounded-lg border border-white/20 bg-white/70 p-2 text-text-body backdrop-blur-[5px]"
            >
              <Layers size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
