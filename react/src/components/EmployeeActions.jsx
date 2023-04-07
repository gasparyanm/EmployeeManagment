import {useDispatch} from "react-redux";
import {deleteEmployee, toggleEditModal} from "../slice/employee";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const EmployeeActions = ({employee}) => {
    const dispatch = useDispatch();
    const handleClickEditButton = () => {
        dispatch(toggleEditModal({employee: employee}));
    }
    const handleClickDeleteButton = () => {
        dispatch(deleteEmployee(employee.id));
    }
    return (
        <Stack direction="row" spacing={1}>
            <IconButton color="primary" aria-label="delete" onClick={handleClickEditButton}>
                <EditIcon />
            </IconButton>
            {
                (
                    employee.position !== 'Administrative Assistant' &&
                    <IconButton color="secondary" aria-label="delete" onClick={handleClickDeleteButton}>
                        <DeleteIcon />
                    </IconButton>
                )
            }
        </Stack>
    );
}

export default EmployeeActions;