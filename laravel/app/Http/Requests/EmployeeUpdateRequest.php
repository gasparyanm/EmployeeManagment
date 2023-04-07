<?php

namespace App\Http\Requests;

use App\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;

class EmployeeUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        $employee = $this->route('employee');

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
                Rule::unique('employees', 'email')->ignore($employee->id, 'id')
            ],
            'phone' => [
                'required',
                Rule::unique('employees', 'email')->ignore($employee->id, 'id')
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
