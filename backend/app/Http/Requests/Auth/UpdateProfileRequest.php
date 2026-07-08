<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $user = $this->user();

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                Rule::unique('users', 'email')->ignore($user?->id),
            ],
            'phone' => [
                'sometimes',
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'phone')->ignore($user?->id),
            ],
            'password' => ['sometimes', 'required', 'string', 'min:8', 'confirmed'],
            'rw' => ['nullable', 'string', 'max:3'],
            'rt' => ['nullable', 'string', 'max:3'],
            'village_id' => ['nullable', 'string', 'max:255'],
            'settings' => ['nullable', 'array'],
        ];
    }
}
