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
                {popBand ? <PopupBands thisBand={band} popBand={popBand} setPopBand={setPopBand}/> : null}
                <Heading size="md" >Bands</Heading>
                <CarouselBands setBand={setBand} setPopBand={setPopBand} popBand={popBand}></CarouselBands>
                <Heading size="md" >Shows</Heading>
                <CarouselShows ></CarouselShows>
                <ManageSets></ManageSets>
                <ManageTags></ManageTags>
                <ManageSetlists userID={props.userID} />
                <ManageSongs />
                
            </div>
        )
    }
}

export default Home
