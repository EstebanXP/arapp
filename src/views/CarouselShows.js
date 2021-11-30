import React,{useEffect, useState} from 'react';
import Carousel from "./Carousel";
import {BsTrash} from "react-icons/bs"
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack} from "native-base"
import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';

const CarouselShows = () => {

    const [showBand, setNewBand] = useState("");
    const [showDate, setNewDate] = useState("");
    const [showLocation, setNewLocation] = useState("");
    const [showName, setNewname] = useState("");
    const [showPlace, setNewPlace] = useState("");
    const [showTag, setNewTag] = useState("");
    const [showTour, setNewTour] = useState("");

    const [shows, setShows] = useState([]);
    const showsCollectionRef = collection(db, "LiveShows");
    const [isOpen, setIsOpen] = React.useState(false)

  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)

    //get live shows
    useEffect(() => {
        const showsObject = query(collection(db,"LiveShows"));
        const showsSnapshot = onSnapshot(showsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setShows(data);
        });
        return ()=> showsSnapshot(); 

    }, []);

    //create Shows
    const createLiveShow = async () => {
        await addDoc(showsCollectionRef, { showBand: showBand, showDate: showDate, showLocation: showLocation, showName: showName, 
                showPlace: showPlace, showTag: showTag, showTour: showTour });
    };

    //delete Shows
    const deleteLiveShow = async (id) => {
        const showDoc = doc(db, "LiveShows", id);
        await deleteDoc(showDoc);
        setIsOpen(false);
    };

    return (
        <div className="carousel-shows">
            <Box mb="2"/>
            <Carousel show={2}>
            {shows.map((show) => {
                return (
                   <Box w="100" >
                    <Box  h="100%" mx="2" bg="white" borderRadius="20" shadow={4} >
                        
                        <Heading textAlign="center" mt="2">{show.showBand}</Heading>
                        <Badge  colorScheme="indigo" borderRadius="5" mx="auto" mt="2">{show.showTag}</Badge>
                        <Stack ml="2">
                            <Text><Text bold>Date: </Text>{show.showDate}</Text>
                            <Text><Text bold>Location: </Text>{show.showLocation}</Text>
                            <Text><Text bold>Show name: </Text> {show.showName}</Text>
                            <Text><Text bold>Place: </Text> {show.showPlace}</Text>
                            <Text><Text bold>Tour: </Text>{show.showTour}</Text>
                        </Stack>
                        
                        <Center mb="2">
                            <Button colorScheme="danger" borderRadius="10" onPress={() => setIsOpen(!isOpen)}>
                                <BsTrash color="white"></BsTrash>
                            </Button>
                            <AlertDialog
                                leastDestructiveRef={cancelRef}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>Delete Show</AlertDialog.Header>
                                <AlertDialog.Body>
                                    This will delete this show. This action cannot be
                                    reversed. Deleted data can not be recovered.
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                    <Button
                                        borderRadius="10"
                                        variant="unstyled"
                                        colorScheme="coolGray"
                                        onPress={onClose}
                                        ref={cancelRef}
                                    >
                                        Cancel
                                    </Button>
                                    <Button borderRadius="10" colorScheme="danger" onPress ={() => {deleteLiveShow(show.id)}}>
                                        Delete
                                    </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                        </Center>
                    </Box>
                   </Box>
                );
            })}
            </Carousel>
        </div>
    );
};

export default CarouselShows;
