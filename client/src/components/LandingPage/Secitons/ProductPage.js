import React, { useState, useEffect } from 'react'
import { Card } from '../../utils/Card/Card.js'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../../utils/Loader/Loader.js'
import { SET_LOADING } from '../../../redux/reducers/types.js'


export const ProductPage = ({ getProducts, renderProps }) => {
    const [loadTimes, setloadTimes] = useState(1)
    const { products, productsCount, isLoading } = useSelector(state => state.products)
    const { skip, limit, filter } = renderProps
    const dispatch = useDispatch()
    const variables = {
        skip: renderProps.skip,
        limit: renderProps.limit,
        filter: renderProps.filter
    }

    useEffect(()=>{
        return () => console.log('unmount')
    },[])

    useEffect(() => {
        // dispatch({type:SET_LOADING,payload:true})
        getProducts(variables)

    }, [variables])


    const onLoadMore = () => {
        const variables = {
            skip: loadTimes * skip + limit,
            limit,
            filter
        }

        getProducts(variables)
        setloadTimes(loadTimes + 1)
    }
    if (isLoading) return <Loader />
    return (
        <div className="d-flex flex-wrap justify-content-center w-100">
            {
                products.map(product => (
                    <Card key={product._id} product={product} />
                ))
            }

            {
                products.length !== productsCount && (<div style={{ flexBasis: '100%' }}>
                    <button onClick={onLoadMore} className="d-block mx-auto mb-3">Load More</button>
                </div>)
            }
        </div>
    )
}
