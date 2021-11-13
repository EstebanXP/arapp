import React, { useState } from "react";
import "../css/Popup.css"
import {
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import db from "../firebase";

const PopupSets = (props) => {

    //delete Set
    const deleteSet = async (setId) => {
        await deleteDoc(doc(db, "sets", setId));
        props.setPopStatus(false);
    };

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newListOfSongs = e.target.songs.value;
        await updateDoc(doc(db, "sets", props.thisSet.id), {
            name: newName,
            songs: newListOfSongs
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
                        <input name="name" defaultValue={props.thisSet.name}></input>{" "}
                        <br></br>
                        List of songs:{" "}
                        <input name="songs" defaultValue={props.thisSet.songs}></input>{" "}
                        <br></br>
                        Save: <button type="submit">Save </button>
                        <button onClick={() => {deleteSet(props.thisSet.id);}}>Delete Set</button>
                    </div>
                </form>
            </div>
        </div>
    ): null;
};

export default PopupSets;
