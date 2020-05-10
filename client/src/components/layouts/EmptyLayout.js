import React, { useEffect } from 'react'

export const EmptyLayout = ({ children }) => {
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.formbox').classList.add('showed')
        }, 500)
    }, [])
    return (
        <div className='emptylayout'>
            <div className="formbox">
                {children}
            </div>
        </div>
    )
}