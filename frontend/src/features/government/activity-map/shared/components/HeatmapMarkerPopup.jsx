const TYPE_LABEL = {
  waste: 'Laporan Sampah',
  flood: 'Laporan Banjir',
  ai: 'Prediksi AI',
}

export function HeatmapMarkerPopup({ marker, onOpenDetail }) {
  return (
    <div className="flex min-w-[200px] flex-col gap-2 p-1">
      <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">{TYPE_LABEL[marker.type]}</span>
      <h4 className="text-sm font-bold text-text-body">{marker.location}</h4>

      <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-text-muted">
        <dt>Kategori</dt>
        <dd className="text-right font-semibold text-text-body">{marker.category}</dd>
        <dt>Risiko</dt>
        <dd className="text-right font-semibold text-text-body">{marker.riskLevel}</dd>
        <dt>Jumlah Laporan</dt>
        <dd className="text-right font-semibold text-text-body">{marker.reportCount}</dd>
        <dt>Pembaruan</dt>
        <dd className="text-right font-semibold text-text-body">{marker.lastUpdated}</dd>
      </dl>

      <button
        type="button"
        onClick={() => onOpenDetail(marker)}
        className="mt-1 rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-light"
      >
        Buka Detail
      </button>
    </div>
  )
}
