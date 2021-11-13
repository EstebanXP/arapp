import React, { useState } from "react";
import PopupSets from "./PopupSets";

const ShowSets = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  
  
  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tset.name}</p>
        <p>List of songs:</p>
        {props.tset.songs.map((song) => {
          return (
            <div>
              <p>Songs: {song}</p>
            </div>
          );
        })}
        <PopupSets
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSet = {props.tset}
        />
        <button onClick={() => setPopStatus(true)}>Edit this set</button>
      </div>
    </div>
  );
};

export default ShowSets;
