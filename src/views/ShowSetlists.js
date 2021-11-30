import React, { useState, useEffect } from "react";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import PopupSetlists from "./PopupSetlists";
import db from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import PopupSets from "./PopupSets";
import ShowSets from "./ShowSets";
const setsObject = query(collection(db, "sets"));

const ShowSetlists = (props) => {
  const [popStatus, setPopStatus] = useState(false);
  const [popSetStatus, setPopSetStatus] = useState(false);
  const [list, setList] = useState([]); //sets

  useEffect(() => {
    //Guardar referencia de la coleccion
    const setsSnapshot = onSnapshot(setsObject, (querySnapshot) => {
      let data1 = [];
      querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
      });
      setList(data1); //Se guardan todos los datos en el arreglo lista para poder usarlos aqui
    });
    return () => setsSnapshot();
  }, []);

  return (
    <div className="carousel-setlists">
      <Box>
        <Heading size="md" w="90%" mx="auto" mt="2" textAlign="center">{props.tsetlist.name}</Heading>
        <Badge  colorScheme="indigo" borderRadius="5" mx="auto" mt="2">{props.tsetlist.tag}</Badge>
        <HStack mx="2" my="1">
          <Text mr="auto" textAlign="center">{props.tsetlist.show}</Text>
          <Box px="1"/>
          <Text ml="auto" textAlign="center">{props.tsetlist.band}</Text>
          
        </HStack>
        <Text ml="2" bold>Sets</Text>
          <Stack>
          {list.map((set) => {
            if (set.setListID === props.tsetlist.id) {
              return (
                <Box  borderColor="fuchsia.200" borderTopWidth="1" bordeBottomWidth="1">
                  <ShowSets tset={set} />
                  
                </Box>
              );
            }
          })}

        </Stack>
        

        <PopupSetlists
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSetlist={props.tsetlist}
        />
        <Button colorScheme="indigo" w="32" mx="auto"  my="2"borderRadius="8" onPress={() => setPopStatus(true)}>Edit this setlist</Button>
      </Box>
    </div>
  );
};

export default ShowSetlists;
