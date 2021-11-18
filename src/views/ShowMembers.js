import React, { useState } from "react";
import PopupMembers from "./PopupMembers";

const ShowMembers = (props) => {
  const [popStatus, setPopStatus] = useState(false);  
  
  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tmem.memberName}</p>
        <p>Role: {props.tmem.rol}</p>
        <button onClick={() => setPopStatus(true)}>Edit this member</button>

        {<PopupMembers
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisMem = {props.tmem}
        />}
      </div>
    </div>
  );
};

export default ShowMembers;
