import React, { useState } from "react";
import PopupBands from "./PopupBands";
import ManageMemInBands from "./ManageMemInBands"

const ShowBands = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  
  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tband.bandName}</p>
        <p>Logo: {props.tband.bandLogo}</p>
        <p>Description: {props.tband.bandDescription}</p>
        <p>Music Genre: {props.tband.bandGenre}</p>
        <p>Band members: </p>
        <ManageMemInBands tsongs = {props.tband.bandMembers}/>

        <button onClick={() => setPopStatus(true)}>Edit this band</button>
        {<PopupBands
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisBand = {props.tband}
        />}
      </div>
    </div>
  );
};

export default ShowBands;
