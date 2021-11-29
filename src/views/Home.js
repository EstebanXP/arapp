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
    
    console.log(popBand)
    if(props.data === "Band Manager")
    return (
        <div> 
            {popBand ? <PopupBands thisBand={band} popBand={popBand} setPopBand={setPopBand}/> : null}
            <Heading size="sm" color="#8e8d8a">Bands</Heading>
            <CarouselBands setBand={setBand} setPopBand={setPopBand} popBand={popBand}></CarouselBands>
            <Heading size="sm" color="#8e8d8a">Shows</Heading>
            <CarouselShows ></CarouselShows>
            
        </div>
    )
    else if(props.data === "Live Experience Designer"){
        return(
            <div>
                {popBand ? <PopupBands thisBand={band} popBand={popBand} setPopBand={setPopBand}/> : null}
                <Heading size="sm" color="#8e8d8a">Bands</Heading>
                <CarouselBands setBand={setBand} setPopBand={setPopBand} popBand={popBand}></CarouselBands>
                <Heading size="sm" color="#8e8d8a">Shows</Heading>
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
