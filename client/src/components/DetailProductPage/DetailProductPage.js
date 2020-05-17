import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router'

import './DetailProductPage.css'
import { MainLayout } from '../layouts/MainLayout'
import { ProductImage } from './Sections/ProductImage'
import { ProductInfo } from './Sections/ProductInfo'
import { Loader } from '../utils/Loader/Loader'

export const DetailProductPage = () => {
    const [product, setProduct] = useState(null)
    const params = useParams()

    useEffect(()=>{
        Axios.get(`/api/products/getProductById?id=${params.productId}&type=single`)
            .then(res => {setProduct(res.data.product)})
            .catch(err => console.log(err)) 
    },[params.productId])
    if(!product) return <Loader />
    return(
        <MainLayout>
            {
                product && (
                    <div className="detail-product-page">
                    <h2 className="text-center my-3">{product.title}</h2>
                    <div className="row">
                        <div  className="col-lg-6"><ProductImage items={product.images} /></div>
                        <div className="col-lg-6"><ProductInfo product={product} /></div>
                    </div> 
                </div>
                )
            }

        </MainLayout>

    )
}