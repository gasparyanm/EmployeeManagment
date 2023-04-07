import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, clearMessage} from "../../slice/messages";
import {createEmployee} from "../../slice/employee";
import EmployeeForm from "./EmployeeForm";

const EmployeeCreate = () => {
    const {message, errors} = useSelector(state => state.message);

    const [employeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        parentId: '',
        note: '',
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearErrors());
    }, [dispatch]);

    const handleSubmit = (employeeData) => {
        dispatch(createEmployee(employeeData)).unwrap();
    };

    return (
        <div className="container-fluid">
            {
                message && <div className="alert alert-success">{message}</div>
            }
            <EmployeeForm
                employee={employeeData}
                errors={errors}
                action='create'
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default EmployeeCreate;