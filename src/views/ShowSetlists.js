import React, { useState } from "react";
import PopupSetlists from "./PopupSetlists";

const ShowSetlists = (props) => {
    const [popStatus, setPopStatus] = useState(false);
  
    return (
        <div className="container">
            <div className="card-body">
                <p>Name: {props.tsetlist.name}</p>
                <p>List of sets: {props.tsetlist.set}</p>
                <p>Show: {props.tsetlist.show}</p>
                <p>Band: {props.tsetlist.band}</p>
                <p>Tag: {props.tsetlist.tag}</p>
        
                <PopupSetlists
                    trigger={popStatus}
                    setPopStatus={setPopStatus}
                    thisSetlist = {props.tsetlist}
                />
                <button onClick={() => setPopStatus(true)}>Edit this setlist</button>
            </div>
        </div>
    );
};

export default ShowSetlists;
