import React from 'react'
import { useSelector } from 'react-redux'
import './utils/Card/Card.css'

import { MainLayout } from './layouts/MainLayout'
import { Card } from './utils/Card/Card.js'
import { Carousel } from './utils/Carousel/Carousel'

export const LandingPage = () => {
    const products = useSelector(state => state.products.products)
    return <MainLayout>
        <h1 style={{ textAlign: 'center', fontFamily: 'Great Vibes', margin: '20px 0' }}>Let`s Travel Anywhere</h1>
        <div className="card-container">
            {
                products && products.map(product => (
                    <Card key={product._id} product={product} />
                    // <Card style={{ width: '300px', margin: '10px auto' }} key={product._id}>
                    //     <div >

                    //         {/* <CardImg className='h-100' src={product.images[0]} alt="Card image cap" /> */}
                    //         <Carousel items={product.images} />
                    //     </div>
                    //     <CardBody>
                    //         <CardTitle>{product.title}</CardTitle>
                    //         <CardText>{product.price} $</CardText>
                    //     </CardBody>
                    // </Card>
                ))
            }

        </div>
    </MainLayout>
}