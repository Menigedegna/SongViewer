// src/state/AppState.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface formDataFrame {
  Title: string;
  Artist: {
    FirstName: string;
    LastName: string;
  },
  Album: string;
  Genre: string;
}

export const formDataInitial = {
  Title: "",
  Artist: {
    FirstName: "",
    LastName: "",
  },
  Album: "",
  Genre: ""
}

export interface appStateType {
    serverPath: string;
    songFilterChoice: string;
    formData: formDataFrame;
    songId: string;
}

const initialState: appStateType = {
    serverPath: "None",
    songFilterChoice: "None",
    formData: formDataInitial,
    songId: "None",
};

const appState = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setServerPath: (state, action: PayloadAction<string>) => {
      state.serverPath = action.payload;
    },
    setformData: (state, action: PayloadAction<formDataFrame>) => {
      state.formData = action.payload;
    },
    setSongFilterChoice: (state, action: PayloadAction<string>) => {
    state.songFilterChoice = action.payload;
    },
    setSongId: (state, action: PayloadAction<string>) => {
      state.songId = action.payload;
      },
  },
});

export const { setServerPath, setformData,  setSongFilterChoice, setSongId} = appState.actions;

export default appState.reducer;
