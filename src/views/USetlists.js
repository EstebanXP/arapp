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

const ShowSetlists = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                    <p>Setlist name: {props.name}</p>
                    <p>Setlist set: {props.set}</p>
                    <p>Setlist show: {props.show}</p>
                    <p>Setlist band: {props.band}</p>
                    <p>Setlist tag: {props.tag}</p>
            </div>
        </div>
    )
};

const USetlists = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("name");
    const [searchParam,setSearchParam] = useState("");
    const [currentSetlist, setCurrentSetlist] = useState({
        id: "",
        name: "",
        set: null,
        show: "",
        band: "",
        tag: ""
    });

    async function deleteSetlist(setlistId) {
        await deleteDoc(doc(db, "setlists", setlistId));
    }

    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }


    function editSetlist(setlist) {
        setCurrentSetlist({
            id: setlist.id,
            name: setlist.name,
            set: setlist.show,
            show: setlist.show,
            band: setlist.band,
            tag: setlist.tag,
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const newName = e.target.name.value;
        const newSet = e.target.set.value;
        const newShow = e.target.show.value;
        const newBand = e.target.band.value;
        const newTag = e.target.tag.value;

        await updateDoc(doc(db, "setlists", currentSetlist.id), {
            name: newName,
            set: newSet,
            show : newShow,
            band: newBand,
            tag: newTag
        });
    }

    useEffect(() => {
        const setlistObject = query(collection(db, "setlists"), orderBy(sortings));
        const setlistsSnapshot = onSnapshot(setlistObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
      
        setList(data);
        });
        
        return () => setlistsSnapshot();
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
                        <option value="name">name</option>
                        <option value="set">set</option>
                        <option value="show">show</option>
                        <option value="band">band</option>
                        <option value="tag">tag</option>
                    </select>
                </label>
            </form>

            <form onSubmit={saveOnSubmit}>
                <div>
                    Name: 
                    <input name="name" defaultValue={currentSetlist.name}></input>{" "}
                    <br></br>
                    Set:{" "}
                    <input name="set" defaultValue={currentSetlist.set}></input>{" "}
                    <br></br>
                    Show: 
                    <input name="show" defaultValue={currentSetlist.show}></input>{" "}
                    <br></br>
                    Band:
                    <input name="band" defaultValue={currentSetlist.band}></input>{" "}
                    <br></br>
                    Tag:
                    <input name="tag" defaultValue={currentSetlist.tag}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>

            {list.filter((val) => {
                if(searchParam === "") {
                    return val
                } else if(val.name.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.set.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.show.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.band.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.tag.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                }
            }).map((link) => (
                <div className="card mb-1">
                    <ShowSetlists
                        name={link.name}
                        set={link.set}
                        show={link.show}
                        band={link.band}
                        tag={link.band}
                    />
                    <button className="editar" onClick={() => editSetlist(link)}>
                        Edit
                    </button>
                    <button className="borrar" onClick={() => deleteSetlist(link.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default USetlists;
