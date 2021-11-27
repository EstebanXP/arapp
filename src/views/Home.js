import React, { useEffect } from 'react'
import {Box, NativeBaseProvider, Heading, HStack, Text, Center, Container, Content, Flex, Badge} from "native-base"
import  Carousel  from './Carousel'
import ManageBands from './ManageBands'
import CarouselBands from './CarouselBands'
const Home = (props) => {

    useEffect(()=>{

    })

    if(props.data === "Band Manager")
    return (
        <div>
            
            <CarouselBands></CarouselBands>
        </div>
    )
    else if(props.data === "Live Experience Designer"){
        return(
            <div>
                <h1>Live Experience Designer</h1>
            </div>
        )
    }
}

export default Home
