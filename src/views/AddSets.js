import React, { useEffect, useState } from "react";

import db from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AddSets = () => {
  const [newName, setNewName] = useState("");
  const [newListOfSongs, setNewListOfSOngs] = useState([]);
  const [lista, setLista] = useState([]);
  const [sets, setSets] = useState([]);
  const setsCollectionRef = collection(db, "sets");

  //get Sets
  useEffect(() => {
    const setsObject = query(collection(db, "sets"));
    const setsSnapshot = onSnapshot(setsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSets(data);
    });
    return () => setsSnapshot();
  }, []);

  useEffect(() => {
    const songsObject = query(collection(db, "songs")); //Guardar referencia de la coleccion
    const songsSnapshot = onSnapshot(songsObject, (querySnapshot) => {
      let data1 = [];
      querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
        console.log(data1);
      });
      setLista(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => songsSnapshot();
  }, []);

  //create Sets
  const createSet = async () => {
    await addDoc(setsCollectionRef, { name: newName, songs: newListOfSongs });
  };

  //delete Set
  const deleteSet = async (id) => {
    const setDoc = doc(db, "sets", id);
    await deleteDoc(setDoc);
  };

  return (
    <div>
      <h3>Name AAAA:</h3>
      <input
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <h3>List of songs:</h3>
      <input
        onChange={(event) => {
          setNewListOfSOngs(event.target.value);
        }}
      />
      <button onClick={createSet}>Create Set</button>

      {sets.map((set) => {
        return (
          <div>
            <h3>Name: {set.name}</h3>
            <h3>List of songs: {set.role}</h3>
            <button
              onClick={() => {
                deleteSet(set.id);
              }}
            >
              Delete Set
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AddSets;
