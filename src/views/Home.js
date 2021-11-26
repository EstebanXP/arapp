import React, { useEffect } from 'react'
import {Box, NativeBaseProvider, Heading, HStack, Text, Center, Container, Content, Flex, Badge} from "native-base"
import  Carousel  from './Carousel'
const Home = (props) => {

    useEffect(()=>{

    })

    if(props.data === "Band Manager")
    return (
        <div>
            <h1>Band Manager</h1>
            <Carousel show={4}>
                <Box px="10" py="10" m="2" bg="black"></Box>
                <Box px="10" py="10" m="2"  bg="black"></Box>
                <Box px="10" py="10" m="2"  bg="black"></Box>
                <Box px="10" py="10" m="2"  bg="black"></Box>
                <Box px="10" py="10" m="2"  bg="black"></Box>
                <Box px="10" py="10" m="2"  bg="black"></Box>
            </Carousel>
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
