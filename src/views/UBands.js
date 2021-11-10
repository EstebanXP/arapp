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
                    <p>Band's name: {props.bandName}</p>
                    <p>Band's logo: {props.bandLogo}</p>
                    <p>Band's description: {props.bandDescription}</p>
                    <p>Band's logo: {props.bandGenres}</p>
            </div>
        </div>
    )
};

const UBands = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("bandName");
    const [searchParam,setSearchParam] = useState("");
    const [currentBand, setCurrentBand] = useState({
        id: "",
        bandName: "",
        bandLogo: null,
        bandDescription: "",
        bandGenres: ""
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
            bandName: band.bandName,
            bandLogo: band.bandLogo,
            bandDescription: band.bandDescription,
            bandGenres: band.bandGenres,
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.bandName.value;
        const newLogo = e.target.bandLogo.value;
        const newDescription = e.target.bandDescription.value;
        const newMusicGenre = e.target.bandGenres.value;

        await updateDoc(doc(db, "Bands", currentBand.id), {
            bandName: newName,
            bandLogo: newLogo,
            bandDescription : newDescription,
            bandGenres: newMusicGenre
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

            <form onSubmit={saveOnSubmit}>
                <div>
                    Name: 
                    <input name="bandName" defaultValue={currentBand.bandName}></input>{" "}
                    <br></br>
                    Logo:{" "}
                    <input name="bandLogo" defaultValue={currentBand.bandLogo}></input>{" "}
                    <br></br>
                    Description: 
                    <input name="bandDescription" defaultValue={currentBand.bandDescription}></input>{" "}
                    <br></br>
                    Music Genre:{" "}
                    <input name="bandGenres" defaultValue={currentBand.bandGenres}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>
            
            {list.filter((val) => {
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
            }).map((link) => (
                <div className="card mb-1">
                    <ShowBands
                        bandName={link.bandName}
                        bandLogo={link.bandLogo}
                        bandDescription={link.bandDescription}
                        bandGenres={link.bandGenres}
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
