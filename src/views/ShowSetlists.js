import React, { useState, useEffect } from "react";
import PopupSetlists from "./PopupSetlists";
import db from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import PopupSets from "./PopupSets";
import ShowSets from "./ShowSets";
const setsObject = query(collection(db, "sets"));

const ShowSetlists = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [popSetStatus, setPopSetStatus] = useState(false);
  const [list, setList] = useState([]); //sets

  useEffect(() => {
    //Guardar referencia de la coleccion
    const setsSnapshot = onSnapshot(setsObject, (querySnapshot) => {
      let data1 = [];
      querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
      });
      setList(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => setsSnapshot();
  }, []);

  return (
    <div className="container">
      <div className="card-body">
        <p>Name: {props.tsetlist.name}</p>
        <p>
          List of sets:{" "}
          {list.map((set) => {
            if (set.setListID === props.tsetlist.id) {
              return (
                <div>
                  <ShowSets tset={set} />
                </div>
              );
            }
          })}
        </p>
        <p>Show: {props.tsetlist.show}</p>
        <p>Band: {props.tsetlist.band}</p>
        <p>Tag: {props.tsetlist.tag}</p>

        <PopupSetlists
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSetlist={props.tsetlist}
        />
        <button onClick={() => setPopStatus(true)}>Edit this setlist</button>
      </div>
    </div>
  );
};

export default ShowSetlists;
