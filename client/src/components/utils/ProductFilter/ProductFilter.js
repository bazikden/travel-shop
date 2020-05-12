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
                <Component items={items} />
            </div>
        </div>

        // <ButtonDropdown className="flex-grow-1 mx-2" isOpen={dropdownOpen} toggle={toggle}>
        //     <DropdownToggle color="light" caret >
        //         <span style={{ width: '98%' }} className="float-left text-left">{title}</span>
        //     </DropdownToggle>
        //     <DropdownMenu onMouseLeave={() => setOpen(false)} style={{ background: 'rgba(255,255,255,.5)' }} className="w-100">
        //         {
        //             items.map(item => (
        //                 <DropdownItem key={item.value + Date.now()}>{item.value}</DropdownItem>
        //             ))
        //         }

        //     </DropdownMenu>
        // </ButtonDropdown>
    )
}
