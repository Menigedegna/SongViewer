// src/state/DataLoadingState.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface songFrame{
    _id: string;
    Title: string;
    Artist:{
        FirstName:string;
        LastName: string;
    };
    Album: string;
    Genre: string;
}

export interface statsFrame{
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    [key: string]: number;
}

export interface LoadingDataState {
    songData: songFrame[];
    songStats:statsFrame; 
    isLoading: boolean;
}

const initialState: LoadingDataState = {
    songData: [],
    isLoading: false,
    songStats:{
        totalSongs: 0,
        totalArtists: 0,
        totalAlbums: 0,
        totalGenres: 0
    }
};

export const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers:{
        getSongsFetch: (state, action)=>{
            // fetch data
            state.isLoading = true;
        },
        getSongsSuccess: (state, action)=>{
            // sucess action
            state.isLoading = false;
            const data = action.payload;
            state.songData = data.data; 
            state.songStats = data.stats; 
        },
        getSongsFailure: (state)=>{
            // failure action
            state.isLoading = false;
        }
    }
});

export const {getSongsFailure, getSongsSuccess, getSongsFetch}= songSlice.actions;
export default songSlice.reducer;