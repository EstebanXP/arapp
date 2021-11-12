import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";

const USets = () => {
    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState({
        id: "",
        name: "",
        songs: null
    });

    //get set to edit
    function editSet(set) {
        setCurrentSet({
            id: set.id,
            name: set.name,
            songs: set.songs
        });
    }

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

    //setsets
    useEffect(() => {
        const setObject = query(collection(db, "sets"));
        const setsSnapshot = onSnapshot(setObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
      
        setSets(data);
        });
        
        return () => setsSnapshot();
    }, []);
  
    return (
        <div className="col-md-8">

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

            {sets.map((link) => (
                <div className="card mb-1">
                    <h3>name: {link.name}</h3>
                    <button className="editar" onClick={() => editSet(link)}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default USets;
