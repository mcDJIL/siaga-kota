<?php

namespace App\Enums;

enum ReportStatus: string
{
    case Menunggu = 'menunggu';
    case Diverifikasi = 'diverifikasi';
    case Ditugaskan = 'ditugaskan';
    case Diproses = 'diproses';
    case Selesai = 'selesai';
    case Ditolak = 'ditolak';
}
