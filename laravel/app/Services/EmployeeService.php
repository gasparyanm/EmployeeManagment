<?php

namespace App\Services;

use App\Http\Requests\EmployeeSearchRequest;
use App\Models\Employee;
use Illuminate\Support\Collection;

class EmployeeService
{
    public function getEmployeeByParentId(
        EmployeeSearchRequest $employeeSearchRequest
    ): Collection {
        return Employee::query()
            ->with('children')
            ->where('parent_id', $employeeSearchRequest->parentId)
            ->get();
    }

    public function getParentsByPosition(
        string $employeePosition
    ): Collection {
        if ($employeePosition === Employee::ADMINISTRATIVE_ASSISTANT) {
            return new Collection();
        }

        $parentPosition = null;

        foreach (Employee::POSITIONS as $index => $position) {
            if ($position === $employeePosition) {
                $parentPosition = Employee::POSITIONS[$index - 1];
                break;
            }
        }

        return Employee::query()->where('position', $parentPosition)->get();
    }

    public function isEmployeePositionDecreased(
        string $currentPosition,
        string $nextPosition
    ): bool {
        $currentPositionIndex = array_search($currentPosition, Employee::POSITIONS);
        $nextPositionIndex = array_search($nextPosition, Employee::POSITIONS);

        return $nextPositionIndex > $currentPositionIndex;
    }

    public function availablePositions(): array
    {
        $positions = Employee::POSITIONS;
        array_shift($positions);

        return $positions;
    }
}
