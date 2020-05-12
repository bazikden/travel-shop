import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from 'reactstrap'

import '../utils/Card/Card.css'
import { MainLayout } from '../layouts/MainLayout'
import { Card } from '../utils/Card/Card.js'
import { ProductFilter } from '../utils/ProductFilter/ProductFilter'
import { SHOW_MORE_PRODUCTS } from '../../redux/reducers/types'
import { RadioButtonBlock } from '../utils/ProductFilter/Sections/RadioButtonBlock'
import { CheckBoxBlock } from '../utils/ProductFilter/Sections/CheckBoxBlock'
import Axios from 'axios'

export const LandingPage = ({ getAllProducts }) => {
    const { products, continents, prices, renderProps } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { skip, limit,filter } = renderProps

    const onLoadMore = () => {
        const variables = {
            skip:skip+limit,
            limit,
            filter
        }
        Axios.post('api/products/getAllProducts',variables)
            .then(res => {
                if(res.data.success){
                    dispatch({ type: SHOW_MORE_PRODUCTS, payload: res.data.products})
                }else{
                    alert('Failed to load data')
                }
            })
            .catch(err => console.log('Server error',err))
        
    }
    return <MainLayout>
        <h1 style={{ textAlign: 'center', fontFamily: 'Great Vibes', margin: '20px 0' }}>Let`s Travel Anywhere</h1>
        <div className="card-container">
            <div className='w-100 d-flex mx-3 mb-5 filter-panel '>
                <ProductFilter className="continent-filter" items={continents} title="Continent Kind" Component={CheckBoxBlock} />
                <ProductFilter className="price-filter" items={prices} title="Price Range" Component={RadioButtonBlock} />
                <Input className="mx-2 search-product"  type="text" name="search" placeholder="Search" />

            </div>
            {
                products && products.map(product => (
                    <Card key={product._id} product={product} />
                ))
            }

            {
                products && (<div style={{ flexBasis: '100%' }}>
                    <button onClick={onLoadMore} className="d-block mx-auto">Load More</button>
                </div>)
            }

        </div>
    </MainLayout>
}