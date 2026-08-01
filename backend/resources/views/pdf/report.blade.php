<?php $status = $report->status->value; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Laporan {{ $report->code }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #111827; }
        h1 { font-size: 18px; margin: 0 0 4px; }
        .muted { color: #6b7280; }
        .section { margin-top: 16px; }
        .section h2 { font-size: 13px; margin: 0 0 6px; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 5px 6px; text-align: left; vertical-align: top; }
        .detail th { width: 30%; color: #374151; }
        .detail td { border-bottom: 1px solid #f3f4f6; }
        .history th { background: #f3f4f6; border: 1px solid #d1d5db; }
        .history td { border: 1px solid #d1d5db; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; background: #e5e7eb; }
        .footer { margin-top: 20px; font-size: 9px; color: #9ca3af; }
    </style>
</head>
<body>
    <h1>Laporan {{ $report->code }}</h1>
    <p class="muted">SiagaKota &mdash; Kabupaten Jember. Dicetak {{ now()->format('d M Y H:i') }}.</p>

    <div class="section">
        <h2>Detail Laporan</h2>
        <table class="detail">
            <tr><th>Kode</th><td>{{ $report->code }}</td></tr>
            <tr><th>Judul</th><td>{{ $report->title }}</td></tr>
            <tr><th>Kategori</th><td>{{ $report->category?->name ?? '-' }}</td></tr>
            <tr><th>Status</th><td><span class="badge">{{ $statusLabels[$status] ?? $status }}</span></td></tr>
            <tr><th>Prioritas</th><td>{{ $report->priority->value }}</td></tr>
            <tr><th>Darurat</th><td>{{ $report->is_emergency ? 'Ya' : 'Tidak' }}</td></tr>
            @if ($report->waste_type)
                <tr><th>Jenis Sampah</th><td>{{ $report->waste_type->value }}</td></tr>
            @endif
            @if ($report->water_level_cm !== null)
                <tr><th>Tinggi Air</th><td>{{ $report->water_level_cm }} cm</td></tr>
            @endif
            <tr><th>Alamat</th><td>{{ $report->address }}</td></tr>
            <tr>
                <th>Koordinat</th>
                <td>
                    @if ($report->latitude !== null && $report->longitude !== null)
                        {{ $report->latitude }}, {{ $report->longitude }}
                    @else
                        -
                    @endif
                </td>
            </tr>
            <tr><th>Deskripsi</th><td>{{ $report->description }}</td></tr>
        </table>
    </div>

    <div class="section">
        <h2>Penanganan</h2>
        <table class="detail">
            <tr><th>Petugas Ditugaskan</th><td>{{ $report->assignedOperator?->name ?? 'Belum ditugaskan' }}</td></tr>
            <tr><th>Diverifikasi</th><td>{{ $report->accepted_at?->format('d M Y H:i') ?? '-' }}</td></tr>
            <tr><th>Mulai Diproses</th><td>{{ $report->processed_at?->format('d M Y H:i') ?? '-' }}</td></tr>
            <tr><th>Selesai</th><td>{{ $report->resolved_at?->format('d M Y H:i') ?? '-' }}</td></tr>
            <tr><th>Catatan Penanganan</th><td>{{ $report->resolution_note ?? '-' }}</td></tr>
            <tr><th>Foto Bukti</th><td>{{ $report->attachments->count() }} berkas</td></tr>
        </table>
    </div>

    <div class="section">
        <h2>Riwayat Status</h2>
        <table class="history">
            <thead>
                <tr>
                    <th>Waktu</th>
                    <th>Dari</th>
                    <th>Ke</th>
                    <th>Oleh</th>
                    <th>Catatan</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($report->statusHistories as $history)
                    <tr>
                        <td>{{ $history->created_at?->format('d M Y H:i') }}</td>
                        <td>{{ $history->from_status?->value ?? '-' }}</td>
                        <td>{{ $history->to_status->value }}</td>
                        <td>{{ $history->actor?->name ?? 'Sistem' }}</td>
                        <td>{{ $history->note ?? '-' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="5">Belum ada riwayat status.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <p class="footer">
        Dokumen ini dibuat otomatis oleh sistem SiagaKota dan tidak memerlukan tanda tangan basah.
    </p>
</body>
</html>
