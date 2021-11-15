import React, { useState } from "react";
import "../css/Popup.css";

import {
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import db from "../firebase";

const PopupSetlists = (props) => {
    
    //delete Setlist
    const deleteSetlist = async (setlistId) => {
        await deleteDoc(doc(db, "setlists", setlistId));
        props.setPopStatus(false);
    };

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newSets = e.target.sets.value;
        const newShow = e.target.show.value;
        const newBand = e.target.band.value;
        const newTag = e.target.tag.value;

        await updateDoc(doc(db, "setlists", props.thisSetlist.id), {
            name: newName,
            sets: newSets,
            show: newShow,
            band: newBand,
            tag: newTag
        });
        props.setPopStatus(false);
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setPopStatus(false)}>Close</button>
                <h3>Edit</h3>
                <form onSubmit={saveOnSubmit}>
                    <div>
                        Name: 
                        <input name="name" defaultValue={props.thisSetlist.name}></input>{" "}
                        <br></br>
                        Sets:{" "}
                        <input name="sets" defaultValue={props.thisSetlist.sets}></input>{" "}
                        <br></br>
                        Show:
                        <input name="show" defaultValue={props.thisSetlist.show}></input>
                        <br></br>
                        Band:
                        <input name="band" defaultValue={props.thisSetlist.band}></input>
                        <br></br>
                        Tag:
                        <input name="tag" defaultValue={props.thisSetlist.tag}></input>
                        <br></br>
                        Save: <button type="submit">Save </button>
                        <button onClick={() => {deleteSetlist(props.thisSetlist.id);}}>Delete Set</button>
                    </div>
                </form>
            </div>
        </div>
    ): null;
};

export default PopupSetlists;
