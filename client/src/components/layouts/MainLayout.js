import React from 'react'


export const MainLayout = ({children}) => {
    return(
        <div className="container pt-3" style={{marginTop:'56px'}}>
            {children}
        </div>
    )
}