<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
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

        $permissionNames = [
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

        $permissions = collect($permissionNames)
            ->mapWithKeys(function (string $permission): array {
                return [
                    $permission => Permission::findOrCreate($permission, 'sanctum'),
                ];
            });

        Role::findOrCreate('warga', 'sanctum')->syncPermissions([
            $this->permissions($permissions, [
                'reports.create',
                'reports.view.own',
                'announcements.view',
                'predictions.view',
                'notifications.view',
            ]),
        ]);

        Role::findOrCreate('petugas', 'sanctum')->syncPermissions([
            $this->permissions($permissions, [
                'reports.view.region',
                'reports.update.status',
                'notifications.view',
            ]),
        ]);

        Role::findOrCreate('admin', 'sanctum')->syncPermissions(
            $permissions->values()->all(),
        );

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @param  Collection<string, Permission>  $permissions
     * @param  array<int, string>  $names
     * @return array<int, Permission>
     */
    private function permissions(Collection $permissions, array $names): array
    {
        return $permissions
            ->only($names)
            ->values()
            ->all();
    }
}
