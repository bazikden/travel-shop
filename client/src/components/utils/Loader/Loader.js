import React from 'react'
import './Loader.css'

export const Loader = () =>{
    return(
        <div className="loader">
            <div className="container">
            <span style={{'--i': 1}} />
            <span style={{'--i': 2}} />
            <span style={{'--i': 3}} />
            <span style={{'--i': 4}} />
            <span style={{'--i': 5}} />
            </div>
        </div>
    )
}