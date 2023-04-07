<?php

namespace App\Http\Requests;

use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class EmployeeStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'firstName' => [
                'required',
                'string',
            ],
            'lastName' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('employees','email'),
            ],
            'phone' => [
                'required',
                Rule::unique('employees','phone'),
            ],
            'note' => [
                'nullable',
            ],
            'position' => [
                'required',
                Rule::in(Arr::except(Employee::POSITIONS, [Employee::ADMINISTRATIVE_ASSISTANT])),
            ],
            'parentId' => [
                'nullable',
                Rule::exists('employees', 'id'),
            ]
        ];
    }
}
