import React, { useState, useEffect, useRef } from 'react'
import ReactTouchEvents from "react-touch-events"

import {useInterval} from './utils/useInterval'
import './Carousel.css'
import { CarouselItem } from './CarouselItem'



const styles = {
    carouselContainer: {
        width: '280px',
        height: '210px',
        borderRadius: '4px',
        boxSizing: 'border-box',
        zIndex: 100,
        margin: '0 auto',
        overflow: 'hidden'

    },

}

const containerWidth = Number(styles.carouselContainer.width.replace(/px/, ''))
const containerHeight = Number(styles.carouselContainer.height.replace(/px/, ''))




export const Carousel = ({ items }) => {
    const [pictures, setPictures] = useState([])
    const [isRunning, setIsRunning] = useState(false);
    const picturesRef = useRef(null)
    useEffect(() => {
        const elem = items[items.length - 1]
        items.pop()
        items.unshift(elem)
        setPictures([...items])
    }, [items])



    const movePictures = () => {
        if(picturesRef.current){
            picturesRef.current.classList.add('moving')
            const newPictures = [...pictures]
            const elem = newPictures[0]
            newPictures.splice(0, 1)
            newPictures.push(elem)
            if(picturesRef.current){
             setTimeout(() => {
                picturesRef.current && picturesRef.current.classList.remove('moving')
                picturesRef.current && setPictures(newPictures)
                }, 1490)
            } 
        }
   
    }

    // Started if isRunning true
    useInterval(() => {
        picturesRef.current ? movePictures() : setIsRunning(false)
    }, isRunning ? 2000 : null)


    const onMouseEnter = () => {
        setTimeout(()=>{movePictures()},1000)
        setIsRunning(true)

    }
    const onMouseLeave = () => {
        setIsRunning(false)
    }


    return (
        <div
            style={styles.carouselContainer}

            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ReactTouchEvents onTap={()=>{
                isRunning? setIsRunning(false): onMouseEnter()
            }}>
                <div className="picture-container" ref={picturesRef} >
                    {
                        pictures.map((elem, i) => (
                            <CarouselItem
                                key={elem + i}
                                src={elem}
                                width={(containerWidth) + 1 + 'px'}
                                height={containerHeight + 1 + 'px'}
                            />
                                

                        ))
                    }
                </div>
            </ReactTouchEvents>


        </div>
    )
}