import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    <Box flex={1} bg="black" w="100%">
      <Pressable display="flex" flexDirection="row" flexWrap="wrap" mx="auto" onPress={() => setPopStatus(true)}>
      <Badge colorScheme="indigo" borderRadius="5" mt="2">{props.tag.tagName}</Badge>
      </Pressable>
        <PopupTags
          trigger={popStatus}
          setPopStatus={setPopStatus}
          tag={props.tag}
        ></PopupTags>
      </Box>
  );
}

export default ShowTags;
