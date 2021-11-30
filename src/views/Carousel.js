import React from 'react'
import { useState, useEffect } from "react";
import left from '../assets/left.png';
import right from '../assets/right.png';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import {Box,Circle, HStack, Text} from "native-base"
const Carousel = (props) => {
    let Indicator = () => {
        
        return <HStack>{Array.from(Array(30), (e, i) => {
            if(i<length - show){
                return <Circle mx="1"size="2" bg= {currentIndex === (i*show) ? "indigo.500" : "indigo.200"} key={i}/>
            }
            else{
                return null;
            }
        })}</HStack>
      }
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
            {length - show > 0 ?  <div className="contenedorFlechas">
                {/* You can alwas change the content of the button to other things */}
                
                    <AiOutlineLeft size ="1em" style={{margin : "2"}} color="#a8a29e" onClick={prev}/>
                
                
                    
                {/* You can alwas change the content of the button to other things */}
                
                    <AiOutlineRight size ="1em" style={{margin : "2"}} color="#a8a29e" onClick={next}/>
            </div> : null} 
           
            <div className="carousel-content-wrapper">
                <div
                    className={`carousel-content show-${show}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                >
                    {children}
                </div>
            </div>
            {/* <HStack>
            {(()=>{
                
                for(let i=0;i<(length - show); i++){
                    return(
                        <Circle mx="1"size="2" bg="indigo.500"/>
                    )
                    
                }
            })()}
            <Circle mx="1"size="2" bg="indigo.500"/>
            </HStack> */}
            <div className="estado-circulos">
                <Indicator/>
                
            </div>
            
        </div>
    )
}

export default Carousel