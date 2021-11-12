import React, { useState } from "react";
import "../css/Popup.css";
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

  async function saveOnSubmit(e) {
    e.preventDefault();
    const newtitle = e.target.title.value;
    const newArtist = e.target.artist.value;
    const newLyrics = e.target.lyrics.value;
    const newChords = e.target.chords.value;
    const newTempo = e.target.tempo.value;
    const newTab = e.target.tab.value;
    await updateDoc(doc(db, "songs", props.song.id), {
      title: newtitle,
      artist: newArtist,
      lyrics: newLyrics,
      chords: newChords,
      tempo: newTempo,
      tab: newTab,
    });
    props.setPopStatus(false);
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/*AQUI SE GUARDA LOS DATOS DE LA ROLA EN EL POPUP */}
        <button className="close-btn" onClick={() => props.setPopStatus(false)}>
          Close
        </button>
        <form className="form-popup" onSubmit={saveOnSubmit}>
          <p>Nuevo titulo: </p>
          <input defaultValue={props.song.title} name="title"></input>
          <br></br>
          <p>Nuevo Artista: </p>
          <input defaultValue={props.song.artist} name="artist"></input>
          <br></br>
          <p>Nuevos acordes: </p>
          <input defaultValue={props.song.chords} name="chords"></input>
          <br></br>
          <p>Letra nueva: </p>
          <textarea defaultValue={props.song.lyrics} name="lyrics"></textarea>
          <br></br>
          <p>Nuevo tempo: </p>
          <textarea defaultValue={props.song.tempo} name="tempo"></textarea>
          <br></br>
          <p>Nuevo tab: </p>
          <input name="tab" defaultValue={props.song.tab}></input>
          <br></br>
          <button type="submit">guardar</button>
          <button onClick={() => deleteSong(props.song.id)}>Borrar</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default PopupSongs;
