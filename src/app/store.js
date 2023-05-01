import { configureStore } from "@reduxjs/toolkit";
import pollReducers from '../features/polls/pollsSlice';
import authReducers from '../features/auth/authSlice';
import contractReducers from '../features/contract/contractSlice';

export const store = configureStore({
    reducer: {
        polls : pollReducers,
        auth : authReducers,
        contract: contractReducers,
    }
})