const DANGER_LABELS = { tinggi: 'Tinggi', sedang: 'Sedang', rendah: 'Rendah' }
const STATUS_LABELS = { baru: 'Baru', diproses: 'Diproses', selesai: 'Selesai' }

export function FloodReportPrintTemplate({ reports, statistics, dangerLevel, region }) {
  return (
    <div id="officer-print-root" className="hidden print:block print:p-8">
      <header className="mb-6 border-b border-border-muted pb-4">
        <h1 className="font-heading text-xl font-bold text-navy">Laporan Insiden Banjir</h1>
        <p className="text-sm text-text-muted">Dicetak melalui SiagaKota City Official Panel</p>
      </header>

      <section className="mb-6">
        <h2 className="mb-2 text-base font-bold text-navy">Ringkasan Statistik</h2>
        <dl className="grid grid-cols-2 gap-2 text-sm text-text-body">
          {statistics.map((statistic) => (
            <div key={statistic.id} className="flex justify-between gap-2">
              <dt className="text-text-muted">{statistic.label}</dt>
              <dd className="font-semibold">{statistic.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-base font-bold text-navy">Filter Aktif</h2>
        <p className="text-sm text-text-body">
          Tingkat Bahaya: <span className="font-semibold">{dangerLevel}</span> &middot; Wilayah:{' '}
          <span className="font-semibold">{region}</span>
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-bold text-navy">Daftar Laporan</h2>
        <table className="w-full border-collapse text-sm text-text-body">
          <thead>
            <tr className="border-b border-border-muted text-left">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Bahaya</th>
              <th className="py-2 pr-4">Lokasi</th>
              <th className="py-2 pr-4">Tinggi (cm)</th>
              <th className="py-2 pr-4">Pelapor</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-border-muted">
                <td className="py-2 pr-4">{report.id}</td>
                <td className="py-2 pr-4">{DANGER_LABELS[report.danger]}</td>
                <td className="py-2 pr-4">{report.location}</td>
                <td className="py-2 pr-4">{report.waterHeight}</td>
                <td className="py-2 pr-4">{report.reporter}</td>
                <td className="py-2 pr-4">{STATUS_LABELS[report.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
