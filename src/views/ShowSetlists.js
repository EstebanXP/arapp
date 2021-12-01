import React, { useState, useEffect } from "react";
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import PopupSetlists from "./PopupSetlists";
import { BiExpandAlt } from "react-icons/bi";
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
        <Heading size="md" w="70%" mx="auto" mt="4" textAlign="center">{props.tsetlist.name}</Heading>
        
        <HStack mx="2" my="2">
          <Box >
            <Text bold ml="auto" textAlign="center">{props.tsetlist.band}</Text>
            <Text mr="auto" textAlign="center">{props.tsetlist.show}</Text>
          </Box>
          { props.tsetlist.tag !== null && props.tsetlist.tag !== undefined ?
            <Badge  colorScheme="indigo" borderRadius="5" ml="auto" my="auto">{props.tsetlist.tag}</Badge> : null
          }
          
        </HStack>
        
        <Stack>
          {list.map((set) => {
            if (set.setListID === props.tsetlist.id) {
              return (
                <Box  borderColor="info.200" borderTopWidth="1" bordeBottomWidth="1">
                  <ShowSets tset={set} />
                  
                </Box>
              );
            }
          })}

        </Stack>
        

        {/*<PopupSetlists
          trigger={popStatus}
          setPopStatus={setPopStatus}
          thisSetlist={props.tsetlist}
        />*/}
         <Button mt="2" borderRadius="10" size="6" position="absolute" top="2" right="2" colorScheme="indigo" onPress={() => {props.setPopStatusSetlist(true); props.setSetlist(props.tsetlist)}}><BiExpandAlt color="white"/></Button>
        
      </Box>
    </div>
  );
};

export default ShowSetlists;
