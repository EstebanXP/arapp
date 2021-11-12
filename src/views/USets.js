import React, { useState } from "react";
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";

const USets = (prop) => {
    const [currentSet, setCurrentSet] = useState({
        id: prop.id,
        name: prop.name,
        songs: prop.songs
    });

    console.log(prop.name);

    //save changes
    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newListOfSongs = e.target.songs.value;

        await updateDoc(doc(db, "sets", currentSet.id), {
            name: newName,
            songs: newListOfSongs
        });
    }

    return (
        <div className="col-md-8">
            <h3>Edit</h3>
            <form onSubmit={saveOnSubmit}>
                <div>
                    Name: 
                    <input name="name" defaultValue={currentSet.name}></input>{" "}
                    <br></br>
                    List of songs:{" "}
                    <input name="songs" defaultValue={currentSet.songs}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>   
        </div>
    );
};

export default USets;
