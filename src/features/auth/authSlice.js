import { createSlice } from "@reduxjs/toolkit";
import { signup, signin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: null, // for user object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut(state, action){
            localStorage.removeItem('profile')
            localStorage.removeItem('userToken')
            state.userInfo = null
            state.userToken = null
        }
    },
    extraReducers: {
        // signup user
        [signup.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [signup.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
            state.userInfo = payload.result
            state.userToken = payload.token
        },
        [signup.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // signin user
        [signin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [signin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload.result
            state.userToken = payload.token            
        },
        [signin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

export const { logOut } = authSlice.actions;
export default authSlice.reducer
