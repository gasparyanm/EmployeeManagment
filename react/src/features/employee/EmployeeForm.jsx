import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Save, Update} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getParentsByPosition, getEmployeePositions} from "../../slice/employee";

const EmployeeForm = ({employee, errors, action, onSubmit}) => {
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [position, setPosition] = useState(employee.position);
    const [phone, setPhone] = useState(employee.phone);
    const [note, setNote] = useState(employee.note);
    const [parentId, setParentId] = useState(employee.parentId ? employee.parentId : "");

    const { positions, parents } = useSelector((state) => state.employee);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeePositions());
        if (position) {
            dispatch(getParentsByPosition(position));
        }
    }, [position, dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({firstName, lastName, email, phone, position, parentId, note});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <FormControl className="p-2">
                    <TextField
                        error={!!errors?.firstName?.message}
                        helperText={errors?.firstName?.message}
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </FormControl>
                <FormControl className="p-2">
                    <TextField
                        error={!!errors?.lastName?.message}
                        helperText={errors?.lastName?.message}
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </FormControl>
                <FormControl className="p-2">
                    <TextField
                        error={!!errors?.email?.message}
                        helperText={errors?.email?.message}
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className="p-2">
                    <TextField
                        error={!!errors?.phone?.message}
                        helperText={errors?.phone?.message}
                        label="Phone Number"
                        fullWidth
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </FormControl>
                <FormControl className="p-2" style={{minWidth: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Position</InputLabel>
                    <Select
                        error={!!errors?.position?.message}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={position === 'Administrative Assistant'}
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                    >
                        {
                            positions.map(
                                (positionName) => {
                                    return (
                                        <MenuItem
                                            key={positionName}
                                            value={positionName}
                                        >
                                            {positionName}
                                        </MenuItem>
                                    )
                                }
                            )
                        }
                    </Select>
                </FormControl>
                <FormControl className="p-2" style={{minWidth: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Parent</InputLabel>
                    <Select
                        error={!!errors?.parentId?.message}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={parentId}
                        disabled={parents.length === 0}
                        onChange={(event) => setParentId(event.target.value)}
                    >
                        {
                            parents.map(
                                (parent) => {
                                    return (
                                        <MenuItem
                                            key={parent.id}
                                            value={parent.id}
                                        >
                                            {parent.firstName + ' ' + parent.lastName}
                                        </MenuItem>
                                    )
                                }
                            )
                        }
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className="p-2" style={{minWidth: '752px'}}>
                    <TextField
                        error={!!errors?.note?.message}
                        helperText={errors?.note?.message}
                        label="Note"
                        multiline
                        rows={4}
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>
            </div>

            <div className="p-2">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={action === 'create' ? <Save /> : <Update />}
                    type="submit"
                >
                    { action === 'create' ? 'Save' : 'Update' }
                </Button>
            </div>
        </form>
    );
}

export default EmployeeForm