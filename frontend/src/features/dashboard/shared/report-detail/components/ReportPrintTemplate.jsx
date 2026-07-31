export function ReportPrintTemplate({ report, timeline, isEmergency, handlingNotes }) {
  return (
    <div id="officer-print-root" className="hidden print:block print:p-8">
      <header className="mb-6 flex items-center justify-between border-b border-border-muted pb-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-navy">Laporan Sampah #{report.id}</h1>
          <p className="text-sm text-text-muted">Dicetak melalui SiagaKota City Official Panel</p>
        </div>
        {isEmergency && (
          <span className="rounded-full bg-[#BA1A1A] px-3 py-1 text-xs font-semibold text-white uppercase">
            Darurat
          </span>
        )}
      </header>

      <section className="mb-6">
        <h2 className="mb-2 text-base font-bold text-navy">Informasi Pelapor</h2>
        <dl className="grid grid-cols-2 gap-2 text-sm text-text-body">
          <dt className="text-text-muted">Nama Pelapor</dt>
          <dd>{report.reporterName}</dd>
          <dt className="text-text-muted">Waktu Laporan</dt>
          <dd>{report.submittedAt}</dd>
          <dt className="text-text-muted">Lokasi Kejadian</dt>
          <dd>{report.address}</dd>
          <dt className="text-text-muted">Koordinat</dt>
          <dd>
            {report.coordinates.lat}, {report.coordinates.lng}
          </dd>
        </dl>
        <p className="mt-3 break-words text-sm text-text-body">
          <span className="font-semibold text-text-muted">Deskripsi: </span>
          {report.description}
        </p>
      </section>

      {timeline && timeline.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-base font-bold text-navy">Status Penanganan</h2>
          <ol className="flex flex-col gap-1 text-sm text-text-body">
            {timeline.map((step) => (
              <li key={step.id}>
                <span className="font-semibold">{step.title}</span> — {step.description}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mb-6">
        <h2 className="mb-2 text-base font-bold text-navy">Foto Kejadian</h2>
        <div className="grid grid-cols-3 gap-2">
          {report.photos.map((photo, index) => (
            <img key={photo} src={photo} alt={`Foto kejadian ${index + 1}`} className="h-32 w-full object-cover" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-base font-bold text-navy">Catatan Penanganan</h2>
        <p className="text-sm text-text-body">{handlingNotes || 'Belum ada catatan penanganan.'}</p>
      </section>
    </div>
  )
}
