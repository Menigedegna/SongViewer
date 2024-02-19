import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSongsFetch, LoadingDataState } from './state/DataLoadingState';

// COMPONENTS
import Form from './components/SongForm';
import SelectChoice from './components/SelectSong';
import Table from './components/Table';
import Loading from './components/Loading';
import LoadStats from './components/SongStats';
import FilterSongForm from './components/FilterFormSong';

// STATE VARIABLES
import { appStateType} from './state/AppState';
import { PostingDataState } from './state/DataPostingState';

function App() {

  // set app state variables
  const dispatch = useDispatch();
  const { songData, isLoading, songStats } = useSelector((state: { songs: LoadingDataState }) => state.songs);
  const { songFilterChoice} = useSelector((state: { app: appStateType }) => state.app);
  const { isPosting, serverMessage} = useSelector((state: { postSongs: PostingDataState }) => state.postSongs);

  // Dispatch the action to start loading data when the component mounts
  useEffect(() => {
    dispatch(getSongsFetch(" "));
  }, [dispatch]);

  return (
    <div className="App">
      <div className='mainContainer'>
        <div className='topHome'>
        <div className="songFormContainer">
          {songFilterChoice==="None"
          ?<Form/>
          :<FilterSongForm/>
          }
          </div>
          <div className="songFilterContainer">
          {isPosting
          ?<Loading/>
          :<SelectChoice />
          }
          </div>
        </div>
        <div className='serverMessage'>
          <p>{serverMessage}</p>
        </div>
        <div className='bottomHome'>
          <div className='tableContainer'>
            <div className='tableInnerContainer'>
              {isLoading
              ?<Loading/>
              :<Table data={songData}/>
              }
            </div>
          </div>
          <LoadStats data={songStats}/>
        </div>
      </div>
    </div>
  );
}

export default App;
