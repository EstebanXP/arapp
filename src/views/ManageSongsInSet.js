import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import db from "../firebase";
import ShowSongs from "./ShowSongs";
import {MdModeEditOutline} from 'react-icons/md'
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
const ManageSongs = (props) => {
  const [editStatus, setEditStatus] = useState(false);
  const [lista, setLista] = useState([]);
  const [sortings, setSortings] = useState("title");
  const [searchParam, setSearchParam] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSortings(e.target.value);
  }

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
    <div className="col-md-8">
      <Center borderColor="info.200" borderTopWidth="1">
        <Heading textAlign="center" size="xs">Songs in set</Heading>
        <Input
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
        <Text mx="auto">
          Order by: 
          <select className="input-order-songs" value={sortings} onChange={handleChange}>
            <option value="artist">Artist</option>
            <option value="title">Title</option>
          </select>
        </Text>
      </Center>
      
      

      
        
      

      {lista.filter((val) => {
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
        } 
      }).map((link,index) => {
          if(props.tsongs.includes(link.id)){
            return(
              <div className="card mb-1">
                <ShowSongs
                  song={link}
                  title={link.title}
                  artist={link.artist}
                  //lyrics={link.lyrics}
                 // chords={link.chords}
                ></ShowSongs>
              </div>
            )
          }
      })}
    </div>
  );
};

export default ManageSongs;
