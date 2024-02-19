// src/components/Form.tsx
import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSongPosting, startSongUpdating } from '../state/DataPostingState';
import { setformData, appStateType, formDataInitial, setSongId } from '../state/AppState';


const Form = () => {
  const dispatch = useDispatch();
  const { formData, songId } = useSelector((state: { app: appStateType }) => state.app);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newFormData = formData;
    if ( name==="FirstName" || name==="LastName" ){
      let newArtist = { FirstName:formData.Artist.FirstName, LastName:formData.Artist.LastName };
      newArtist[name]=value;
      newFormData = { ...formData, ["Artist"]: newArtist };
    }else{
      newFormData = { ...formData, [name]: value };
    }
    dispatch(setformData(newFormData));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // add song to server
    if(songId==="None"){
      dispatch(startSongPosting(formData));
    }else{
      const formatedSong = {_id: songId, ...formData};
      dispatch(startSongUpdating(formatedSong));
    }
    // clear form
    dispatch(setformData(formDataInitial));
    dispatch(setSongId("None"));
  };

  return (
    <form className="songForm" onSubmit={handleSubmit}>
        <div className='formTitle'>{songId==="None"?"Add a Song":"Update Song"}</div>
        <div className='inputContainer'>
            <input className="title" placeholder="Title:" type="text" name="Title" value={formData.Title} onChange={handleChange} />
            <div className="artist">
              <input className="artistFirstName" placeholder="Artist: First Name" type="text" name="FirstName" value={formData.Artist.FirstName} onChange={handleChange} />
              <input className="artistLastName" placeholder="Artist: Last Name" type="text" name="LastName" value={formData.Artist.LastName} onChange={handleChange} />
            </div>
            <input className="album" placeholder="Album:" type="text" name="Album" value={formData.Album} onChange={handleChange} />
            <input className="genre" placeholder="Genre:" type="text" name="Genre" value={formData.Genre} onChange={handleChange} />
        </div>
        <button className="addSongFromButton" type="submit">{songId==="None"?"Add":"Update"}</button>
    </form>
  );
};

export default Form;
