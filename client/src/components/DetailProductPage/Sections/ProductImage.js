import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

export const ProductImage = ({items}) => {
    const [Images, setImages] = useState([])

    useEffect(()=>{
        if(items && items.length > 0){
            let images = []

            items.map(image => {
                return images.push({
                    original:`http://localhost:5000/${image}`,
                    thumbnail:`http://localhost:5000/${image}`,
                    sizes:'maxHeight:300px'
                })
            })
            setImages(images)
        }
    },[items])
    return (
        <div>
            <ImageGallery 
                items={Images}
                showFullscreenButton={false}
                showPlayButton={false}
                useBrowserFullscreen={false}
            />
        </div>
    )
}
