import React, { useEffect, useState } from "react";

import db from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import ShowSetlists from "./ShowSetlists";

const ManageSetlists = (props) => {
  const [newName, setNewName] = useState("");
  const [newNameSet, setNewNameSet] = useState("");
  const [lista, setLista] = useState([]);
  const [newShow, setNewShow] = useState("");
  const [newBand, setNewBand] = useState("");
  const [newTag, setNewTag] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [songSearchParam, setSongSearchParam] = useState("");
  const [sortings, setSortings] = useState("name");
  const [setStatus, setSetStatus] = useState(false);
  const [list, setList] = useState([]); //sets
  const [setSongs, setSetSongs] = useState([]);
  const [setOfIds, setSetOfIds] = useState([]);
  const [setlists, setSetlists] = useState([]);
  const [aux, setAux] = useState([]);
  const [idDocumento, setIdDocumento] = useState("");
  const setlistsCollectionRef = collection(db, "setlists");
  const setsObject = query(collection(db, "sets"));

  //get setlist
  useEffect(() => {
    const setlistsObject = query(collection(db, "setlists"), orderBy(sortings));
    const setlistsSnapshot = onSnapshot(setlistsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setSetlists(data);
    });
    return () => setlistsSnapshot();
  }, [sortings, idDocumento, setOfIds]);

  //get set
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

  function prueba(dato1, dato2) {
    console.log(dato1);
    console.log(dato2);
  }

  //create Setlist
  const createSetlist = async () => {
    await addDoc(setlistsCollectionRef, {
      name: newName,
      show: newShow,
      band: newBand,
      set: [],
      tag: newTag,
      createdBy: props.userID,
    })
      .then((docu) => {
        //docu.id es el id del setlist
        
        setIdDocumento(docu.id);
        aux.map((obj) => {
          //Aqui se añaden los sets a la colecion set
          addDoc(setsObject, {
            name: obj.name,
            songs: obj.set,
            setListID: docu.id,
            createdBy: props.userID,
          }).then(() => {});
        });

        /*updateDoc(doc(db, "setlists", docu.id), {
          set: arregloSets
        }).then(() => {
          console.log("ETNTRO");
        });*/
      })
      .catch((error) => {
        console.log(error);
      });
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
      <h3>Sets:</h3>
      <button onClick={() => setSetStatus(!setStatus)}>Add Set</button>
      {setStatus ? (
        <div className="addSet">
          <h3>Add new set</h3>
          <h3>Name:</h3>
          <input
            onChange={(event) => {
              setNewNameSet(event.target.value);
            }}
          />
          <h3>Songs:</h3>
          {setSongs.map((cancion) => {
            return <p>{cancion}</p>;
          })}
          <input
            type="text"
            name="title"
            placeholder="Search..."
            onChange={(event) => {
              setSongSearchParam(event.target.value);
            }}
          ></input>
          {lista
            .filter((val) => {
              if (songSearchParam === "") {
                return null;
              } else if (
                val.title.toLowerCase().includes(songSearchParam.toLowerCase())
              ) {
                return val;
              } else if (
                val.artist.toLowerCase().includes(songSearchParam.toLowerCase())
              ) {
                return val;
              }
            })
            .map((cancion) => {
              return (
                <p>
                  {cancion.title + " by " + cancion.artist}{" "}
                  <button
                    onClick={() => setSetSongs([...setSongs, cancion.id])}
                  >
                    Añadir
                  </button>{" "}
                </p>
              );
            })}

          <br></br>
          <button
            onClick={() => {
              setAux([...aux, { name: newNameSet, set: setSongs }]);
            }}
          >
            Añadir set al setlist
          </button>
        </div>
      ) : (
        <div>
          <h3>Show:</h3>
          <input
            onChange={(event) => {
              setNewShow(event.target.value);
            }}
          />
          <h3>Band:</h3>
          <input
            onChange={(event) => {
              setNewBand(event.target.value);
            }}
          />
          <h3>Tag:</h3>
          <input
            onChange={(event) => {
              setNewTag(event.target.value);
            }}
          />

          <br></br>
          <br></br>

          <button onClick={createSetlist}>Create Setlist</button>

          <br></br>
          <br></br>
          <hr></hr>

          <br></br>

          <form>
            <label>
              Order by:
              <select value={sortings} onChange={handleChange}>
                <option value="name">name</option>
              </select>
            </label>
          </form>

          <div className="SearchBar">
            <input
              type="text"
              name="title"
              placeholder="Search..."
              onChange={(event) => {
                setSearchParam(event.target.value);
              }}
            ></input>
          </div>

          <br></br>

          {setlists
            .filter((val) => {
              if (searchParam === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchParam.toLowerCase())
              ) {
                return val;
              } else if (
                val.show.toLowerCase().includes(searchParam.toLowerCase())
              ) {
                return val;
              } else if (
                val.band.toLowerCase().includes(searchParam.toLowerCase())
              ) {
                return val;
              } 
            })
            .map((setlist) => {
              //if(props.userID == setlist.createdBy) {
              return (
                <div>
                  <ShowSetlists tsetlist={setlist} />
                </div>
              );
              //}
            })}
        </div>
      )}
    </div>
  );
};

export default ManageSetlists;

/*

const addSongToSet = (id) => {
    setSetSongs([...setSongs, id]);
  };

  function addSetToSetlist(name, set) {
    ///setSetsArray([name,set])
    //var objetoAux=[];
    //objetoAux.push({name:name,set:set});
    //console.log("Sub array");
    setAux([...aux,{name:newNameSet,set:set}])
    //console.log(aux);
    
    setSetsArray([name,set])
  }

  function handleChangeOnSet(e) {
    e.preventDefault();
    setSongSearchParam(e.target.value);
  }

*/
