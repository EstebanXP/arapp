import React, { useEffect, useState } from 'react'
import {Box, NativeBaseProvider, Heading, HStack, Text, Center, Container, Content, Flex, Badge} from "native-base"
import  Carousel  from './Carousel'
import CarouselShows from './CarouselShows'
import CarouselBands from './CarouselBands'
import PopupBands from './PopupBands'
import ManageSets from './ManageSets'
import ManageSetlists from './ManageSetlists'
import ManageSongs from './ManageSongs'
import ShowTags from './ShowTags'
import ManageTags from './ManageTags'
import CarouselSetlist from './CarouselSetlist'
import SongsListHome from './SongsListHome'
const Home = (props) => {
    
    useEffect(()=>{

    })
    const [popBand, setPopBand] = useState(false);
    const [band, setBand] = useState();
    
  
    if(props.data === "Band Manager")
    return (
        <div> 
            {popBand ? <PopupBands thisBand={band} popBand={popBand} setPopBand={setPopBand}/> : null}
            <Box py="1"borderRadius="100" mt="2"w="12" ml="2" bg="fuchsia.400"/>
            <Heading size="md" ml="2" >Bands</Heading>
            <CarouselBands setBand={setBand} setPopBand={setPopBand} popBand={popBand}></CarouselBands>
            <Box py="1"borderRadius="100" mt="2"w="12" ml="2" bg="fuchsia.400"/>
            <Heading size="md" ml="2" >Shows</Heading>
            <CarouselShows ></CarouselShows>
            
        </div>
    )
    else if(props.data === "Live Experience Designer"){
        return(
            <div>
                <Box py="1"borderRadius="100" mt="2"w="12" ml="2" bg="fuchsia.400"/>
                <Heading size="md" ml="2" >Setlists</Heading>
                <CarouselSetlist userID={props.userID} />
                <Box py="1"borderRadius="100" mt="2"w="12" ml="2" bg="fuchsia.400"/>
                <Heading size="md" ml="2" >Tags</Heading>
                <HStack>
                    <Box w="30%">
                        <ManageTags></ManageTags>
                    </Box>
                    <Box w="70%">
                        <SongsListHome />
                    </Box>
                
                </HStack>
            </div>
        )
    }
}

export default Home
