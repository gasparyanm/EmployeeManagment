<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public const POSITION_COUNTS = [
        Employee::ADMINISTRATIVE_ASSISTANT => 1,
        Employee::EXECUTIVE_ASSISTANT => 2,
        Employee::MARKETING_MANAGER => 3,
        Employee::CUSTOMER_SERVICE_REPRESENTATIVE => 3,
        Employee::NURSE_PRACTITIONER => 3,
        Employee::SOFTWARE_ENGINEER => 4,
        Employee::SALES_MANAGER => 4,
        Employee::DATA_ENTRY_CLERK => 3,
        Employee::OFFICE_ASSISTANT => 3,
    ];

    public function run(): void
    {
        $this->createEmployeeRecursive(null, Employee::ADMINISTRATIVE_ASSISTANT);
    }

    private function createEmployeeRecursive(?Employee $parent, ?string $position)
    {
        if (is_null($position)) {
            return;
        }

        $count = self::POSITION_COUNTS[$position];

        $employees = Employee::factory()
            ->count($count)
            ->create([
                'parent_id' => optional($parent)->id,
                'position' => $position
            ]);

        foreach ($employees as $employee) {
            $nextPosition = Employee::POSITIONS[array_search($position, Employee::POSITIONS) + 1] ?? null;

            $this->createEmployeeRecursive($employee, $nextPosition);
        }
    }
}
