<?php

namespace App\Http\Requests;

use App\Enums\WasteType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
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
            'category_id' => ['required', 'string', 'exists:report_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'address' => ['required', 'string', 'max:500'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'waste_type' => ['nullable', Rule::enum(WasteType::class)],
            'water_level_cm' => ['nullable', 'integer', 'min:0', 'max:1000'],
            'photos' => ['nullable', 'array', 'max:10'],
            'photos.*' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120'], // 5MB
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Kategori laporan wajib dipilih.',
            'category_id.exists' => 'Kategori laporan tidak valid.',
            'latitude.between' => 'Latitude harus antara -90 hingga 90.',
            'longitude.between' => 'Longitude harus antara -180 hingga 180.',
            'photos.max' => 'Maksimal 10 foto.',
            'photos.*.image' => 'File harus berupa gambar.',
            'photos.*.max' => 'Ukuran foto maksimal 5MB.',
        ];
    }
}
