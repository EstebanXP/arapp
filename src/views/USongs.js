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

const USongs = () => {
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

  async function deleteSong(songId) {
    await deleteDoc(doc(db, "songs", songId));
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
    const newtitle = e.target.title.value;
    const newArtist = e.target.artist.value;
    const newLyrics = e.target.lyrics.value;
    const newChords = e.target.chords.value;
    const newTempo = e.target.tempo.value;
    const newTab = e.target.tab.value;
    await updateDoc(doc(db, "songs", currentSong.id), {
      title: newtitle,
      artist: newArtist,
      lyrics: newLyrics,
      chords: newChords,
      tempo: newTempo,
      tab: newTab,
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
          Titulo: <input name="title" defaultValue={currentSong.title}></input>{" "}
          <br></br>
          Artista:{" "}
          <input name="artist" defaultValue={currentSong.artist}></input>{" "}
          <br></br>
          Cancion:{" "}
          <textarea name="lyrics" defaultValue={currentSong.lyrics}></textarea>
          <br></br>
          Acordes:{" "}
          <textarea name="chords" defaultValue={currentSong.chords}></textarea>
          <br></br>
          Tempo: <input
            name="tempo"
            defaultValue={currentSong.tempo}
          ></input>{" "}
          <br></br>
          Tab: <input name="tab" defaultValue={currentSong.tab}></input>{" "}
          <br></br>
          Guardar: <button type="submit">Guardar </button>
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
          
          /* else if(val.Tags.filter(ele=>)*/
        })
        .map((link) => (
          <div className="card mb-1">
            <ShowSongs
              title={link.title}
              artist={link.artist}
              lyrics={link.lyrics}
            />
            <button className="editar" onClick={() => editSong(link)}>
              Editar
            </button>
            <button className="borrar" onClick={() => deleteSong(link.id)}>
              Borrar
            </button>
          </div>
          
        ))
        
        }
    </div>
  );
};

export default USongs;
