import React, { useState } from "react";
import PopupSets from "./PopupSets";
import ManageSongsInSet from "./ManageSongsInSet";
import {FaTimes} from 'react-icons/fa'
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {MdModeEditOutline} from 'react-icons/md'
import {BiExpandAlt, BiCollapse} from "react-icons/bi"
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri"
const ShowSets = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  
  
  return (
    <div className="container">
      <div className="card-body">
        <HStack mx="2" py="2">
          <Text italic >{props.tset.name}</Text>
          <HStack ml="auto">
            {/*Poner el boton de editar dentro del set*/}
            
            <Button borderRadius="10" size="6"  colorScheme="fuchsia" onPress={() => setShowSongs(!showSongs)}>{showSongs ? <RiArrowDropUpLine color="white" /> : <RiArrowDropDownLine color="white" />}</Button>
          </HStack>
        
        </HStack>
        
        

        { showSongs ? 
          //<p>List of songs: {props.tset.songs}</p>
          <ManageSongsInSet tsongs = {props.tset.songs}/>
          : null 
        }

        <PopupSets
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSet = {props.tset}
          setPopStatus={setPopStatus}
          
        />
      </div>
    </div>
  );
};

export default ShowSets;
