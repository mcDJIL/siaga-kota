<?php

namespace App\Http\Controllers\Government;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'role' => ['nullable', Rule::in('admin', 'petugas', 'warga')],
            'status' => ['nullable', Rule::in('aktif', 'nonaktif')],
            'department' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
            'sort' => 'nullable|string|in:name,email,created_at',
            'order' => 'nullable|string|in:asc,desc',
        ]);

        $query = User::query()->with('department', 'roles');

        // Search across name, email, employee_id
        if ($validated['search'] ?? null) {
            $search = $validated['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('employee_id', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($validated['role'] ?? null) {
            $query->whereHas('roles', fn ($q) => $q->where('name', $validated['role']));
        }

        // Filter by status (active = true/false)
        if ($validated['status'] ?? null) {
            $isActive = $validated['status'] === 'aktif';
            $query->where('active', $isActive);
        }

        // Filter by department
        if ($validated['department'] ?? null) {
            $query->where('department_id', $validated['department']);
        }

        // Sort
        $sortColumn = $validated['sort'] ?? 'created_at';
        $sortOrder = $validated['order'] ?? 'desc';
        $query->orderBy($sortColumn, $sortOrder);

        $users = $query->paginate($validated['per_page'] ?? 10);

        $formattedUsers = $users->items();
        $formattedUsers = array_map(fn ($user) => $this->formatUser($user), $formattedUsers);

        return response()->json([
            'data' => [
                'users' => $formattedUsers,
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
            ],
            'message' => 'Data pengguna berhasil diambil.',
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $user = User::with('department', 'roles')->findOrFail($id);

        return response()->json([
            'data' => $this->formatUser($user),
            'message' => 'Detail pengguna berhasil diambil.',
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => 'required|string|min:8',
            'employee_id' => 'nullable|string|unique:users,employee_id',
            'position' => 'nullable|string|max:255',
            'department_id' => 'nullable|exists:departments,id',
            'institution' => 'nullable|string|max:255',
            'status' => ['nullable', Rule::in('Aktif', 'Nonaktif', 'aktif', 'nonaktif')],
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ], [
            'email.unique' => 'Email sudah terdaftar.',
            'phone.unique' => 'Nomor telepon sudah terdaftar.',
            'employee_id.unique' => 'NIP/ID Karyawan sudah terdaftar.',
        ]);

        if (empty($validated['department_id']) && ! empty($validated['institution'])) {
            $validated['department_id'] = Department::query()
                ->where('name', $validated['institution'])
                ->orWhere('slug', Str::slug($validated['institution']))
                ->value('id');
        }

        if ($request->hasFile('avatar')) {
            $validated['avatar_path'] = 'storage/'.$request->file('avatar')->store('avatars', 'public');
        }

        $validated['password'] = Hash::make($validated['password']);
        $validated['active'] = ! in_array($validated['status'] ?? 'Aktif', ['Nonaktif', 'nonaktif'], true);
        $validated['role'] = 'petugas';
        unset($validated['institution'], $validated['status'], $validated['avatar']);

        $user = User::create($validated);

        // Assign petugas role by default
        $user->assignRole('petugas');

        return response()->json([
            'data' => $this->formatUser($user->load('department', 'roles')),
            'message' => 'Pengguna berhasil dibuat.',
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'employee_id' => 'nullable|string|unique:users,employee_id,'.$user->id,
            'position' => 'nullable|string|max:255',
            'department_id' => 'nullable|exists:departments,id',
            'password' => 'nullable|string|min:8',
        ]);

        // Hash password if provided
        if ($validated['password'] ?? null) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'data' => $this->formatUser($user->load('department', 'roles')),
            'message' => 'Data pengguna berhasil diperbarui.',
        ]);
    }

    public function toggleStatus(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $newStatus = ! $user->active;
        $user->update(['active' => $newStatus]);

        return response()->json([
            'data' => $this->formatUser($user),
            'message' => 'Pengguna berhasil di'.($newStatus ? 'aktifkan' : 'nonaktifkan').'.',
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $userName = $user->name;
        $avatarPath = $user->avatar_path;

        $user->delete();

        if ($avatarPath && Str::startsWith($avatarPath, 'storage/')) {
            Storage::disk('public')->delete(Str::after($avatarPath, 'storage/'));
        }

        return response()->json([
            'message' => "Pengguna \"{$userName}\" berhasil dihapus.",
        ]);
    }

    public function getStatistics(): JsonResponse
    {
        $totalUsers = User::count();
        $activeUsers = User::where('active', true)->count();
        $inactiveUsers = User::where('active', false)->count();

        $roleBreakdown = [];
        $roles = ['admin', 'petugas', 'warga'];
        foreach ($roles as $role) {
            $count = User::whereHas('roles', fn ($q) => $q->where('name', $role))->count();
            $roleBreakdown[] = [
                'role' => $role,
                'count' => $count,
            ];
        }

        $newThisMonth = User::whereBetween('created_at', [
            now()->startOfMonth(),
            now()->endOfMonth(),
        ])->count();

        $lastMonth = User::whereBetween('created_at', [
            now()->subMonth()->startOfMonth(),
            now()->subMonth()->endOfMonth(),
        ])->count();

        $trend = $lastMonth > 0 ? round((($newThisMonth - $lastMonth) / $lastMonth) * 100) : 0;

        return response()->json([
            'data' => [
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'inactive_users' => $inactiveUsers,
                'role_breakdown' => $roleBreakdown,
                'new_this_month' => $newThisMonth,
                'trend_percent' => $trend,
            ],
        ]);
    }

    private function formatUser($user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'nip' => $user->employee_id,
            'position' => $user->position,
            'department' => $user->department?->name,
            'institution' => $user->department?->name,
            'district' => $user->village_id ?? 'N/A',
            'avatarUrl' => $user->avatar_url,
            'status' => $user->active ? 'Aktif' : 'Nonaktif',
            'active' => $user->active,
            'role' => $user->roles->first()?->name ?? 'warga',
            'dateJoined' => $user->created_at->format('d M Y'),
            'lastLogin' => $user->last_login_at?->format('d M Y H:i') ?? 'Never',
        ];
    }
}
