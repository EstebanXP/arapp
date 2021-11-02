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
import ShowSongs from "./ShowSongs";

const AddChords = () => {
  const [lista, setLista] = useState([]);
  const [sortings, setSortings] = useState("title");
  const [searchParam, setSearchParam] = useState("");
  const [currentSong, setCurrentSong] = useState({
    artist: "",
    lyrics: "",
    title: "",
    id: "",
    chords: "",
    tempo: "",
  });

  async function deleteChord(songId) {
    await updateDoc(doc(db, "songs", currentSong.id), {
      chords: "",
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }

  function editSong(song) {
    setCurrentSong({
      title: song.title,
      lyrics: song.lyrics,
      artist: song.artist,
      id: song.id,
      chords: song.chords,
      tempo: song.tempo,
      tab: song.tab,
    });
  }

  function checkTags(arre,arre2){
    console.log(arre2);
    arre.filter((ele)=>{
      if(ele.toLowerCase().includes(searchParam.toLowerCase())){
        return true;
      }
      console.log(false);
      return false;
    })
  }

  async function saveOnSubmit(e) {
    e.preventDefault();
    const newChords = e.target.chords.value;
    await updateDoc(doc(db, "songs", currentSong.id), {
      chords: newChords,
    });
  }

  useEffect(() => {
    const songsObject = query(collection(db, "songs"), orderBy(sortings)); //Guardar referencia de la coleccion
    const songsSnapshot = onSnapshot(songsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLista(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => songsSnapshot();
  }, [sortings]);

  return (
    <div className="col-md-8">
      <div className="SearchBar">
        <input
          type="text"
          name="title"
          placeholder="Search..."
          onChange={(event) => {
            setSearchParam(event.target.value);
          }}
        ></input>
      </div>

      <form>
        <label>
          Pick your sorting parameter:
          <select value={sortings} onChange={handleChange}>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </label>
      </form>

      <form onSubmit={saveOnSubmit}>
        <div>
          Titulo: <span name="title" defaultValue={currentSong.title}>{currentSong.title}</span>
          <br />
          Artista:{" "}
          <span name="artist" defaultValue={currentSong.artist}>{currentSong.artist}</span>
          <br />
          Acordes:{" "}
          <textarea name="chords" defaultValue={currentSong.chords}></textarea>
          <br />
          Guardar: <button type="submit">Guardar </button>
          <hr /><hr />
        </div>
      </form>
      {lista.filter((val) => {
          if (searchParam === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchParam.toLowerCase())
          ) {
            return val;
          } else if (val.artist.toLowerCase().includes(searchParam.toLowerCase())) {
            return val;
          }
          console.log(val.Tags.filter((value)=>{
            value.toLowerCase().includes(searchParam.toLowerCase())
          }))
          
        })
        .map((link) => (
          <div className="card mb-1">
            <ShowSongs
              title={link.title}
              artist={link.artist}
              lyrics={link.lyrics}
              chords={link.chords}
            />
            <button className="editar" onClick={() => editSong(link)}>
              Agregar o Editar
            </button>
            <button className="borrar" onClick={() => deleteChord(link.id)}>
              Borrar Acordes
            </button>
            <hr />
          </div>
        ))
      }
    </div>
  );
};

export default AddChords;
