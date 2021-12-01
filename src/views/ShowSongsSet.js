import React, { Fragment, useState } from "react";
import PopupSongs from "./PopupSongs";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri"
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {MdModeEditOutline} from 'react-icons/md'
const ShowSongs = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [showSongs, setShowSongs] = useState(false)
  const [currentSong, setCurrentSong] = useState({
    artist: "",
    lyrics: "",
    title: "",
    id: "",
    chords: "",
    tempo: "",
  });
  console.log(props.tag);
  function editSong(song) {
    setCurrentSong({
      title: song.title,
      lyrics: song.lyrics,
      artist: song.artist,
      id: song.id,
      chords: song.chords,
      tempo: song.tempo,
      tab: song.tab,
    });
  }
  return (
    <div className="container">
      <div className="card-body">
      <HStack my="1">
        <Box ml="4">
          <Text bold>{props.title}</Text>
          <Text>{props.artist}</Text>
          <HStack my="2">
          {props.tempo !== null && props.tempo !== "" && props.tempo !== undefined ?
            <Badge mr="2" borderRadius="5"><Text color="trueGray.400" >{props.tempo} bpm</Text></Badge> : null
          }
          
          
          
          {
            (props.tag.map((element)=>{
              if(element !== null){
                return(
                  <Badge  mr="2" colorScheme="indigo" borderRadius="5">{element}</Badge>
                )
              }
              
            })) 
          }
          
          </HStack>
          
          
          
        </Box>
        <Button borderRadius="10" size="6" ml="auto" my="auto" mr="4"colorScheme="info" onPress={() => setShowSongs(!showSongs)}>{showSongs ? <RiArrowDropUpLine color="white" /> : <RiArrowDropDownLine color="white" />}</Button>
      </HStack>
      
        
        { showSongs ? 
          (<Box mx="4">
            <HStack>
              <Text bold>Lyrics:</Text>
              <Button colorScheme="white" ml="auto" borderColor="indigo.600" borderWidth="1" borderRadius="10" size="6"  onPress={() => {props.setPopStatusSongs(true); props.setSong(props.song)}}><MdModeEditOutline color="rgb(79, 70, 229)"/></Button>
            </HStack>
            <Text>{props.lyrics}</Text>
            <Text>Acordes: {props.chords}</Text>
            
          </Box>
          ): null
        }
        
        
        {/*AQUI SE MUESTRA CADA CANCION INDIVIDUALMENTE, JUNTO CON SU RESPECTIVO POPUP */}
        {/*
        <PopupSongs
          trigger={popStatus}
          setPopStatus={setPopStatus}
          song={props.song}
        ></PopupSongs>
        */}
      </div>
    </div>
  );
};

export default ShowSongs;
