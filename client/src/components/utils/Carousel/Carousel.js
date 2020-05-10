import React, { useState, useEffect, useRef } from 'react'

import {useInterval} from './utils/useInterval'
import './Carousel.css'
import { CarouselItem } from './CarouselItem'

let position = -300

const styles = {
    carouselContainer: {
        width: '300px',
        height: '210px',
        border: '1px solid black',
        boxSizing: 'border-box',
        zIndex: 100,
        margin: '0 auto',
        overflow: 'hidden'

    },

}

const containerWidth = styles.carouselContainer.width.replace(/px/, '')
const containerHeight = styles.carouselContainer.height.replace(/px/, '')

// function useInterval(callback, delay) {
//     const savedCallback = useRef();

//     // Remember the latest callback.
//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);

//     // Set up the interval.
//     useEffect(() => {
//         function move() {
//             savedCallback.current();
//         }
//         if (delay !== null) {
//             let id = setInterval(move, delay);
//             return () => clearInterval(id);
//         }
//     }, [delay]);
// }



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
        picturesRef.current.classList.add('moving')
        const newPictures = [...pictures]
        const elem = newPictures[0]
        newPictures.splice(0, 1)
        newPictures.push(elem)
        setTimeout(() => {
            picturesRef.current.classList.remove('moving')
            setPictures(newPictures)
        }, 1000)
    }

    // Started if isRunning true
    useInterval(() => {
        movePictures()
    }, isRunning ? 2000 : null)


    const onMouseEnter = () => {
        movePictures()
        setIsRunning(true)

    }
    const onMouseLeave = () => {
        setIsRunning(false)
    }


    return (
        <div
            style={styles.carouselContainer}
            onClick={movePictures}

            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="picture-container" ref={picturesRef} >
                {
                    pictures.map((elem, i) => (
                        <CarouselItem
                            key={elem + i}
                            src={elem}
                            width={containerWidth - 2 * styles.carouselContainer.border.trim()[0]}
                            height={containerHeight - 2 * styles.carouselContainer.border.trim()[0]}
                        />
                    ))
                }
            </div>

        </div>
    )
}