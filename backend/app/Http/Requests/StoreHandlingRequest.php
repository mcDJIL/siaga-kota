<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHandlingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'notes' => ['required', 'string', 'min:10', 'max:1000'],
            'evidence' => ['nullable', 'array', 'max:5'],
            'evidence.*' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'notes.required' => 'Catatan penanganan wajib diisi.',
            'notes.min' => 'Catatan penanganan minimal 10 karakter.',
            'notes.max' => 'Catatan penanganan maksimal 1000 karakter.',
            'evidence.max' => 'Maksimal 5 foto bukti penanganan.',
            'evidence.*.image' => 'File harus berupa gambar.',
            'evidence.*.mimes' => 'Format gambar harus JPG, PNG, atau WebP.',
            'evidence.*.max' => 'Ukuran foto maksimal 5MB.',
        ];
    }
}
