import React,{useEffect, useState} from 'react';
import Carousel from "./Carousel";

import {Box, Heading, Text, Badge, Button, Center} from "native-base"
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
    };

    return (
        <div>
            <Carousel show={4}>
            {shows.map((show) => {
                return (
                   <Box w="100">
                    <Box  h="100%" mx="2" bg="white" borderRadius="20" shadow={4} >
                        <Heading textAlign="center">{show.showBand}</Heading>
                        <Badge w="50%" colorScheme="indigo" borderRadius="5" mx="auto" mt="2">{show.showTag}</Badge>
                        <Text>Date: {show.showDate}</Text>
                        <Text>Location: {show.showLocation}</Text>
                        <Text>Show name: {show.showName}</Text>
                        <Text>Place: {show.showPlace}</Text>
                        <Text>Tour: {show.showTour}</Text>
                        
                        
                        <button onClick ={() => {deleteLiveShow(show.id)}}>Delete Live Show</button>
                    </Box>
                   </Box>
                );
            })}
            </Carousel>
        </div>
    );
};

export default CarouselShows;
