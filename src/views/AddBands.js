import React,{useEffect,useState} from 'react'
import db from '../firebase';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';

const AddBands = () => {

    const [newName, setNewName] = useState("");
    const [newLogo, setNewLogo] = useState(null);
    const [newDescription, setNewDescription] = useState("");
    const [newMusicGenre, setNewMusicGenre] = useState("");
    

    const [bands, setBands] = useState([]);
    const bandsCollectionRef = collection(db, "bands");

    //get bands
    useEffect( () => {
        const getMembers = async () => {
            const data = await getDocs(bandsCollectionRef)
            setBands(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
        };
        getMembers();
    }, []);

    //create Bands
    const createBand = async () => {
        await addDoc(bandsCollectionRef, { name: newName, logo: newLogo, description: newDescription, genre: newMusicGenre });
    };

    //delete Bands
    const deleteBand = async (id) => {
        const bandDoc = doc(db, "bands", id);
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
                        <h3>Name: {band.name}</h3>
                        <h3>Logo: {band.logo}</h3>
                        <h3>Description: {band.description}</h3>
                        <h3>Music Genre: {band.genre}</h3>
                        <button onClick ={() => {deleteBand(band.id)}}>Delete Band</button>
                    </div>
                );
            })}
        </div>
    );
};

export default AddBands;
