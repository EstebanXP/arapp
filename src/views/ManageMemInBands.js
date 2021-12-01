import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import {Box, Heading, Text, Badge, Button, Center, Image} from "native-base"
import  Carousel from "./CarouselChico";
const ManageSongs = (props) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const usersObject = query(collection(db, "Users"));
    const usersSnapshot = onSnapshot(usersObject, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        if(props.tsongs.includes(doc.id)){
        data.push({ ...doc.data(), id: doc.id });
      }});
      setLista(data);
    });
    return () => usersSnapshot();
  }, []);

  return (
    <Carousel show={2}>
      {lista.map((link) => {
          
            return(
              <Box w="100%" >
                <Box  h="100%" borderRadius="20" mx="2">
                  <Center>
                    <Image
                    mt="2"
                      source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                      }}
                      alt="Alternate Text"
                      size="xs"
                      borderRadius="100"
                    />
                  <Text>{link.userName}</Text><Text bold mb="2"> @{link.userUsername}</Text>
                  </Center>
                
                </Box>              
              </Box>
            )
          
      })}
    </Carousel>
  );
};

export default ManageSongs;
