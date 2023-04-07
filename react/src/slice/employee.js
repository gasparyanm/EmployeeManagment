import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import employeeService from '../service/employee.service';
import {setErrors, setMessage} from "./messages";
import EmployeeActions from "../components/EmployeeActions";

export const columns = [
    {name: 'id', title: 'Id'},
    {name: 'position', title: 'Position'},
    {name: 'firstName', title: 'First Name'},
    {name: 'lastName', title: 'Last Name'},
    {name: 'email', title: 'Email'},
    {name: 'phone', title: 'Phone'},
    {name: 'note', title: 'Note'},
    {name: 'action', title: 'Action',  getCellValue: row => <EmployeeActions employee={row} />}
];

export const getEmployees = createAsyncThunk(
    "employees/index",
    async (parentId, thunkAPI) => {
        return await employeeService.listEmployee(parentId)
            .then(employees => {
                return {employees: employees}
            })
            .catch(() => {
                return thunkAPI.rejectWithValue();
            })
    }
);

export const deleteEmployee = createAsyncThunk(
    "employees/delete",
    async (employeeId, thunkAPI) => {
        return await employeeService.deleteEmployee(employeeId)
            .then(() => {
                thunkAPI.dispatch(setMessage('Employee successfully deleted!'));
                return {employeeId: employeeId};
            })
            .catch(() => {
                return thunkAPI.rejectWithValue();
            })
    }
);

export const createEmployee = createAsyncThunk(
    "employees/create",
    async (payload, thunkAPI) => {
        return await employeeService.createEmployee(payload)
            .then(response => {
                thunkAPI.dispatch(setMessage(response.message));
            })
            .catch((error) => {
                thunkAPI.dispatch(setErrors(error.errors));
                return thunkAPI.rejectWithValue();
            })
    }
);

export const updateEmployee = createAsyncThunk(
    "employees/update",
    async ({payload, employeeId}, thunkAPI) => {
        return await employeeService.updateEmployee(payload, employeeId)
            .then(response => {
                thunkAPI.dispatch(setMessage(response.message));
                return {employee: response.data}
            })
            .catch((error) => {
                thunkAPI.dispatch(setErrors(error.errors));
                return thunkAPI.rejectWithValue();
            })
    }
);

export const getEmployeePositions = createAsyncThunk(
    "employees/positions",
    async (payload, thunkAPI) => {
        return await employeeService.getPositions()
            .then(positions => {
                return {positions: positions}
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue();
            })
    }
);
export const getParentsByPosition = createAsyncThunk(
    "employees/position/parents",
    async (position, thunkAPI) => {
        return await employeeService.getParentsByPosition(position)
            .then(parents => {
                return {parents: parents}
            })
            .catch(() => {
                return thunkAPI.rejectWithValue();
            })
    }
);


const initialState = {
    employees: [],
    isEmployeesLoaded: false,
    positions: [],
    parents: [],
    openEditModal: false,
    selectedEmployee: null,
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        toggleEditModal: (state, action) => {
            state.openEditModal = !state.openEditModal;
            state.selectedEmployee = action.payload.employee;
        },
        clearEditData: (state) => {
            state.positions = [];
            state.parents = [];
        },
        clearEmployee: (state) => {
            state.employees = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.isEmployeesLoaded = true;
                let employees = action.payload.employees;
                state.employees = state.employees.concat(...employees);
            })
            .addCase(getEmployees.rejected, (state) => {
                state.isEmployeesLoaded = true;
                state.employees = [];
            })
            .addCase(getEmployeePositions.fulfilled, (state, action) => {
                state.positions = action.payload.positions;
            })
            .addCase(getEmployeePositions.rejected, (state) => {
                state.positions = [];
            })
            .addCase(getParentsByPosition.fulfilled, (state, action) => {
                state.parents = action.payload.parents;
            })
            .addCase(getParentsByPosition.rejected, (state) => {
                state.parents = [];
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                let newEmployee = action.payload.employee;
                let index = state.employees.findIndex(function (employee) {
                    return employee.id === newEmployee.id
                })
                state.employees[index] = newEmployee;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                let employeeId = action.payload.employeeId;
                state.employees = state.employees.filter(function (employee) {
                    return employee.id !== employeeId
                })
            })
    },
})

export const {toggleEditModal, clearEditData, clearEmployee} = employeeSlice.actions;

export default employeeSlice.reducer;