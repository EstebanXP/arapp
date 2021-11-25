import React, { useState } from "react";
import PopupTags from "./PopupTags";

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    <div className="container">
      <div className="card-body">
        <p>Tag name: {props.tag.tagName}</p>
        <PopupTags
          trigger={popStatus}
          setPopStatus={setPopStatus}
          tag={props.tag}
        ></PopupTags>
        <button onClick={() => setPopStatus(true)}>Editar</button>
      </div>
    </div>
  );
}

export default ShowTags;
