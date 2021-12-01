import React, { Fragment, useState } from "react";
import PopupSongs from "./PopupSongs";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri"
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {MdModeEditOutline} from 'react-icons/md'
import {MdRemove} from "react-icons/md"
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
      <HStack my="1" borderTopWidth=".5" borderColor="info.100">
        <Box >
          <Text bold>{props.title}</Text>
          <Text>{props.artist}</Text>
        </Box>
        <Box mx="auto"/>
        <Button borderRadius="10" p="0" size="6" ml="auto" my="auto" colorScheme="danger"><MdRemove color="white" /></Button>
      </HStack>
      
       
        
        
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
