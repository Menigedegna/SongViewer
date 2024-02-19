// src/components/Form.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {appStateType} from '../state/AppState';
import { setSongFilterChoice } from '../state/AppState';
import { getSongsFetch } from '../state/DataLoadingState';

const FilterSongForm = () => {
  const dispatch = useDispatch();
  const [filterForm, setFilterForm] = useState({firtLabel: "", secondLabel: "", thirdLabel: ""});
  const { songFilterChoice } = useSelector((state: { app: appStateType }) => state.app);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterForm({
      ...filterForm,
      [e.target.name]: e.target.value,
    });
  };

  const formatInput = (input: string):string=>{
    const formattedString = input
      .split('') 
      .map(char => (char === ' ' ? '%20' : char)) 
      .join('');  
    return formattedString;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set server path
    let path:string="";
    const starterPath = songFilterChoice==="Title"?"Track/Title/":songFilterChoice==="Genre"?"Genre/":"Artist/"
    if(songFilterChoice==="Title" || songFilterChoice==="Genre"){
      path = starterPath+formatInput(filterForm.firtLabel)+"/";
    }
    if(songFilterChoice==="Artist" || songFilterChoice==="Album"){
      path = starterPath+formatInput(filterForm.firtLabel)+"/"+formatInput(filterForm.secondLabel)+"/";
    }
    if(songFilterChoice==="Album"){
      path = path+formatInput(filterForm.thirdLabel)+"/";
    }
    dispatch(getSongsFetch(path));
    // clear form
    dispatch(setSongFilterChoice("None"));
  };

  return (
    <form className="songForm" onSubmit={handleSubmit}>
        <div className='formTitle'>Filter Songs</div>
        <div className='filterInputContainer'>
            {(songFilterChoice==="Title"|| songFilterChoice==="Genre") &&
              <input className="title" placeholder={songFilterChoice+":"} type="text" name="firtLabel" value={filterForm.firtLabel} onChange={handleChange} />
            }
            {songFilterChoice==="Artist" &&
              <div>
                <input className="title" placeholder="Artist: First Name" type="text" name="firtLabel" value={filterForm.firtLabel} onChange={handleChange} />
                <input className="title" placeholder="Artist: Last Name" type="text" name="secondLabel" value={filterForm.secondLabel} onChange={handleChange} />
               </div>             
            }
            {songFilterChoice==="Album" &&
              <div>
                <input className="title" placeholder="Artist: First Name" type="text" name="firtLabel" value={filterForm.firtLabel} onChange={handleChange} />
                <input className="title" placeholder="Artist: Last Name" type="text" name="secondLabel" value={filterForm.secondLabel} onChange={handleChange} />
                <input className="title" placeholder="Album:" type="text" name="thirdLabel" value={filterForm.thirdLabel} onChange={handleChange} />
              </div>
            }
        </div>
        <button className="addSongFromButton" type="submit">Filter</button>
    </form>
  );
};

export default FilterSongForm;
