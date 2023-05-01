import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import getBlockchain from './getContract';

const initialState = {
    contract: {},
    status: 'idle', // 'idle' or 'loading' or 'succeeded' or 'faild'
    error: null,
}

export const getContract = createAsyncThunk('blockchain/contract', async () => {
    try {
        const contract = await getBlockchain();
        return contract;
    } catch (error) {
        return error.message;
    }
})

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        createPoll(state, action) {
            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getContract.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getContract.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const contract = action.payload

                state.contract = contract
            })
            .addCase(getContract.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            // .addCase(getStatus)
    }
})


export const selectContract = (state) => state.contract.contract;
export const getContractStatus = (state) => state.contract.status;
export const getContractError = (state) => state.contract.error;

export const { createPoll } = contractSlice.actions;
export default contractSlice.reducer;