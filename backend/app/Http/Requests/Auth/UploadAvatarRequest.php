<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UploadAvatarRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'avatar_path' => ['required', 'file', 'mimes:jpeg,png,jpg,gif,webp', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'avatar_path.required' => 'File avatar harus diunggah.',
            'avatar_path.file' => 'Avatar harus berupa file.',
            'avatar_path.mimes' => 'Format file avatar harus jpeg, png, jpg, gif, atau webp.',
            'avatar_path.max' => 'Ukuran file avatar tidak boleh lebih dari 5MB.',
        ];
    }
}
