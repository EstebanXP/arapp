import React, { useEffect, useState } from "react";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import ShowSongs from "./ShowSongs";
import ShowTags from "./ShowTags";
const tagsCollectionRef = collection(db, "Tag");

const ManageSongs = (props) => {
  const [tags, setTags] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [lista, setLista] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [sortings, setSortings] = useState("title");
  const [searchParam, setSearchParam] = useState("");
  const [localLyrics, setlocalLyrics] = useState("");
  const [tagSearchParam, setTagSearchParam] = useState("");
  const [status, setStatus] = useState(false);
  const [datos, setDatos] = useState({
    artista: "",
    cancion: "",
    chords: "",
    tab: "",
    tempo: "",
    Tags: [],
  });

  function getData(e) {
    e.preventDefault();
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }

  async function addSongToDB(e) {
    e.preventDefault();
    alert("Song saved!");
    await addDoc(collection(db, "songs"), {
      artist: datos.artista,
      chords: datos.chords,
      title: datos.cancion,
      lyrics: localLyrics,
      tab: datos.tab,
      tempo: datos.tempo,
      Tags: tagsArray,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function fetchAPI() {
    // param is a highlighted word from the user before it clicked the button
    return fetch(`https://api.lyrics.ovh/v1/${datos.artista}/${datos.cancion}`);
  }

  async function buscarCancion() {
    var proob = lista.find(
      (cancion) =>
        cancion.title === datos.cancion && cancion.artist === datos.artista
    );
    if (proob != null) {
      alert("Oooops... This song already exists!");
    } else {
      const response = await fetchAPI();
      if (response.status === 200) {
        setStatus(true);
        const myJson = await response.json(); //extract JSON from the http response
        setlocalLyrics(JSON.stringify(myJson));
      } else {
        setStatus(false);
      }
    }
  }

  
  //get Tags
  useEffect(() => {
    const tagsObject = query(collection(db, "Tag"));
    const tagsSnapshot = onSnapshot(tagsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTags(data);
    });
    return () => tagsSnapshot();
  }, []);

  useEffect(() => {
    const songsObject = query(collection(db, "songs"), orderBy(sortings)); //Guardar referencia de la coleccion
    const songsSnapshot = onSnapshot(songsObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLista(data); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => songsSnapshot();
  }, [sortings, editStatus]);

  return (
    <Box   mx="2" bg="white" borderRadius="20" shadow={4} >
      <Box mx="4">
        <HStack>
          <Input
            mt="4"
            mb="4"
            w="72%"
            type="text"
            name="title"
            placeholder="Search songs..."
            onChange={(event) => {
              setSearchParam(event.target.value);
            }}
            _hover = {{
              borderColor: '#4f46e5' 
            }}
            _invalid={{borderColor: '#4f46e5' }}
            _focus ={{borderColor: '#4f46e5' }}
            _disabled ={{borderColor: '#4f46e5' }}
            h="6"
            borderRadius="6"
          />
          <Text mt="4" ml="auto" mr="2">Order by:</Text>
          <Box mt="4">
              
              <select className="input-order-songs" value={sortings} onChange={handleChange}>
                <option value="artist">Artist</option>
                <option value="title">Title</option>
              </select>
            
          </Box>
        </HStack>
      </Box>
      {lista
        .filter((val) => {
          if (searchParam === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchParam.toLowerCase())
          ) {
            return val;
          } else if (
            val.artist.toLowerCase().includes(searchParam.toLowerCase())
          ) {
            return val;
          } /*else if(val.Tags.includes(searchParam)){
            console.log(val);
            return val;
          }*/
          /* else if(val.Tags.filter(ele=>)*/
        })
        .map((link) => (
          
           
            <Box  borderColor="info.200" borderTopWidth="1" bordeBottomWidth="1" key={link.id}>
            
              <ShowSongs setSong={props.setSong} setPopStatusSongs={props.setPopStatusSongs} popStatusSongs={props.popStatusSongs} song={props.song}
                song={link}
                title={link.title}
                tag={link.Tags}
                tempo={link.tempo}
                artist={link.artist}
                lyrics={link.lyrics}
                chords={link.chords}
              ></ShowSongs>
            </Box>
         
        ))}
                
      
    </Box>

  );
};

export default ManageSongs;
