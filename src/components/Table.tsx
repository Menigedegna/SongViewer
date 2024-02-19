// src/components/Table.tsx
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import {songFrame} from '../state/DataLoadingState';
import { startSongRemoving } from '../state/DataPostingState';
import { setformData, formDataFrame, setSongId } from '../state/AppState';

interface TableProps {
  data: songFrame[];
}

const Table: FC<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const editSong=(song: songFrame):void =>{    
    const formatedData:formDataFrame = {...song};
    dispatch(setformData(formatedData));
    dispatch(setSongId(song._id));
  }
  const deleteSong=(id: string):void =>{
    dispatch(startSongRemoving(id));
  }
  return (
    <table>
      <thead>
        <tr>
          <th className='tableHeaderId'></th>
          <th className='tableHeader'>Title</th>
          <th className='tableHeader'>Artist</th>
          <th className='tableHeader'>Album</th>
          <th className='tableHeader'>Genre</th>
          <th className='tableHeaderButton'></th>
          <th className='tableHeaderButton'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, id) => (
          <tr key={id} id={id.toString()} className={id%2===0?"normalRow":"colorfullRow"}>
            <td>{id+1}</td>
            <td>{item.Title}</td>
            <td>{item.Artist.FirstName} {item.Artist.LastName}</td>
            <td>{item.Album}</td>
            <td>{item.Genre}</td>
            <td className='buttonCells firstButtonCell'>
              <button className="tableButton" type="submit" onClick={() => editSong(item)}>
                <i className="fa fa-pencil-square fa-sm" aria-hidden="true"></i>
              </button>
            </td>
            <td className='buttonCells'>
                <button className="tableButton" type="submit" onClick={() =>deleteSong(item._id)}>
                  <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
