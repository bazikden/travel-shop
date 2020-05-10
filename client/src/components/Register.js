import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { EmptyLayout } from './layouts/EmptyLayout'


export const Register = () => {
    const history = useHistory()

    const [data, setData] = useState({
        name: null,
        email: null,
        password: null
    })

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        password: null,
        database:null
    })

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.post('api/users/register', data)
            .then(res => {
                if (res.data.success) {
                    history.push('/')
                } else {
                    if(res.data.msg === 'Please enter the name' && res.data.msg === 'Please enter email' && res.data.msg === 'Please enter password'){
                        res.data.msg === 'Please enter the name' && setErrors({ ...errors, name: 'Please enter the name' })
                        res.data.msg === 'Please enter email' && setErrors({ ...errors, email: 'Please enter email' })
                        res.data.msg === 'Please enter password' && setErrors({ ...errors, password: 'Please enter password' })
                    }else{
                        res.data.msg && setErrors({...errors,database:res.data.msg}) 
                    }

                }
            })
            .catch(e => console.log(e))
    }
    return <EmptyLayout>
        <Form onSubmit={onSubmit}>
            <h3>
                Register
            </h3>
            {errors.database && (<Alert color="danger">{errors.database}</Alert>)}
            <FormGroup>
                <Label for="name">Name</Label>
                <Input onChange={onChange} type="text" name="name" id="name" placeholder="Enter the name" />
                {errors.name && (<Alert className="mt-1" color="danger">{errors.name}</Alert>)}
            </FormGroup>
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
            <Button type="submit">Register</Button>
        </Form>
    </EmptyLayout>
}