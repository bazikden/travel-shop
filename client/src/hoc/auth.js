import React from 'react'
import { useSelector } from 'react-redux'
import { Login } from '../components/Login'


export const Auth = (Component) => {

    function AuthCheck(props) {

        const user = useSelector(state => state.user)


            if(!user.loginSuccess|| user.loginSuccess === false) return <Login />
        return <Component {...props} />

    }


    return AuthCheck
} 