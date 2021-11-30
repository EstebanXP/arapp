import React, { useState } from "react";
import PopupBands from "./PopupBands";
import ManageMemInBands from "./ManageMemInBands"
import {Box, Heading, Text, Badge, Button, Center, Image, Pressable} from "native-base"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {BiExpandAlt} from "react-icons/bi"
  const ShowBands = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  function bandFunc(){
    props.setBand(props.tband);
    
  }
  const LinkB = props.linkBand;
  return (
    <Box w="100%">
      <Box bg="white" borderRadius="20" shadow={4} mx="2" h="100%">
        <Center>
          <Heading textAlign="center" maxW="90%" mt="2">{props.tband.bandName}</Heading> 
          <Text textAlign="center" isTruncated maxW="90%">{props.tband.bandDescription}</Text> 
          <Badge  colorScheme="light" borderRadius="5" mx="auto" mt="2">{props.tband.bandGenres}</Badge>
         </Center>
          
         
          <ManageMemInBands tsongs = {props.tband.bandMembers}/>
          <Box></Box>
          <Button mt="2" borderRadius="10" size="6" position="absolute" top="2" right="2" colorScheme="indigo" onPress={()=>{props.setBand(props.tband); props.setPopBand(true);}}><BiExpandAlt color="white"/></Button>
          
          
        
      </Box>
    </Box>
  );
};

export default ShowBands;
