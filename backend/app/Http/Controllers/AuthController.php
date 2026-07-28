<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    /**
     * @group Auth
     * @unauthenticated
     * @bodyParam name string required Nama pengguna.
     * @bodyParam email string required Email pengguna.
     * @bodyParam phone string required Nomor telepon pengguna.
     * @bodyParam password string required Password minimal 8 karakter.
     * @bodyParam password_confirmation string required Konfirmasi password.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => $data['password'],
            'role' => UserRole::Warga->value,
            'rw' => $data['rw'] ?? null,
            'rt' => $data['rt'] ?? null,
            'village_id' => $data['village_id'] ?? null,
            'active' => true,
            'settings' => [],
        ]);

        $user->assignRole(UserRole::Warga->value);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
            'message' => 'Registrasi berhasil.',
        ], 201);
    }

    /**
     * @group Auth
     * @unauthenticated
     * @bodyParam email string required Email pengguna.
     * @bodyParam password string required Password akun.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::query()
            ->where('email', $data['email'])
            ->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah.',
            ], 401);
        }

        if (! $user->active) {
            return response()->json([
                'message' => 'Akun Anda dinonaktifkan. Silakan hubungi admin.',
            ], 403);
        }

        $user->forceFill([
            'last_login_at' => now(),
        ])->save();

        $user->load('department');
        
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
            'message' => 'Login berhasil.',
        ]);
    }

    /**
     * @group Auth
     * @authenticated
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    /**
     * @group Auth
     * @authenticated
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('department');

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
            ],
        ]);
    }

    /**
     * @group Auth
     * @authenticated
     */
    public function updateMe(UpdateProfileRequest $request): JsonResponse
    {
        $data = $request->validated();

        unset($data['password_confirmation']);

        if (! array_key_exists('password', $data)) {
            unset($data['password']);
        }

        $request->user()->fill($data)->save();

        return response()->json([
            'data' => [
                'user' => new UserResource($request->user()->fresh()),
            ],
            'message' => 'Profil berhasil diperbarui.',
        ]);
    }

    private function userPayload(User $user): array
    {
        return $user->only(['id', 'name', 'email', 'phone', 'role', 'active']);
    }
}
