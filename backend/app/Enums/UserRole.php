<?php

namespace App\Enums;

enum UserRole: string
{
    case Warga = 'warga';
    case Petugas = 'petugas';
    case Admin = 'admin';
}
