import React from 'react'
import { Button } from 'reactstrap'

export const ProductInfo = ({product}) => {
    return (
        <div >
            <h4>Product Info</h4>
            <div className="d-flex w-100 mt-2">
    <div className="p-2 flex-fill border bd-highlight">Price: <span>{product.price}$</span></div>
                <div className="p-2 flex-fill border bd-highlight">Sold: <span>{product.sold}</span></div>
                <div className="p-2 flex-fill border bd-highlight">Views: <span>{product.views}</span></div>
            </div>
            <div className="border bg-light d-flex flex-column">
                <h6 className="p-2">Description:</h6>
                <div>
                    <p style={{padding:'10px'}}>{product.description && product.description}</p>
                </div>
            </div>

            <Button style={{background:'var(--blue)'}} className="btn border-0 d-block mx-auto mt-4">Add to cart</Button>
        </div>
    )
}
