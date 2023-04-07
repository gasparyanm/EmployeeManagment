<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeUpdateRequest;
use App\Http\Requests\EmployeeSearchRequest;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Services\EmployeeService;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class EmployeeController extends Controller
{
    public function index(
        EmployeeSearchRequest $employeeSearchRequest,
        EmployeeService $employeeService
    ): ResourceCollection {
        return EmployeeResource::collection(
            $employeeService->getEmployeeByParentId($employeeSearchRequest)
        );
    }

    public function store(
        EmployeeStoreRequest $employeeStoreRequest
    ): EmployeeResource {
        $employee = Employee::query()
            ->create(Arr::snakeKeys($employeeStoreRequest->validated()));

        return (new EmployeeResource($employee))
            ->additional([
                'message' => 'Employee successfully created',
            ]);
    }

    public function show(
        Employee $employee
    ): EmployeeResource {
        return new EmployeeResource($employee);
    }

    public function update(
        EmployeeUpdateRequest $employeeUpdateRequest,
        Employee $employee,
        EmployeeService $employeeService
    ): EmployeeResource {
        $currentPosition = $employee->position;

        $employee->update(Arr::snakeKeys($employeeUpdateRequest->validated()));
        $employee->refresh();

        if ($employeeService->isEmployeePositionDecreased($currentPosition, $employeeUpdateRequest->position)) {
            $employee->children()->update(['parent_id' => null]);
        }

        return (new EmployeeResource($employee))
            ->additional([
                'message' => 'Employee successfully updated',
            ]);
    }

    public function destroy(
        Employee $employee,
        DatabaseManager $databaseManager
    ): int {
        return $databaseManager->transaction(function () use ($employee) {
            $parentEmployee = $employee->parent;

            if (is_null($parentEmployee)) {
                $randomChildEmployee = $employee->children()->inRandomOrder()->first();
                $randomChildEmployee->update(['parent_id' => null]);
                $parentEmployee = $randomChildEmployee;
            }

            $employee->children()->update(['parent_id' => $parentEmployee->id]);

            return $employee->delete();
        });
    }

    public function positions(
        EmployeeService $employeeService
    ): array {
        return $employeeService->availablePositions();
    }

    public function getParentsByPosition(
        string $employeePosition,
        EmployeeService $employeeService
    ): ResourceCollection {
        return EmployeeResource::collection(
            $employeeService->getParentsByPosition($employeePosition)
        );
    }
}
