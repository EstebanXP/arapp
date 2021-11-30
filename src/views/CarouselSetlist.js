import React, { useEffect, useState } from "react";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
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
import Carousel from "./Carousel"

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
          

          <HStack ml="2" mb="2">
            <HStack>
              <Text mr="2"mt="0.5">
                Order by:
              </Text>
              <Box>
              <select className="input-order"value={sortings} onChange={handleChange}>
                  <option value="name">name</option>
                </select>
              </Box>
            </HStack>
            
            <Input
            ml="2"
            className="input"
            h="26px"
              type="text"
              name="title"
              placeholder="Search..."
              onChange={(event) => {
                setSearchParam(event.target.value);
              }}
            ></Input>
          </HStack>
          <Carousel show={5}>
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
                <Box w="100" >
                  <Box  h="100%" mx="2" bg="white" borderRadius="20" shadow={4} >
                    <ShowSetlists tsetlist={setlist} />
                  </Box>
                </Box>
              );
              //}
            })}
            </Carousel>
        </div>
      )
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
