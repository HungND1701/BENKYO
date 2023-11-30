<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddFlashcardRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'word' => 'string|required|min:0|max:255',
            'meaning' => 'string|required|min:0|max:255',
            'tag_id' => 'required|exists:tags'
        ];
    }
}
