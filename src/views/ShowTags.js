import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    
      
      <Pressable dflexWrap="wrap" mx="1" mt="1" onPress={() => {props.setPopStatusTag(true); props.setTag(props.tag)}}>
        <Badge colorScheme="indigo" borderRadius="5" mt="2">{props.tag.tagName}</Badge>
      </Pressable>
      
  );
}

     
      
        

export default ShowTags;
