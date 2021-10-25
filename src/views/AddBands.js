import React,{useEffect,useState} from 'react'
import db from '../firebase';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';

const AddBands = () => {

    const [newName, setNewName] = useState("");
    const [newLogo, setNewLogo] = useState(null);
    const [newDescription, setNewDescription] = useState("");
    const [newMusicGenre, setNewMusicGenre] = useState("");

    const [bands, setBands] = useState([]);
    const bandsCollectionRef = collection(db, "Bands");

    //get bands
    useEffect( () => {
        const getBand = async () => {
            const data = await getDocs(bandsCollectionRef)
            setBands(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        };
        getBand();
    }, []);

    //create Bands
    const createBand = async () => {
        await addDoc(bandsCollectionRef, { bandName: newName, bandLogo: newLogo, bandDescription: newDescription, bandGenres: newMusicGenre });
    };

    //delete Bands
    const deleteBand = async (id) => {
        const bandDoc = doc(db, "Bands", id);
        await deleteDoc(bandDoc);
    };

    return (
        <div>
            <h3>Name:</h3>
            <input onChange={(event) => {
                setNewName(event.target.value)
            }}/>
            <h3>Logo:</h3> 
            <input type="file" onChange={(event) => {
                setNewLogo(event.target.value)
            }}/>
            <h3>Description:</h3>
            <input onChange={(event) => {
                setNewDescription(event.target.value)
            }}/>
            <h3>Music Genre:</h3>
            <input onChange={(event) => {
                setNewMusicGenre(event.target.value)
            }}/>
            <br></br>
            <br></br>
            <br></br>
            <button onClick = {createBand}>Create Band</button>
        
            {bands.map((band) => {
                return (
                    <div>
                        <h3>Name: {band.bandName}</h3>
                        <h3>Logo: {band.bandLogo}</h3>
                        <h3>Description: {band.bandDescription}</h3>
                        <h3>Music Genre: {band.bandGenres}</h3>
                        <button onClick ={() => {deleteBand(band.id)}}>Delete Band</button>
                    </div>
                );
            })}
        </div>
    );
};

export default AddBands;
