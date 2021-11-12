import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";


const AddSets = () => {

  const userID = "1qIYWrBsFhbccNIXylFXfOKAIgm1" //temporal pruebas

  const [newName, setNewName] = useState("");
  const [newListOfSongs, setNewListOfSOngs] = useState([]);
  const [searchParam,setSearchParam] = useState("");
  const [sortings, setSortings] = useState("name");
  const [list, setList] = useState([]); //songs
  const [sets, setSets] = useState([]);
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
  }, [sortings]);

  //get songs?
  useEffect(() => {
    const songsObject = query(collection(db, "songs")); //Guardar referencia de la coleccion
    const songsSnapshot = onSnapshot(songsObject, (querySnapshot) => {
      let data1 = [];
      querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
        console.log(data1);
      });
      setList(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => songsSnapshot();
  }, []);

  //create Sets
  const createSet = async () => {
    await addDoc(setsCollectionRef, { name: newName, songs: newListOfSongs, createdBy: userID });
  };

  //delete Set
  const deleteSet = async (id) => {
    const setDoc = doc(db, "sets", id);
    await deleteDoc(setDoc);
  };

  //sort
  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }






  return (
    <div>
      <h3>Name:</h3>
      <input
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <h3>Songs:</h3>
      <input
        onChange={(event) => {
          setNewListOfSOngs(event.target.value);
        }}
      />
      <button onClick={createSet}>Create Set</button>

      <hr/>

      
      <form >
        <label>
          Order by:
          <select value={sortings} onChange={handleChange}>
            <option value="name">name</option>
            <option value="songs">songs</option>
          </select>
        </label>
      </form>


      <div className="SearchBar">
          <input type="text" name="title" placeholder="Search..." onChange={(event)=>{setSearchParam(event.target.value);}}></input>
      </div>
      
      {sets.filter((val) => {
        if(searchParam === "") {
          return val
        } else if(val.name.toLowerCase().includes(searchParam.toLowerCase())) {
          return val;
        }
      }).map((set) => {
        if(userID == set.createdBy){
          return (
            <div>
              <h3>Name: {set.name}</h3>
              <h3>List of songs: {set.songs}</h3>
              <h3>(TEMPORAL)Created by: {set.createdBy}</h3>
              <button
                onClick={() => {
                  deleteSet(set.id);
                }}
              >
                Delete Set
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AddSets;
