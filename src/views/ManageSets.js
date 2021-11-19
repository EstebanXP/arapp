import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowSets from "./ShowSets";

const ManageSets = (props) => {
  const [lista, setLista] = useState([]);
  const [newName, setNewName] = useState("");
  const [newListOfSongs, setNewListOfSOngs] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [sortings, setSortings] = useState("name");
  const [sets, setSets] = useState([]);
  const [searchSongParam, setSearchSongParam] = useState("");
  const [setSongs,setSetSongs]=useState([]);
  const setsCollectionRef = collection(db, "sets");


  //setsets
  useEffect(() => {
    const setsObject = query(collection(db, "sets"), orderBy(sortings));
    const setsSnapshot = onSnapshot(setsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSets(data);
    });
    return () => setsSnapshot();
  }, [sortings,setSongs]);

  useEffect(() => {
    const songsObject = query(collection(db, "songs")); //Guardar referencia de la coleccion
    const songsSnapshot = onSnapshot(songsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLista(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => songsSnapshot();
  }, []);

  const addSongToSet=(id)=>{
    setSetSongs([...setSongs,id]);
  }

  //create Sets
  const createSet = async () => {
    await addDoc(setsCollectionRef, {
      name: newName,
      songs: setSongs,
      createdBy: props.userID,
    });
  };

  //sort
  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }

  return (
    <div>
      <h3>Add new set</h3>
      <h3>Name:</h3>
      <input
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <h3>Songs:</h3>
      {/*lista de canciones dentro del set */}
      {
        setSongs.map((song)=>{
          return(
            <p>{song}
            <br></br>
            </p>
          );
        })
      }
      <input
        type="text"
        name="title"
        placeholder="Search Song..."
        onChange={(event) => {
          setSearchSongParam(event.target.value);
        }}
      ></input>
      {lista.filter((val)=>{
        if (searchSongParam === "") {
          return null;
        } else if (
          val.title.toLowerCase().includes(searchSongParam.toLowerCase())
        ) {
          console.log(val)
          return val;
        } else if (
          val.artist.toLowerCase().includes(searchSongParam.toLowerCase())
        ) {
          console.log(val)
          return val;
        }
      }).map((cancion) => {
        return (
          <div>
            <p>{cancion.title + " by "+ cancion.artist} <button onClick={()=>addSongToSet(cancion.id)}>Añadir</button>  </p>
          </div>
        );
      })}
      <br></br>
      <button onClick={createSet}>Create Set</button>

      <hr />

      <form>
        <label>
          Order by:
          <select value={sortings} onChange={handleChange}>
            <option value="name">name</option>
            <option value="songs">songs</option>
          </select>
        </label>
      </form>

      
      {sets
        .filter((val) => {
          if (searchParam === "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchParam.toLowerCase())
          ) {
            return val;
          }
        })
        .map((set) => {
          if (props.userID == set.createdBy) {
            return (
              <div>
                <ShowSets tset={set} />
              </div>
            );
          }
        })}
    </div>
  );
};

export default ManageSets;
