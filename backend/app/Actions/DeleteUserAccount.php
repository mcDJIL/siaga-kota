<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class DeleteUserAccount
{
    /**
     * Hapus akun warga sesuai PLAN §6.1 (Danger Zone): soft delete akun,
     * revoke seluruh token, dan purge data personal yang tidak lagi diperlukan.
     *
     * Email & telepon dianonimkan karena kolomnya unique — tanpa ini, baris
     * yang sudah di-soft-delete akan memblokir pendaftaran ulang dengan
     * email yang sama.
     */
    public function execute(User $user): void
    {
        DB::transaction(function () use ($user): void {
            $user->tokens()->delete();
            $user->pushSubscriptions()->delete();

            $suffix = now()->timestamp;

            $user->forceFill([
                'email' => "deleted-{$suffix}-{$user->email}",
                'phone' => "deleted-{$suffix}-{$user->phone}",
                'active' => false,
                'settings' => [],
            ])->save();

            $user->delete();
        });
    }
}
