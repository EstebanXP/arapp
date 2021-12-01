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

const ShowLiveShows = (props) => {
    return (
        <div className="container">
            <div className="card-body">
                <p>Band: {props.showBand}</p>
                <p>Date: {props.showDate}</p>
                <p>Location: {props.showLocation}</p>
                <p>Show name: {props.showName}</p>
                <p>Place: {props.showPlace}</p>
                <p>Tag: {props.showTag}</p>
                <p>Tour: {props.showTour}</p>
            </div>
        </div>
    )
};

const ULiveShows = () => {
    const [list, setList] = useState([]);
    const [sortings, setSortings] = useState("name");
    const [searchParam,setSearchParam] = useState("");
    const [currentLiveShow, setCurrentLiveShow] = useState({
        id: "",
        showBand: "",
        showDate: null,
        showLocation: "",
        showName: "",
        showPlace: "",
        showTag: "",
        showTour: ""
    });

    async function deleteLiveShow(showId) {
        await deleteDoc(doc(db, "LiveShows", showId));
    }

    function handleChange(e) {
        e.preventDefault();
        setSortings(e.target.value);
    }


    function editLiveShows(show) {
        setCurrentLiveShow({
            id: show.id,
            showBand: show.showBand,
            showDate: show.showDate,
            showLocation: show.showLocation,
            showName: show.showName,
            showPlace: show.showPlace,
            showTag: show.showTag,
            showTour: show.showTour
        });
    }

    async function saveOnSubmit(e) {
        e.preventDefault();
        const showBand = e.target.showBand.value;
        const showDate = e.target.showDate.value;
        const showLocation = e.target.showLocation.value;
        const showName = e.target.showName.value;
        const showPlace = e.target.showPlace.value;
        const showTag = e.target.showTag.value;
        const showTour = e.target.showTour.value;

        await updateDoc(doc(db, "LiveShows", currentLiveShow.id), {
            showBand: showBand, 
            showDate: showDate, 
            showLocation: showLocation, 
            showName: showName, 
            showPlace: showPlace, 
            showTag: showTag, 
            showTour: showTour
        });
    }

    useEffect(() => {
        const showsObject = query(collection(db, "LiveShows"), orderBy(sortings));
        const showsSnapshot = onSnapshot(showsObject, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
      
        setList(data);
        });
        
        return () => showsSnapshot();
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
                        <option value="band">showBand</option>
                        <option value="date">showDate</option>
                        <option value="location">showLocation</option>
                        <option value="name">showName</option>
                        <option value="place">showPlace</option>
                        <option value="tag">showTag</option>
                        <option value="tour">showTour</option>
                    </select>
                </label>
            </form>

            <form onSubmit={saveOnSubmit}>
                <div>
                    Band: 
                    <input name="band" defaultValue={currentLiveShow.showBand}></input>{" "}
                    <br></br>
                    Date:{" "}
                    <input name="date" defaultValue={currentLiveShow.showDate}></input>{" "}
                    <br></br>
                    Location: 
                    <input name="location" defaultValue={currentLiveShow.showLocation}></input>{" "}
                    <br></br>
                    Name:
                    <input name="name" defaultValue={currentLiveShow.showName}></input>{" "}
                    <br></br>
                    Place: 
                    <input name="place" defaultValue={currentLiveShow.showPlace}></input>{" "}
                    <br></br>
                    Tag:{" "}
                    <input name="tag" defaultValue={currentLiveShow.showTag}></input>{" "}
                    <br></br>
                    Tour: 
                    <input name="tour" defaultValue={currentLiveShow.showTour}></input>{" "}
                    <br></br>
                    Save: <button type="submit">Save </button>
                </div>
            </form>
            
            {list.filter((val) => {
                if(searchParam === "") {
                    return val
                } else if(val.showBand.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showDate.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showLocation.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showName.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showPlace.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showTag.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                } else if(val.showTour.toLowerCase().includes(searchParam.toLowerCase())) {
                    return val;
                }
            }).map((link) => (
                <div className="card mb-1">
                    <ShowLiveShows
                        showBand={link.showBand}
                        showDate={link.showDate}
                        showLocation={link.showLocation}
                        showName={link.showName}
                        showPlace={link.showPlace}
                        showTag={link.showTag}
                        showTour={link.showTour}
                    />
                    <button className="editar" onClick={() => editLiveShows(link)}>
                        Edit
                    </button>
                    <button className="borrar" onClick={() => deleteLiveShow(link.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ULiveShows;
