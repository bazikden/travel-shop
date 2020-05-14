import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { EmptyLayout } from './layouts/EmptyLayout'
import { AUTH, LOGIN } from '../redux/reducers/types'

export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: null,
        password: null
    })

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        database: null
    })

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.post('api/users/login', data)
            .then(res => {
                if (res.data.success) {
                    dispatch({ type: LOGIN, payload: res.data.success })
                    axios.get('api/users/auth')
                        .then(res => {
                            if (res.data.success) {
                                const user = res.data.user
                                dispatch({
                                    type: AUTH, payload: {
                                      name: user.name,
                                      user: user.email,
                                      id:user._id
                                    }
                                  })
                                history.push('/')
                            } else {
                                setErrors({ ...errors, database: res.data.msg })
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    if (res.data.msg === 'Please enter email' && res.data.msg === 'Please enter password') {
                        res.data.msg === 'Please enter email' && setErrors({ ...errors, email: 'Please enter email' })
                        res.data.msg === 'Please enter password' && setErrors({ ...errors, password: 'Please enter password' })
                    } else {
                        res.data.msg && setErrors({ ...errors, database: res.data.msg })
                    }

                }
            })
            .catch(e => console.log(e))
    }
    return <EmptyLayout>
        <Form onSubmit={onSubmit}>
            <h3>
                Login
        </h3>
            {errors.database && (<Alert color="danger">{errors.database}</Alert>)}
            <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={onChange} type="email" name="email" id="email" placeholder="Enter email" />
                {errors.email && (<Alert className="mt-1" color="danger">{errors.email}</Alert>)}
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={onChange} type="password" name="password" id="password" placeholder="Enter password" />
                {errors.password && (<Alert className="mt-1" color="danger">{errors.password}</Alert>)}
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
    </EmptyLayout>
}