import React from 'react'
import { useState, useEffect } from "react";
import left from '../assets/left.png';
import right from '../assets/right.png';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import {Box,Circle, HStack, Text} from "native-base"
const Carousel = (props) => {
    const {children, show} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [index, setIndex] =useState(length - show)
    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])
    return (
        <div className="carousel-container">
            <div className="contenedorFlechasChico">
                {/* You can alwas change the content of the button to other things */}
                
                    <AiOutlineLeft size =".5em" style={{margin : "2"}} color="#a8a29e" onClick={prev}/>
                
                
                    
                {/* You can alwas change the content of the button to other things */}
                
                    <AiOutlineRight size =".5em" style={{margin : "2"}} color="#a8a29e" onClick={next}/>
                    
             
                    
                
            </div>
            <div className="carousel-content-wrapper">
                <div
                    className={`carousel-content show-${show}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                >
                    {children}
                </div>
            </div>
            
            
        </div>
    )
}

export default Carousel