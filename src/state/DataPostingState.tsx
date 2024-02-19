// src/state/DataPostingState.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface PostingDataState {
    serverMessage: string;
    isPosting: boolean;
}

const initialState: PostingDataState = {
    serverMessage: "",
    isPosting: false,
};

export const postSongSlice = createSlice({
    name: 'postSongs',
    initialState,
    reducers:{
        startSongPosting: (state, action)=>{
            state.isPosting = true;
        },
        serverUpdateResult: (state, action)=>{
            // sucess or failire action
            state.isPosting = false;
            state.serverMessage = action.payload;
        },
        startSongRemoving: (state, action)=>{
            state.isPosting = true;
        },
        startSongUpdating: (state, action)=>{
            state.isPosting = true;
        },
    }
});

export const {startSongPosting, serverUpdateResult, startSongRemoving, startSongUpdating}= postSongSlice.actions;
export default postSongSlice.reducer;