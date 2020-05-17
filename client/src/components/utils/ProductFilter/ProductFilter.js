import React from 'react'
import './ProductFilter.css'


export const ProductFilter = ({ items, title, Component }) => {

    const toggle = (e) => {

        e.currentTarget.nextSibling.classList.contains('product-filter-opened')
            ?
            e.currentTarget.nextSibling.classList.remove('product-filter-opened')
            :
            e.currentTarget.nextSibling.classList.add('product-filter-opened')
    }

    const onMouseLeave = () => {
        document.querySelector('.product-filter-opened') &&
            document.querySelector('.product-filter-opened').classList.remove('product-filter-opened')
    }


    return (
        <div onMouseLeave={onMouseLeave} className="dropdown">
            <div onClick={toggle} className="dropdown-header">{title} <span>&#129171;</span></div>
            <div className="dropdown-body">
                <Component  items={items} />
            </div>
        </div>
    )
}
