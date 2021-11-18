import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowSongs from "./ShowSongs";

const ManageSongs = (props) => {
  const [editStatus, setEditStatus] = useState(false);
  const [lista, setLista] = useState([]);
  const [sortings, setSortings] = useState("title");
  const [searchParam, setSearchParam] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
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
  }, [sortings, editStatus]);

  return (
    <div className="col-md-8">
      <h1>Songs in set</h1>
      <input
        type="text"
        name="title"
        placeholder="Search..."
        onChange={(event) => {
          setSearchParam(event.target.value);
        }}
      ></input>
      <form>
        <label>
          sort by:
          <select value={sortings} onChange={handleChange}>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </label>
      </form>

      {lista.filter((val) => {
        if (searchParam === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(searchParam.toLowerCase())
        ) {
          return val;
        } else if (
          val.artist.toLowerCase().includes(searchParam.toLowerCase())
        ) {
          return val;
        } 
      }).map((link,index) => {
          if(props.tsongs.includes(link.id)){
            return(
              <div className="card mb-1">
                <ShowSongs
                  song={link}
                  title={link.title}
                  artist={link.artist}
                  //lyrics={link.lyrics}
                 // chords={link.chords}
                ></ShowSongs>
                <button onClick={()=>console.log("Hola mundi" + link.id)}>HOLA</button>
              </div>
            )
          }
      })}
    </div>
  );
};

export default ManageSongs;
