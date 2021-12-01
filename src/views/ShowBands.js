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
  
  return (
    <Box w="100%" >
    
      <Box bg="white" borderRadius="20" shadow={4} mx="2" h="100%">
      <Box borderTopRadius="20" w="100%"             
        width="100%"
        height={32}
        alt="Alternate Text"
        position="absolute"
        bg="black"
        />
        <Image borderTopRadius="20" w="100%" source={{
                          uri: props.tband.bandLogo,
                      }} 
                      fallbackSource ={{ uri : "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}}
                      alt="Alternate Text"
                      width={400}
                      height={32}
                      opacity ="0.7"
                      alt="Alternate Text"
                      />
        
        <Center>
          <Heading textAlign="center" maxW="70%" mt="2">{props.tband.bandName}</Heading> 
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
