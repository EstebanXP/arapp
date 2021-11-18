import React, { useState } from "react";
import PopupBands from "./PopupBands";

const ShowBands = (props) => {
  const [popStatus, setPopStatus] = useState(false);  
  
  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tband.bandName}</p>
        <p>Logo: {props.tband.bandLogo}</p>
        <p>Description: {props.tband.bandDescription}</p>
        <p>Music Genre: {props.tband.bandGenres}</p>
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
