import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'


export const Auth = (Component) => {

    function AuthCheck(props) {
        const history = useHistory()

        const user = useSelector(state => state.user)
        useEffect(() => {
            user.loginSuccess === false && history.push('/login')
        }, [user, history])

        return <Component {...props} />

    }


    return AuthCheck
} 