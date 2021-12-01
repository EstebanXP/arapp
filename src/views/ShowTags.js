import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    
      
      <Pressable dflexWrap="wrap" mx="1" mt="1" onPress={() => {props.setPopStatusTag(true); props.setTag(props.tag)}}  bg="rgb(199, 210, 254)" borderRadius="5" mt="2" _hover={{bg:"indigo.300"}} _focus={{bg:"indigo.300"}}>
      <Text color="rgb(79, 70, 229)" fontSize="xs" padding="5px">{props.tag.tagName}</Text>
      </Pressable>
      
  );
}

     
      
        

export default ShowTags;
