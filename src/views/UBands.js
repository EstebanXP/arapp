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

const ShowBands = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                    <p>Band's name: {props.name}</p>
                    <p>Band's logo: {props.logo}</p>
                    <p>Band's description: {props.description}</p>
                    <p>Band's logo: {props.genre}</p>
            </div>
        </div>
    )
};

const UBands = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("name");
    const [currentBand, setCurrentBand] = useState({
        name: "",
        logo: null,
        description: "",
        genre: ""
    });

    async function deleteBand(bandId) {
        await deleteDoc(doc(db, "Bands", bandId));
    }

    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }


    function editBand(band) {
        setCurrentBand({
            id: band.id,
            name: band.name,
            logo: band.logo,
            description: band.description,
            genre: band.genre,
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newLogo = e.target.logo.value;
        const newDescription = e.target.description.value;
        const newMusicGenre = e.target.genre.value;

        await updateDoc(doc(db, "Bands", currentBand.id), {
            name: newName,
            logo: newLogo,
            description : newDescription,
            genre: newMusicGenre
        });
    }

    useEffect(() => {
        const bandObject = query(collection(db, "Bands"), orderBy(sortings));
        const bandsSnapshot = onSnapshot(bandObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
      
        setList(data);
        });
        
        return () => bandsSnapshot();
    }, [sortings]);
  
    return (
        <div className="col-md-8">
            <form >
                <label>
                    Order by:
                    <select value={sortings} onChange={handleChange}>
                        <option value="name">name</option>
                        <option value="logo">logo</option>
                        <option value="description">description</option>
                        <option value="genre">genre</option>
                    </select>
                </label>
            </form>

            <form onSubmit={saveOnSubmit}>
                <div>
                    Name: 
                    <input name="name" defaultValue={currentBand.name}></input>{" "}
                    <br></br>
                    Logo:{" "}
                    <input name="logo" defaultValue={currentBand.logo}></input>{" "}
                    <br></br>
                    Description: 
                    <input name="description" defaultValue={currentBand.description}></input>{" "}
                    <br></br>
                    Music Genre:{" "}
                    <input name="logo" defaultValue={currentBand.genre}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>
            
            {list.map((link) => (
                <div className="card mb-1">
                    <ShowBands
                        name={link.name}
                        logo={link.logo}
                        description={link.description}
                        genre={link.genre}
                    />
                    <button className="editar" onClick={() => editBand(link)}>
                        Edit
                    </button>
                    <button className="borrar" onClick={() => deleteBand(link.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UBands;
