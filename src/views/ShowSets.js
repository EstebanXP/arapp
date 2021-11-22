import React, { useState } from "react";
import PopupSets from "./PopupSets";
import ManageSongsInSet from "./ManageSongsInSet";

const ShowSets = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  
  
  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tset.name}</p>
        <button onClick={() => setPopStatus(true)}>Edit this set</button>
        <button onClick={() => setShowSongs(!showSongs) }>Show songs</button>
        

        { showSongs ? 
          //<p>List of songs: {props.tset.songs}</p>
          <ManageSongsInSet tsongs = {props.tset.songs}/>
          : null 
        }

        <PopupSets
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSet = {props.tset}
          
        />
      </div>
    </div>
  );
};

export default ShowSets;
