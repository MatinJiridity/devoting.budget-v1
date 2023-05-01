import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const POLLS_URL = 'https://devotingversion02.onrender.com/user/getGroups';

const initialState = {
    polls: [],
    status: 'idle', // 'idle' or 'loading' or 'succeeded' or 'faild'
    error: null,
}

export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
    try {
        const response = await axios.get(POLLS_URL);
        return [...response.data.allGroups];
    } catch (error) {
        return error.message;
    }
})

export const pollsSlice = createSlice({
    name: 'polls',
    initialState,
    reducers: {
        castVote(state, action) {

        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPolls.pending, (state, action)=> {
                state.status = 'loading'
            })
            .addCase(fetchPolls.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedPosts = action.payload

                // Add any fetched polls to the array
                state.polls = state.polls.concat(loadedPosts)
            })
            .addCase(fetchPolls.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPolls = (state) => state.polls.polls;
export const getPollsStatus = (state) => state.polls.status;
export const getPollsError = (state) => state.polls.error;

export const { castVote } = pollsSlice.actions;
export default pollsSlice.reducer;