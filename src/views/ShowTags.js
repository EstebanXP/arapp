import React, { useState } from "react";
import PopupTags from "./PopupTags";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Pressable} from "native-base"

function ShowTags(props) {
  const [popStatus, setPopStatus] = useState(false);
  return (
    <div className="container">
      <div className="card-body">
      <Pressable onPress={() => setPopStatus(true)}>
      <Badge w="50%" colorScheme="indigo" borderRadius="5" mx="auto" mt="2">{props.tag.tagName}</Badge>
      </Pressable>
        <PopupTags
          trigger={popStatus}
          setPopStatus={setPopStatus}
          tag={props.tag}
        ></PopupTags>
      </div>
    </div>
  );
}

export default ShowTags;
