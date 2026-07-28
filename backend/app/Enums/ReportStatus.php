<?php

namespace App\Enums;

enum ReportStatus: string
{
    case Menunggu = 'menunggu';
    case Diverifikasi = 'diverifikasi';
    case Diproses = 'diproses';
    case Selesai = 'selesai';
    case Ditolak = 'ditolak';
}
