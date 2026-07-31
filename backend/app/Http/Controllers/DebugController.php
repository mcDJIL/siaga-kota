<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DebugController extends Controller
{
    /**
     * Test file upload
     */
    public function testFileUpload(Request $request): JsonResponse
    {
        \Log::info('=== Test File Upload Started ===');

        // Check if file exists
        if (!$request->hasFile('file')) {
            return response()->json([
                'success' => false,
                'message' => 'No file provided',
            ], 400);
        }

        $file = $request->file('file');
        
        \Log::info('File received', [
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime' => $file->getMimeType(),
            'is_valid' => $file->isValid(),
            'error' => $file->getError(),
        ]);

        // Try to store file
        try {
            $path = $file->store('test-avatars', 'public');
            
            \Log::info('File stored', [
                'path' => $path,
                'full_url' => '/storage/' . $path,
            ]);

            // Verify file exists
            $exists = Storage::disk('public')->exists($path);
            
            \Log::info('File verification', [
                'path' => $path,
                'exists' => $exists,
            ]);

            // Get file size
            if ($exists) {
                $size = Storage::disk('public')->size($path);
                $lastModified = Storage::disk('public')->lastModified($path);
                
                \Log::info('File details', [
                    'size' => $size,
                    'last_modified' => $lastModified,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => [
                    'path' => $path,
                    'url' => '/storage/' . $path,
                    'exists' => $exists,
                ],
            ]);

        } catch (\Exception $e) {
            \Log::error('File upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check storage paths
     */
    public function checkStoragePaths(): JsonResponse
    {
        $checks = [
            'storage_path' => storage_path(),
            'public_path' => public_path(),
            'storage_link_exists' => is_link(public_path('storage')),
            'storage_link_target' => is_link(public_path('storage')) ? readlink(public_path('storage')) : null,
            'storage_app_public_exists' => is_dir(storage_path('app/public')),
            'storage_app_public_writable' => is_writable(storage_path('app/public')),
            'public_storage_exists' => is_dir(public_path('storage')),
            'avatars_dir_exists' => is_dir(storage_path('app/public/avatars')),
            'avatars_dir_writable' => is_writable(storage_path('app/public/avatars')),
        ];

        \Log::info('Storage check', $checks);

        // Try to create avatars directory if not exists
        if (!is_dir(storage_path('app/public/avatars'))) {
            try {
                mkdir(storage_path('app/public/avatars'), 0755, true);
                $checks['avatars_dir_created'] = true;
            } catch (\Exception $e) {
                $checks['avatars_dir_create_error'] = $e->getMessage();
            }
        }

        return response()->json([
            'success' => true,
            'checks' => $checks,
        ]);
    }

    /**
     * Test avatar path saving to database
     */
    public function testDatabaseSave(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Test update
            $testPath = '/storage/avatars/test-' . time() . '.jpg';
            
            \Log::info('Testing database save', [
                'user_id' => $user->id,
                'test_path' => $testPath,
            ]);

            $user->update(['avatar_path' => $testPath]);
            
            // Reload from database
            $updated = $user->fresh();
            
            \Log::info('Database save result', [
                'saved_path' => $updated->avatar_path,
                'matches' => $updated->avatar_path === $testPath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Database save test passed',
                'data' => [
                    'test_path' => $testPath,
                    'saved_path' => $updated->avatar_path,
                    'matches' => $updated->avatar_path === $testPath,
                ],
            ]);

        } catch (\Exception $e) {
            \Log::error('Database save test failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Test failed: ' . $e->getMessage(),
            ], 500);
        }
    }
}
