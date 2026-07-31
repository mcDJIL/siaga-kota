const TYPE_LABEL = {
  waste: 'Laporan Sampah',
  flood: 'Laporan Banjir',
  ai: 'Prediksi AI (Flood)',
}

export function HeatmapMarkerPopup({ marker, onOpenDetail }) {
  return (
    <div className="flex min-w-[240px] flex-col gap-2 p-2">
      <span className="text-xs font-semibold tracking-[0.6px] text-text-muted uppercase">{TYPE_LABEL[marker.type]}</span>
      <h4 className="text-sm font-bold text-text-body">{marker.title || marker.location}</h4>

      <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-text-muted">
        {marker.type === 'ai' ? (
          <>
            <dt>Lokasi</dt>
            <dd className="text-right font-semibold text-text-body">{marker.location}</dd>
            <dt>Tingkat Risiko</dt>
            <dd className="text-right font-semibold text-text-body">{marker.riskLevel}</dd>
            <dt>Probabilitas Banjir</dt>
            <dd className="text-right font-semibold text-text-body">{marker.floodRiskProbability || 'N/A'}%</dd>
            <dt>Confidence</dt>
            <dd className="text-right font-semibold text-text-body">{marker.confidence}%</dd>
            <dt>Prediksi</dt>
            <dd className="text-right font-semibold text-text-body">{marker.predictedAt}</dd>
          </>
        ) : (
          <>
            <dt>Kategori</dt>
            <dd className="text-right font-semibold text-text-body">{marker.category}</dd>
            <dt>Risiko</dt>
            <dd className="text-right font-semibold text-text-body">{marker.riskLevel}</dd>
            <dt>Jumlah Laporan</dt>
            <dd className="text-right font-semibold text-text-body">{marker.reportCount || 1}</dd>
            <dt>Waktu</dt>
            <dd className="text-right font-semibold text-text-body">{marker.createdAt || marker.lastUpdated}</dd>
          </>
        )}
      </dl>

      <button
        type="button"
        onClick={() => onOpenDetail(marker)}
        className="mt-2 rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-light"
      >
        Lihat Detail
      </button>
    </div>
  )
}
