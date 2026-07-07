<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
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
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        Role::findOrCreate('warga', 'sanctum');

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
            'role' => 'warga',
            'active' => true,
        ]);

        $user->assignRole('warga');

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $token,
            ],
            'message' => 'Registrasi berhasil.',
        ], 201);
    }

    /**
     * @group Auth
     * @unauthenticated
     * @bodyParam login string required Email atau nomor telepon.
     * @bodyParam password string required Password akun.
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()
            ->where('email', $data['login'])
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

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
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
        $user = $request->user();

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
            ],
        ]);
    }

    /**
     * @group Auth
     * @authenticated
     */
    public function updateMe(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'phone' => [
                'sometimes',
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'phone')->ignore($user->id),
            ],
            'password' => ['sometimes', 'required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->fill($data)->save();

        return response()->json([
            'data' => [
                'user' => $this->userPayload($user),
            ],
            'message' => 'Profil berhasil diperbarui.',
        ]);
    }

    private function userPayload(User $user): array
    {
        return $user->only(['id', 'name', 'email', 'phone', 'role', 'active']);
    }
}
