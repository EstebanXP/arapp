import React,{useEffect, useState} from 'react';

import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';

const AddSetlist = () => {

    const [newName, setNewName] = useState("");
    const [newSet, setNewSet] = useState([]);
    const [newShow, setNewShow] = useState("");
    const [newBand, setNewBand] = useState("");
    const [newTag, setNewTag] = useState("");

    const [setlists, setSetlists] = useState([]);
    const setlistsCollectionRef = collection(db, "setlists");

    //get setlist
    useEffect(() => {
        const setlistsObject = query(collection(db,'setlists'));
        const setlistsSnapshot = onSnapshot(setlistsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setSetlists(data);
        });
        return ()=> setlistsSnapshot(); 

    }, []);

    //create Setlist
    const createSetlist = async () => {
        await addDoc(setlistsCollectionRef, { name: newName, sets: newSet, show: newShow, band: newBand, tag: newTag });
    };

    //delete Setlist
    const deleteSetlist = async (id) => {
        const setlistDoc = doc(db, "setlists", id);
        await deleteDoc(setlistDoc);
    };

    return (
        <div>
            <h3>Name:</h3>
            <input onChange={(event) => {
                setNewName(event.target.value)
            }}/>
            <h3>Sets:</h3> 
            <input onChange={(event) => {
                setNewSet(event.target.value)
            }}/>
            <h3>Show:</h3>
            <input onChange={(event) => {
                setNewShow(event.target.value)
            }}/>
            <h3>Band:</h3>
            <input onChange={(event) => {
                setNewBand(event.target.value)
            }}/>
            <h3>Tag:</h3>
            <input onChange={(event) => {
                setNewTag(event.target.value)
            }}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick = {createSetlist}>Create Setlist</button>
        
            {setlists.map((setlist) => {
                return (
                    <div>
                        <h3>Name: {setlist.name}</h3>
                        <h3>Sets: {setlist.sets}</h3>
                        <h3>Show: {setlist.show}</h3>
                        <h3>Band: {setlist.band}</h3>
                        <h3>Tag: {setlist.tag}</h3>
                        <button onClick ={() => {deleteSetlist(setlist.id)}}>Delete Setlist</button>
                    </div>
                );
            })}
        </div>
    );
};

export default AddSetlist;

