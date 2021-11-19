import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";

const ManageSongs = (props) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const usersObject = query(collection(db, "Users"));
    const usersSnapshot = onSnapshot(usersObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLista(data);
    });
    return () => usersSnapshot();
  }, []);

  return (
    <div className="col-md-8">
      {lista.map((link) => {
          if(props.tsongs.includes(link.id)){
            return(
              <div className="card mb-1">
                <p>Name: {link.userName} , Username: {link.userUsername}</p>
              </div>
            )
          }
      })}
    </div>
  );
};

export default ManageSongs;
