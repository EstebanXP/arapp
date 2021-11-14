import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowSets from './ShowSets';

const ManageSets = (props) => {

  const [newName, setNewName] = useState("");
  const [newListOfSongs, setNewListOfSOngs] = useState([]);
  const [searchParam,setSearchParam] = useState("");
  const [sortings, setSortings] = useState("name");
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

  //create Sets
  const createSet = async () => {
    await addDoc(setsCollectionRef, { name: newName, songs: newListOfSongs, createdBy: props.userID });
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
        if(props.userID == set.createdBy){
          return (
            <div>
              <ShowSets tset={set}/>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ManageSets;
