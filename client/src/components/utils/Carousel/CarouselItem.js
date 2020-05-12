import React from 'react'

export const CarouselItem = ({ src, width = '300px', height = '210px' }) => {
    return (
        <div style={{position:"relative"}}>
            <img style={{width,height}} src={src} alt="" />
         </div>
    )
}