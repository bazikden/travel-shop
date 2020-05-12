import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_PRICE_FILTER } from '../../../../redux/reducers/types'

export const RadioButtonBlock = ({ items }) => {
    const [checked, setChecked] = useState(0)
    const dispatch = useDispatch()
    const onChange = (e, index) => {

        if (e.target.value === "Any") {
            dispatch({ type: SET_PRICE_FILTER, payload: [] })
        } else {
            const range = e.target.value.split(' ').filter(f => f.charAt(0) === "$").map(elem => elem.slice(1))
            dispatch({ type: SET_PRICE_FILTER, payload: range })
        }
        setChecked(index)
    }

    return (
        <div>
            <ul>
                {
                    items.map((item, index) => (
                        <li className="d-flex" key={item.value + Date.now()}>
                            <input
                                value={item.value}
                                onChange={(e) => onChange(e, index)}
                                type="radio"
                                id={item.key + "radio"}
                                name="price"
                                checked={checked === (item.key - 1) ? true : false}
                            />
                            <label className="ml-1 flex-grow-1" htmlFor={item.key + "radio"}>{item.value}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
