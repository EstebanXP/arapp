import React, { useEffect, useState } from "react";


import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";

function Prueba1() {
  const [lista, setLista] = useState([]);
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

  return (
    <div>
      Set name
      
        
        
    </div>
  );
}

export default Prueba1;
