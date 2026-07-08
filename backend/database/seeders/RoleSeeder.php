<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            'reports.create',
            'reports.view.own',
            'reports.view.region',
            'reports.view.any',
            'reports.update.status',
            'announcements.view',
            'announcements.manage',
            'users.manage',
            'analytics.view',
            'exports.view',
            'predictions.view',
            'notifications.view',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'sanctum');
        }

        Role::findOrCreate('warga', 'sanctum')->syncPermissions([
            'reports.create',
            'reports.view.own',
            'announcements.view',
            'predictions.view',
            'notifications.view',
        ]);

        Role::findOrCreate('petugas', 'sanctum')->syncPermissions([
            'reports.view.region',
            'reports.update.status',
            'notifications.view',
        ]);

        Role::findOrCreate('admin', 'sanctum')->syncPermissions($permissions);
    }
}
