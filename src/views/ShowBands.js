import React, { useState } from "react";
import PopupBands from "./PopupBands";
import ManageMemInBands from "./ManageMemInBands"
import {Box, Heading, Text, Badge, Button, Center, Image} from "native-base"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
          <Text textAlign="center" isTruncated maxW="90%">{props.tband.bandDescription}</Text> </Center>
          <Badge  colorScheme="light" borderRadius="5" mx="auto" mt="2">{props.tband.bandGenres}</Badge>
         
          <ManageMemInBands tsongs = {props.tband.bandMembers}/>

          <Button mt="2" borderRadius="10" w="50%" mx="auto" mb="2" colorScheme="indigo" onPress={()=>{props.setBand(props.tband); props.setPopBand(true);}}>Edit this band</Button>
          
          
        
      </Box>
    </Box>
  );
};

export default ShowBands;
