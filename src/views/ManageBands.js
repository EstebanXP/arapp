import React,{useEffect, useState} from 'react';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    orderBy,
} from 'firebase/firestore';
import db from '../firebase';
import ShowBands from "./ShowBands";

const ManageBands = (props) => {

    const [newName, setNewName] = useState("");
    const [newLogo, setNewLogo] = useState(null);
    const [newDescription, setNewDescription] = useState("");
    const [newMusicGenre, setNewMusicGenre] = useState("");
    const [bands, setBands] = useState([]);
    const [searchParam,setSearchParam] = useState("");
    const [sortings, setSortings] = useState("bandName");
    const bandsCollectionRef = collection(db, "Bands");

    //setBands
    useEffect(() => {
        const bandsObject = query(collection(db,'Bands'), orderBy(sortings));
        const bandsSnapshot = onSnapshot(bandsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setBands(data);
        });
        return ()=> bandsSnapshot(); 

    }, [sortings]);

    //createBands
    const createBand = async () => {
        await addDoc(bandsCollectionRef, { bandName: newName, bandLogo: newLogo, bandDescription: newDescription, bandGenres: newMusicGenre });
    };

    //sort
    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }

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
            <br/><br/>
            <button onClick = {createBand}>Create Band</button>

            <hr/>

            <div className="SearchBar">
                <input type="text" name="title" placeholder="Search..." onChange={(event)=>{setSearchParam(event.target.value);}}></input>
            </div>

            <form >
                <label>
                    Order by:
                    <select value={sortings} onChange={handleChange}>
                        <option value="bandName">name</option>
                        <option value="bandLogo">logo</option>
                        <option value="bandDescription">description</option>
                        <option value="bandGenres">genre</option>
                    </select>
                </label>
            </form>
        
            {bands.filter((val) => {
                if(searchParam === "") {
                    return val
                } else if(val.bandName.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.bandLogo.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.bandDescription.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.bandGenres.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                }
            }).map((band) => {
                //if (props.userID == set.createdBy) {
                    return (
                        <div>
                            <ShowBands tband={band} />
                        </div>
                    );
                //}
            })}
        </div>
    );
};

export default ManageBands;
