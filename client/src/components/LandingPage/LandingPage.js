import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from 'reactstrap'

import '../utils/Card/Card.css'
import { MainLayout } from '../layouts/MainLayout'
import { ProductFilter } from '../utils/ProductFilter/ProductFilter'
import { SHOW_MORE_PRODUCTS, GET_ALL_PRODUCTS, SET_LOADING } from '../../redux/reducers/types'
import { RadioButtonBlock } from '../utils/ProductFilter/Sections/RadioButtonBlock'
import { CheckBoxBlock } from '../utils/ProductFilter/Sections/CheckBoxBlock'
import Axios from 'axios'
import { Loader } from '../utils/Loader/Loader'
import { ProductPage } from './Secitons/ProductPage'


export const LandingPage = () => {
    const { products, continents, prices, renderProps, isLoading } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { skip, filter } = renderProps
    const [searchValue, setSearchValue] = useState("")


    
    const getProducts = variables => {
        clearInterval(window.slideInterval)
        //  dispatch({ type: SET_LOADING, payload: true })
        Axios.post('http://localhost:5000/api/products/getAllProducts', variables)
            .then(res => {
                if (res.data.success) {
                    if (variables.skip === skip) {
                        // debugger
                        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.products })
                        dispatch({ type: SET_LOADING, payload: false })
                    } else dispatch({ type: SHOW_MORE_PRODUCTS, payload: res.data.products })
                } else {
                    alert('Failed to load data')
                }
            })
            .catch(err => console.log('Server error', err))
    }





    const onSearchChange = e => {
        setSearchValue(e.target.value)
        const variables = {
            skip: 0,
            searchValue: e.target.value,
            filter
        }
        getProducts(variables)
    }

    if (isLoading) return <Loader />

    return <MainLayout>

        <div>
            <h1 style={{ textAlign: 'center', fontFamily: 'Great Vibes', margin: '20px 0' }}>Let`s Travel Anywhere</h1>
            <div className="card-container">
                <div className='w-100 d-flex mx-3 mb-5 filter-panel '>
                    <ProductFilter
                        className="continent-filter"
                        items={continents}
                        title="Continent Kind"
                        getProducts={getProducts}
                        Component={CheckBoxBlock} />
                    <ProductFilter
                        className="price-filter"
                        items={prices}
                        title="Price Range"
                        getProducts={getProducts}
                        Component={RadioButtonBlock} />
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
                    products && (<ProductPage getProducts={getProducts} renderProps={renderProps} products={products.products} />)
                }
            </div>
        </div>

    </MainLayout>
}