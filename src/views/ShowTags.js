import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    <Box flex={1} bg="black" w="30%">
      <Badge mx="auto" colorScheme="indigo" borderRadius="5" mt="2">{props.tag.tagName}</Badge>
        <PopupTags
          trigger={popStatus}
          setPopStatus={setPopStatus}
          tag={props.tag}
        ></PopupTags>
      </Box>
  );
}

export default ShowTags;
