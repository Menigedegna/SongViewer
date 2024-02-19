// src/components/Form.tsx
import React from 'react';
import { setSongFilterChoice } from '../state/AppState';
import { useDispatch } from 'react-redux';

const SelectChoice = () => {
  const dispatch = useDispatch();
  return (
    <div className="selectSongContainer">
        <button className="filterTitleButton" type="submit" onClick={() =>dispatch(setSongFilterChoice("Title"))}>Title</button>
        <button className="filterArtistButton" type="submit" onClick={() =>dispatch(setSongFilterChoice("Artist"))}>Artist</button>
        <div className='filterChoiceTitle'>Select</div>
        <button className="filterAlbumButton" type="submit" onClick={() =>dispatch(setSongFilterChoice("Album"))}>Album</button>
        <button className="filterGenreButton" type="submit" onClick={() =>dispatch(setSongFilterChoice("Genre"))}>Genre</button>

    </div>
  );
};

export default SelectChoice;
