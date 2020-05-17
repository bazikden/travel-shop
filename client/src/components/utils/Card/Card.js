import React from 'react'
import { Carousel } from '../Carousel/Carousel'
import { NavLink } from 'react-router-dom'

export const Card = ({product}) => {
    return(
        <div className="card">
            <div className="img-box">
                {
                    product.images.length > 2 ?
                        (<Carousel items={product.images}/>) 
                        :
                        (
                        <img src={product.images[0]} alt="" />
                        )
                }
                
                
            </div>
            <div className="content">
                <h2>{product.title}</h2>
                <span>Price: {product.price} $</span> 
                <NavLink to={`products/${product._id}`}><button className="card-detail-button">Details</button></NavLink>
            </div>
        </div>

    )
} 