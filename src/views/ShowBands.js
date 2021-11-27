import React, { useState } from "react";
import PopupBands from "./PopupBands";
import ManageMemInBands from "./ManageMemInBands"
import {Box, Heading, Text, Badge, Button, Center} from "native-base"
  const ShowBands = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  
  return (
    <Box bg="white" borderRadius="20" shadow={4} mx="2%">
        <Center>
        <Heading textAlign="center" maxW="90%">{props.tband.bandName}</Heading> </Center>
        {/*<p>Logo: {props.tband.bandLogo}</p>*/}
        <Text textAlign="center" isTruncated maxW="90%">{props.tband.bandDescription}</Text>
        <Badge w="50%" colorScheme="lime" borderRadius="5" mx="auto">{props.tband.bandGenres}</Badge>
        <p>Band members: </p>
        <ManageMemInBands tsongs = {props.tband.bandMembers}/>

        <Button borderRadius="10" w="50%" mx="auto"colorScheme="indigo" onPress={() => setPopStatus(true)}>Edit this band</Button>
        {<PopupBands
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisBand = {props.tband}
        />}
      
    </Box>
  );
};

export default ShowBands;
