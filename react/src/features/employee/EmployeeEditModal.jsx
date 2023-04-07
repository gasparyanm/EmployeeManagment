import * as React from 'react';
import Modal from '@mui/material/Modal';
import {useEffect} from "react";
import {clearEditData, toggleEditModal, updateEmployee} from "../../slice/employee";
import {useDispatch, useSelector} from "react-redux";
import EmployeeForm from "./EmployeeForm";
import {clearErrors, clearMessage} from "../../slice/messages";
import {Box} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const EmployeeEditModal = ({openModal}) => {
    const [open, setOpen] = React.useState(false);
    const {errors, message} = useSelector(state => state.message);
    const {selectedEmployee} = useSelector(state => state.employee);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(toggleEditModal({employee: null}));
        dispatch(clearEditData());
        dispatch(clearMessage());
        dispatch(clearErrors());
    }

    const handleSubmit = (employeeData) => {
       dispatch(updateEmployee({
           payload:employeeData,
           employeeId: selectedEmployee.id
       }));
    }

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearErrors());
    }, [dispatch]);

    useEffect(() => {
        if (openModal) {
            setOpen(true);
        }
    }, [openModal])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-modal-title">Update employee data</h2>
                    {
                        message && <div className="alert alert-success">{message}</div>
                    }
                    <EmployeeForm
                        employee={selectedEmployee}
                        errors={errors}
                        action='update'
                        onSubmit={handleSubmit}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default EmployeeEditModal