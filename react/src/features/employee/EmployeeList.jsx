import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import { Grid, VirtualTable, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { Loading } from "../loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees, clearEmployee} from "../../slice/employee";
import EmployeeEditModal from "./EmployeeEditModal";
import {columns} from "../../slice/employee";

const EmployeeList = () => {
    const dispatch = useDispatch();

    const [tableColumnExtensions] = useState([
        { columnName: 'note', width: 200 },
    ]);
    const [expandedRowIds, setExpandedRowIds] = useState([]);

    const { isEmployeesLoaded, employees, openEditModal } = useSelector((state) => state.employee);

    const getRowId = (row) => {
        return row.id;
    }

    const getChildRows = (row, rootRows) => {
        const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
        if (childRows.length) {
            return childRows;
        }
        return row && row.hasChildren ? [] : null;
    };

    const handleExpandedRowIdsChange = (rowIds) => {
        const rowIdsWithNotLoadedChildes = [null, ...rowIds]
            .filter(rowId => employees.findIndex(row => row.parentId === rowId) === -1);
        if (rowIdsWithNotLoadedChildes.length) {
            let parentId = rowIdsWithNotLoadedChildes[0];
            dispatch(getEmployees(parentId));
        }
        setExpandedRowIds(rowIds);
    }

    useEffect(() => {
        dispatch(getEmployees(''));
        return () => {
            dispatch(clearEmployee());
        };
    }, [dispatch]);

    return (
        <Paper style={{ position: 'relative', height: 'auto'}}>
            <EmployeeEditModal openModal={openEditModal}/>
            <Grid
                rows={employees}
                columns={columns}
                getRowId={getRowId}
            >
                <TreeDataState
                    expandedRowIds={expandedRowIds}
                    onExpandedRowIdsChange={handleExpandedRowIdsChange}
                />
                <CustomTreeData
                    getChildRows={getChildRows}
                />
                <VirtualTable
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
                <TableTreeColumn for="id"/>
            </Grid>
            {!isEmployeesLoaded && <Loading />}
        </Paper>
    );
}

export default EmployeeList;