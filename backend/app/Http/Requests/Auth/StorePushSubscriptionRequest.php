<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class StorePushSubscriptionRequest extends FormRequest
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
            'endpoint' => ['required', 'string', 'url', 'max:500'],
            'keys' => ['required', 'array'],
            'keys.p256dh' => ['required', 'string', 'max:255'],
            'keys.auth' => ['required', 'string', 'max:255'],
            'content_encoding' => ['nullable', 'string', 'max:50'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'endpoint.required' => 'Endpoint push wajib diisi.',
            'endpoint.url' => 'Endpoint push harus berupa URL yang valid.',
            'keys.required' => 'Kunci enkripsi push wajib diisi.',
            'keys.p256dh.required' => 'Kunci p256dh wajib diisi.',
            'keys.auth.required' => 'Kunci auth wajib diisi.',
        ];
    }
}
