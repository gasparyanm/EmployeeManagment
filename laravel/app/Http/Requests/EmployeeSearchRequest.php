<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeSearchRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'parentId' => [
                'nullable',
            ]
        ];
    }
}
