import React from 'react'
import "../css/Popup.css"
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

function PopupSongs(props) {

    async function deleteSong(songId) {
        await deleteDoc(doc(db, "songs", songId));
        props.setPopStatus(false);
    }

    return props.trigger ? (
        <div className="popup">
          <div className="popup-inner">
              {/*AQUI SE GUARDA LOS DATOS DE LA ROLA EN EL POPUP */}
            <button className="close-btn" onClick={()=>props.setPopStatus(false)}>Close</button>
            {console.log(props.song.title)}
            <input defaultValue={props.song.title}></input>
            <br></br>
            <input defaultValue={props.song.artist}></input>
            <br></br>
            <input defaultValue={props.song.chords}></input>
            <br></br>
            <textarea defaultValue={props.song.lyrics}></textarea>
            {props.children}
            <br></br>
            <button onClick={()=>deleteSong(props.song.id)}>Borrar</button>
          </div>
        </div>
      ) : null;
}

export default PopupSongs