import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowSongs from "./ShowSongs";
import ShowTags from "./ShowTags";
const tagsCollectionRef = collection(db, "Tag");

const ManageSongs = (props) => {
  const [tags, setTags] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [lista, setLista] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [sortings, setSortings] = useState("title");
  const [searchParam, setSearchParam] = useState("");
  const [localLyrics, setlocalLyrics] = useState("");
  const [tagSearchParam, setTagSearchParam] = useState("");
  const [status, setStatus] = useState(false);
  const [datos, setDatos] = useState({
    artista: "",
    cancion: "",
    chords: "",
    tab: "",
    tempo: "",
    Tags: [],
  });

  function getData(e) {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }

  async function addSongToDB(e) {
    e.preventDefault();
    alert("Song saved!");
    await addDoc(collection(db, "songs"), {
      artist: datos.artista,
      chords: datos.chords,
      title: datos.cancion,
      lyrics: localLyrics,
      tab: datos.tab,
      tempo: datos.tempo,
      Tags: tagsArray,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function fetchAPI() {
    // param is a highlighted word from the user before it clicked the button
    return fetch(`https://api.lyrics.ovh/v1/${datos.artista}/${datos.cancion}`);
  }

  async function buscarCancion() {
    var proob = lista.find(
      (cancion) =>
        cancion.title === datos.cancion && cancion.artist === datos.artista
    );
    if (proob != null) {
      alert("Oooops... This song already exists!");
    } else {
      const response = await fetchAPI();
      if (response.status === 200) {
        setStatus(true);
        const myJson = await response.json(); //extract JSON from the http response
        setlocalLyrics(JSON.stringify(myJson));
      } else {
        setStatus(false);
      }
    }
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
      <div className="SearchBar">
        <div className="searchDiv">
          <form className="FormularioSearchSong">
            Nombre de la cancion:
            <input
              type="text"
              className="nombreCancion"
              name="cancion"
              onChange={getData}
              required
            ></input>
            {datos.cancion}
            <br />
            Artista:
            <input
              type="text"
              className="nombreArtista"
              name="artista"
              onChange={getData}
              required
            ></input>
            {datos.artista}
            <br />
          </form>
          <button onClick={() => buscarCancion()}>Buscar</button>
          {status === true ? (
            <div className="foundSong">
              <form onSubmit={addSongToDB}>
                <h1>Song found</h1>
                Lyrics: <textarea defaultValue={localLyrics}></textarea>
                <br />
                Chords:{" "}
                <input
                  type="text"
                  className="songChords"
                  name="chords"
                  onChange={getData}
                ></input>
                <br />
                Tempo:{" "}
                <input
                  type="text"
                  className="songTempo"
                  name="tempo"
                  onChange={getData}
                ></input>
                <br />
                Tab:{" "}
                <textarea
                  type="text"
                  className="songTab"
                  name="tab"
                  onChange={getData}
                ></textarea>
                <br />
                Tags:
                <input
                  type="text"
                  name="tag"
                  placeholder="Search..."
                  onChange={(event) => {
                    setTagSearchParam(event.target.value);
                  }}
                ></input>
                {tags
                  .filter((val) => {
                    if (tagSearchParam === "") {
                      return null;
                    } else if (val.tagName.toLowerCase().includes(tagSearchParam.toLowerCase())) {
                      return val;
                    }
                  })
                  .map((tag) => {
                    return (
                      <div>
                        <ShowTags tag={tag}></ShowTags>
                        <button type="button" onClick={() => setTagsArray([...tagsArray,tag.tagName])}>
                          Añadir Tag
                        </button>
                      </div>
                    );
                  })}
                <h2>Do you want to save?</h2>
                <button type="submit">Yes</button>
                <button>No</button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="songNotFound">
                Song not found, you can write it down
              </h1>
              <input type="text"></input>
              <h2>Do you want to save?</h2>
              <button onClick={addSongToDB}>Yes</button>
              <button>No</button>
            </div>
          )}
        </div>
      </div>
      <h1>Lista de Canciones</h1>
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
          Pick your sorting parameter:
          <select value={sortings} onChange={handleChange}>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </label>
      </form>
      {lista
        .filter((val) => {
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
          } /*else if(val.Tags.includes(searchParam)){
            console.log(val);
            return val;
          }*/
          /* else if(val.Tags.filter(ele=>)*/
        })
        .map((link) => (
          <div className="card mb-1">
            {/*AQUI SE MANDA EL OBJETO PARA QUE SE RENDEREE INDIVIDUALMENTE */}
            <div key={link.id}>
              <ShowSongs
                song={link}
                title={link.title}
                artist={link.artist}
                lyrics={link.lyrics}
                chords={link.chords}
              ></ShowSongs>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageSongs;
