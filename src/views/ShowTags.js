import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    
      
      <Pressable dflexWrap="wrap" m="1" onPress={() => setPopStatus(true)}>
        <Badge colorScheme="indigo" borderRadius="5" mt="2">{props.tag.tagName}</Badge>
      </Pressable>
    
      
  );
}
/*
      Sacar de componentes
      
        <PopupTags
          trigger={popStatus}
          setPopStatus={setPopStatus}
          tag={props.tag}
      ></PopupTags>*/

export default ShowTags;
