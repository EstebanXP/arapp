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

const AddLiveShows = () => {

    const [showBand, setNewBand] = useState("");
    const [showDate, setNewDate] = useState("");
    const [showLocation, setNewLocation] = useState("");
    const [showName, setNewname] = useState("");
    const [showPlace, setNewPlace] = useState("");
    const [showTag, setNewTag] = useState("");
    const [showTour, setNewTour] = useState("");

    const [shows, setShows] = useState([]);
    const showsCollectionRef = collection(db, "LiveShows");

    //get live shows
    useEffect(() => {
        const showsObject = query(collection(db,"LiveShows"));
        const showsSnapshot = onSnapshot(showsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setShows(data);
        });
        return ()=> showsSnapshot(); 

    }, []);

    //create Shows
    const createLiveShow = async () => {
        await addDoc(showsCollectionRef, { showBand: showBand, showDate: showDate, showLocation: showLocation, showName: showName, 
                showPlace: showPlace, showTag: showTag, showTour: showTour });
    };

    //delete Shows
    const deleteLiveShow = async (id) => {
        const showDoc = doc(db, "LiveShows", id);
        await deleteDoc(showDoc);
    };

    return (
        <div>
            <h3>Band:</h3>
            <input onChange={(event) => {
                setNewBand(event.target.value)
            }}/>
            <h3>Date:</h3> 
            <input type="date" onChange={(event) => {
                setNewDate(event.target.value)
            }}/>
            <h3>Location:</h3>
            <input onChange={(event) => {
                setNewLocation(event.target.value)
            }}/>
            <h3>Show name:</h3>
            <input onChange={(event) => {
                setNewname(event.target.value)
            }}/>
            <h3>Place:</h3>
            <input onChange={(event) => {
                setNewPlace(event.target.value)
            }}/>
            <h3>Tag:</h3>
            <input onChange={(event) => {
                setNewTag(event.target.value)
            }}/>
             <h3>Tour:</h3>
            <input onChange={(event) => {
                setNewTour(event.target.value)
            }}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick = {createLiveShow}>Create Live Show</button>
        
            {shows.map((show) => {
                return (
                    <div>
                        <h3>Band: {show.showBand}</h3>
                        <h3>Date: {show.showDate}</h3>
                        <h3>Location: {show.showLocation}</h3>
                        <h3>Show name: {show.showName}</h3>
                        <h3>Place: {show.showPlace}</h3>
                        <h3>Tag: {show.showTag}</h3>
                        <h3>Tour: {show.showTour}</h3>
                        <button onClick ={() => {deleteLiveShow(show.id)}}>Delete Live Show</button>
                    </div>
                );
            })}
        </div>
    );
};

export default AddLiveShows;
