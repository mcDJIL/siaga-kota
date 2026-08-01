<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Daftar instansi/dinas untuk dropdown profil petugas & filter analitik.
     *
     * @group Admin - Departments
     * @authenticated
     */
    public function index(Request $request): JsonResponse
    {
        $departments = Department::query()
            ->when(
                $request->boolean('only_active', true),
                fn ($q) => $q->where('active', true),
            )
            ->withCount('users')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $departments->map(fn (Department $department) => [
                'id' => $department->id,
                'name' => $department->name,
                'slug' => $department->slug,
                'type' => $department->type->value,
                'type_label' => $department->type->label(),
                'active' => $department->active,
                'users_count' => $department->users_count,
            ]),
        ]);
    }
}
