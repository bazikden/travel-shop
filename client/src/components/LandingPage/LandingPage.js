import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from 'reactstrap'

import '../utils/Card/Card.css'
import { MainLayout } from '../layouts/MainLayout'
import { Card } from '../utils/Card/Card.js'
import { ProductFilter } from '../utils/ProductFilter/ProductFilter'
import { SHOW_MORE_PRODUCTS, GET_ALL_PRODUCTS } from '../../redux/reducers/types'
import { RadioButtonBlock } from '../utils/ProductFilter/Sections/RadioButtonBlock'
import { CheckBoxBlock } from '../utils/ProductFilter/Sections/CheckBoxBlock'
import Axios from 'axios'


export const LandingPage = () => {
    const { products, continents, prices, renderProps } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { skip, limit, filter } = renderProps
    const [searchValue,setSearchValue] = useState("")

    const getProducts = variables => {
        clearInterval(window.slideInterval)
        Axios.post('api/products/getAllProducts', variables)
        .then(res => {
            if (res.data.success) {
                variables.skip === skip?
                dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.products })
                :
                dispatch({ type: SHOW_MORE_PRODUCTS, payload: res.data.products })
            } else {
                alert('Failed to load data')
            }
        })
        .catch(err => console.log('Server error', err))
    }

    const onLoadMore = () => {
        const variables = {
            skip: skip + limit,
            limit,
            filter
        }

        getProducts(variables)
    }



    const onSearchChange = e => {
        setSearchValue(e.target.value)
        const variables =  {
            skip:0,
            searchValue:e.target.value,
            filter
        }
        getProducts(variables)
    }

    

    return <MainLayout>
        <h1 style={{ textAlign: 'center', fontFamily: 'Great Vibes', margin: '20px 0' }}>Let`s Travel Anywhere</h1>
        <div className="card-container">
            <div className='w-100 d-flex mx-3 mb-5 filter-panel '>
                <ProductFilter className="continent-filter" items={continents} title="Continent Kind" Component={CheckBoxBlock} />
                <ProductFilter className="price-filter" items={prices} title="Price Range" Component={RadioButtonBlock} />
                <Input
                     onChange={onSearchChange}
                     className="mx-2 search-product" 
                     type="text" 
                     name="search" 
                     placeholder="Search"
                     value={searchValue}


                />

            </div>
            {
                products && products.map(product => (
                    <Card key={product._id} product={product} />
                ))
            }

            {
                products && (<div style={{ flexBasis: '100%' }}>
                    <button onClick={onLoadMore} className="d-block mx-auto mb-3">Load More</button>
                </div>)
            }

        </div>
    </MainLayout>
}