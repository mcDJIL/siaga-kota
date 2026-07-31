<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Requests\Auth\UploadAvatarRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
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

        if (! array_key_exists('password', $data) || empty($data['password'])) {
            unset($data['password']);
        }

        $user = $request->user();
        $user->fill($data)->save();
        $user = $user->fresh();

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
            ],
            'message' => 'Profil berhasil diperbarui.',
        ]);
    }

    public function uploadAvatar(UploadAvatarRequest $request): JsonResponse
    {
        try {
            $file = $request->file('avatar_path');

            if (!$file || !$file->isValid()) {
                return response()->json([
                    'message' => 'File tidak valid.',
                ], 400);
            }

            $path = $file->store('avatars', 'public');

            if (!$path) {
                return response()->json([
                    'message' => 'Gagal menyimpan file ke storage.',
                ], 400);
            }

            $user = $request->user();

            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $user->avatar_path = 'storage/' . $path;
            $user->save();

            return response()->json([
                'data' => [
                    'user' => new UserResource($user->fresh()),
                ],
                'message' => 'Foto profil berhasil diperbarui.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengunggah avatar: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * @group Auth
     * @authenticated
     * @bodyParam current_password string required Password saat ini.
     * @bodyParam password string required Password baru minimal 8 karakter.
     * @bodyParam password_confirmation string required Konfirmasi password baru.
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = $request->user();
        $user->forceFill([
            'password' => $data['password'],
        ])->save();

        return response()->json([
            'data' => [
                'user' => new UserResource($user->fresh()),
            ],
            'message' => 'Password berhasil diperbarui.',
        ]);
    }

    /**
     * @group Auth
     * @unauthenticated
     * @bodyParam email string required Email pengguna.
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => $status === Password::RESET_LINK_SENT
                ? 'Tautan reset password berhasil dikirim ke email Anda.'
                : 'Gagal mengirim tautan reset password. Silakan coba lagi.',
        ], $status === Password::RESET_LINK_SENT ? 200 : 422);
    }

    /**
     * @group Auth
     * @unauthenticated
     * @bodyParam email string required Email pengguna.
     * @bodyParam token string required Token reset password.
     * @bodyParam password string required Password baru minimal 8 karakter.
     * @bodyParam password_confirmation string required Konfirmasi password baru.
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();

        $status = Password::reset(
            $data,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => $password,
                    'remember_token' => \Illuminate\Support\Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return response()->json([
            'message' => $status === Password::PASSWORD_RESET
                ? 'Password berhasil direset. Silakan login dengan password baru Anda.'
                : 'Token reset tidak valid atau telah kedaluwarsa.',
        ], $status === Password::PASSWORD_RESET ? 200 : 422);
    }

    private function userPayload(User $user): array
    {
        return $user->only(['id', 'name', 'email', 'phone', 'role', 'active']);
    }
}
