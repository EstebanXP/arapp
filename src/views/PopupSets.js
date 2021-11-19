import React ,{useEffect,useState} from "react";
import "../css/Popup.css";
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

const PopupSets = (props) => {
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


  //delete Set
  const deleteSet = async (setId) => {
    await deleteDoc(doc(db, "sets", setId));
    props.setPopStatus(false);
  };

  //save changes
  async function saveOnSubmit(e) {
    e.preventDefault();
    const newName = e.target.name.value;
    //const newListOfSongs = e.target.songs.value;
    await updateDoc(doc(db, "sets", props.thisSet.id), {
      name: newName,
      //songs: newListOfSongs,
    });
    props.setPopStatus(false);
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setPopStatus(false)}>
          Close
        </button>
        <h3>Edit</h3>
        <form onSubmit={saveOnSubmit}>
          <div>
            Name:
            <input name="name" defaultValue={props.thisSet.name}></input>{" "}
            <br></br>
            List of songs:{" "}
            {/*props.thisSet.songs.map((cancion)=>{
              if(lista.includes(cancion)){
                return(<p>{cancion}</p>)
              }
            })*/}
            {console.log(props.thisSet.songs+"AAA")}
            {lista.map((cancion)=>{
              if(props.thisSet.songs.includes(cancion.id)){
                return(<ShowSongs song={cancion}
                  title={cancion.title}
                  artist={cancion.artist}></ShowSongs>);
              }
            })}
            <br></br>
            Save: <button type="submit">Save </button>
            <button
              onClick={() => {
                deleteSet(props.thisSet.id);
              }}
            >
              Delete Set
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default PopupSets;
