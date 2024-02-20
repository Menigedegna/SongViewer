// src/state/WatchLoadData.tsx


import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getSongsSuccess, getSongsFailure, getSongsFetch} from './state/DataLoadingState';
import { startSongPosting, serverUpdateResult, startSongRemoving, startSongUpdating} from './state/DataPostingState';
import {songFrame} from './state/DataLoadingState';
import {formDataFrame} from './state/AppState';

let SERVER_PATH = "https://songserver.onrender.com/api/Track/";

// FETCH DATA
function* loadDataSaga(action: PayloadAction<string>): Generator<any, void, any>{
  const baseServer="https://songserver.onrender.com/api/";
  // Saga to handle data loading from server
    try {
        //start fetching data from server
        const requestPath = action.payload===" "?SERVER_PATH:baseServer+action.payload;
        let response = yield call(() => fetch(requestPath));
        if (response.status === 200){
          const data = yield response.json();
          // Dispatch success action with the received data
          yield put(getSongsSuccess(data));
        }else{
          yield put(getSongsFailure());
        }

    } catch (error) {
        // Dispatch failure action on error
        yield put(getSongsFailure());
        console.error('Error fetching songs:', error);
    }
  }
  
export function* watchLoadData() {
      // Watch for the getSongsFetch action and trigger saga
    yield takeEvery(getSongsFetch, loadDataSaga);
  }

// POST DATA
function* postData(action: PayloadAction<formDataFrame>):Generator<any, void, any> {
  try {
    const response = yield call(fetch, SERVER_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ song: action.payload }),
    });
    if (response.status === 200){
      yield put(serverUpdateResult("Your song has been successfully added to database."));
      yield put(getSongsFetch(" "));
    }else{
      yield put(serverUpdateResult("Please make sure you fill out all the fields before you submit."));
    }
  } catch (error) {
    console.error('Error while posting data:', error);
    yield put(serverUpdateResult("We were unable to add your song to database. Please try again later. If the problem persists, please contact developers."));
  }
}

export function* watchPostData() {
  yield takeEvery(startSongPosting, postData);
}

// DELETE DATA
function* deleteData(action: PayloadAction<string>):Generator<any, void, any> {
  const removeServerPath = SERVER_PATH+"id/"+action.payload+"/";
  try {
    const response = yield call(fetch, removeServerPath, {
      method: 'DELETE',
    });
    if(response.status === 200){
      yield put(serverUpdateResult("Your song has been successfully deleted from database."));
      yield put(getSongsFetch(" "));
    }else{
      yield put(serverUpdateResult("We were unable to delete selected song from database. Please try again later. If the problem persists, please contact developers"));
    }
  } catch (error) {
    console.error('Error while deleting data:', error);
    yield put(serverUpdateResult("We were unable to delete selected song from database. Please try again later. If the problem persists, please contact developers."));
  }
}
export function* watchDeleteData() {
  yield takeEvery(startSongRemoving, deleteData);
}

// PUT DATA
function* updateData(action: PayloadAction<songFrame>):Generator<any, void, any> {
  const id = action.payload["_id"];
  const updateServerPath = SERVER_PATH+"id/"+id+"/";
  const data = action.payload;

  try {
    const response = yield call(fetch, updateServerPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateFields: data }),
    });
    if (response.status === 200){
      yield put(serverUpdateResult("Your song has been successfully updated."));
      yield put(getSongsFetch(" "));
    }else{
      yield put(serverUpdateResult("Sorry, we were unable to update song in database. Please try again later. If the problem persists, contact us."));
    }
  } catch (error) {
    console.error('Error while updating data:', error);
    yield put(serverUpdateResult("Sorry, we were unable to update song in database. Please try again later. If the problem persists, contact us."));
  }
}
export function* watchUpdateData() {
  yield takeEvery(startSongUpdating, updateData);
}
