import React from 'react'
import { useState, useEffect } from "react";
import left from '../assets/left.png';
import right from '../assets/right.png';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import {Box,Circle, HStack, Text} from "native-base"
const Carousel = (props) => {
    const {children, show} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [index, setIndex] =useState(length - show)
    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + show)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - show)
        }
    }
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])
    return (
        <div className="carousel-container">
            <div className="contenedorFlechas">
                {/* You can alwas change the content of the button to other things */}
                
                    <BsFillArrowLeftCircleFill size ="2em" style={{margin : "2"}} color="#a8a29e" onClick={prev}/>
                
                
                    
                {/* You can alwas change the content of the button to other things */}
                
                    <BsFillArrowRightCircleFill size ="2em" style={{margin : "2"}} color="#a8a29e" onClick={next}/>
                    
             
                    
                
            </div>
            <div className="carousel-content-wrapper">
                <div
                    className={`carousel-content show-${show}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                >
                    {children}
                </div>
            </div>
            <HStack>
            {(()=>{
                
                for(let i=0;i<(length - show); i++){
                    return(
                        <Circle mx="1"size="2" bg="indigo.500"/>
                    )
                    
                }
            })()}
            <Circle mx="1"size="2" bg="indigo.500"/>
            </HStack>
            
        </div>
    )
}

export default Carousel