import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_CONTINENT_FILTER } from '../../../../redux/reducers/types'

export const CheckBoxBlock = ({ items }) => {
    const [continents, setContinents] = useState([])
    const dispatch = useDispatch()

    const onChange = value => {
        const currentIndex = continents.indexOf(value)
        const newContinents = [...continents]

        currentIndex === -1 ?
            newContinents.push(value)
            :
            newContinents.splice(currentIndex, 1)
        setContinents(newContinents)
        dispatch({ type: SET_CONTINENT_FILTER, payload: newContinents })
    }
    return (
        <div>
            <ul>
                {
                    items.map(item => (
                        <li key={item.value + Date.now()}>
                            <input
                                onChange={() => onChange(item.value)}
                                type="checkbox"
                                id={"checkbox" + item.key}
                                checked={continents.indexOf(item.value) === -1 ? false : true}
                            />
                            <label className="ml-1 w-75 " htmlFor={"checkbox" + item.key}>{item.value}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}