import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    orderBy,
} from "firebase/firestore";
import db from "../firebase";

const ShowSets = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                    <p>Set's name: {props.name}</p>
                    <p>Set's list of songs: {props.songs}</p>
            </div>
        </div>
    )
};

const USets = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("name");
    const [currentSet, setCurrentSet] = useState({
        name: "",
        songs: null
    });

    async function deleteSet(setId) {
        await deleteDoc(doc(db, "sets", setId));
    }

    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }


    function editSet(set) {
        setCurrentSet({
            id: set.id,
            name: set.name,
            songs: set.songs
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newListOfSongs = e.target.songs.value;

        await updateDoc(doc(db, "sets", currentSet.id), {
            name: newName,
            songs: newListOfSongs
        });
    }

    useEffect(() => {
        const setObject = query(collection(db, "sets"), orderBy(sortings));
        const setsSnapshot = onSnapshot(setObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
      
        setList(data);
        });
        
        return () => setsSnapshot();
    }, [sortings]);
  
    return (
        <div className="col-md-8">
            <form >
                <label>
                    Order by:
                    <select value={sortings} onChange={handleChange}>
                        <option value="name">name</option>
                        <option value="songs">songs</option>
                    </select>
                </label>
            </form>

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
            
            {list.map((link) => (
                <div className="card mb-1">
                    <ShowSets
                        name={link.name}
                        songs={link.songs}
                    />
                    <button className="editar" onClick={() => editSet(link)}>
                        Edit
                    </button>
                    <button className="borrar" onClick={() => deleteSet(link.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default USets;
