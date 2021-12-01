import React, { useState, useEffect } from "react";
import "../css/Popup.css";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";

function PopupSongs(props) {
  const [tags, setTags] = useState([]);

  async function deleteSong(songId) {
    await deleteDoc(doc(db, "songs", songId));
    props.setPopStatus(false);
  }

  async function deleteTag(tagName) {
    console.log("Entro" + tagName+props.song.id);
    await updateDoc(doc(db, "songs", props.song.id), {
      Tags: arrayRemove(tagName),
    });
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

  //get Tags
  useEffect(() => {
    const tagsObject = query(collection(db, "Tag"));
    const tagsSnapshot = onSnapshot(tagsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTags(data);
    });
    return () => tagsSnapshot();
  }, []);



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
          <p>Tags</p>
          
          {
            props.song.Tags.map((tag)=>{
              return(<p>{tag} <button type="button" onClick={()=>deleteTag(tag)}>Borrar</button></p>)
            })
          }
          <button type="submit">Guardar cambios</button>
          <button onClick={() => deleteSong(props.song.id)}>
            Borrar cancion
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default PopupSongs;
