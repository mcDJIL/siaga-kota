const LEGEND_ITEMS = [
  { id: 'priority-area', label: 'Zona Prioritas', color: 'bg-[#BA1A1A]/20 border border-[#BA1A1A]' },
  { id: 'monitoring-point', label: 'Titik Pemantauan', color: 'bg-navy' },
  { id: 'sensor', label: 'Sensor', color: 'bg-[#1A365D]' },
  { id: 'flood-incident', label: 'Insiden Banjir', color: 'bg-[#BA1A1A]' },
]

export function MapLegend({ syncedAt = 'Baru saja', sensorCount = 240 }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-3 rounded-lg border border-navy/10 bg-white/90 p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] backdrop-blur-md">
      <ul className="flex flex-wrap gap-3">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.id} className="flex items-center gap-1.5">
            <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.4px] text-text-body">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1">
        <p className="text-base text-navy">Terakhir Diperbarui: {syncedAt}</p>
        <p className="text-xs font-semibold tracking-[0.6px] text-text-muted">
          Data sinkronisasi dari {sensorCount} sensor IoT aktif.
        </p>
      </div>
    </div>
  )
}
