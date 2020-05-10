import React from 'react'

export const Card = ({product}) => {
    console.log(product)
    return(
        <div className="card">
            <div className="img-box">
                <img src={product.images[0]} alt="" />
            </div>
            <div className="content">
                <h2>{product.title}</h2>
                <span>Price: {product.price} $</span> 
                
            </div>
        </div>

    )
} 