import {configureStore} from "@reduxjs/toolkit";
import employeeReducer from '../slice/employee'
import messageReducer from '../slice/messages';

export default configureStore({
    reducer: {
        employee: employeeReducer,
        message: messageReducer
    },
    devTools: true,
})