import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    message: '',
    errors: {}
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return { message: action.payload };
        },
        clearMessage: () => {
            return { message: "" };
        },
        setErrors: (state, action) => {
            let errors = {};
            for (let currentProperty in action.payload) {
                if (action.payload.hasOwnProperty(currentProperty)) {
                    if (Array.isArray(action.payload[currentProperty])) {
                        errors[currentProperty] = {
                            message: action.payload[currentProperty][0]
                        }
                    }
                }
            }
            state.errors = errors;
        },
        clearErrors: (state) => {
            state.errors = {}
        }
    }
})

export const {
    setMessage,
    clearMessage ,
    setErrors,
    clearErrors
} = messageSlice.actions

export default messageSlice.reducer;