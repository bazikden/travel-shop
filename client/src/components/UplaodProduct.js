import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Axios from 'axios';

import {validation} from './utils/validation'
import { MainLayout } from './layouts/MainLayout';
import { FileUpload } from './utils/FileUpload'
import { ADD_PRODUCT } from '../redux/reducers/types';


const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]


export const UploadProduct = () => {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    const [data, setData] = useState({
        title: '',
        description: '',
        price: 0,
        country: 1,
        images:[]
    })
    const [errors, setErrors] = useState({})
    const [invalid, setInvalid] = useState({ title: false, description: false, price: false })

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
        setErrors({})
        setInvalid({})
    }

    const getImages = (images) => {
        setData({ ...data, images })
    }



    const onSubmit = e => {
        e.preventDefault()
        const validationCheck = validation(data,setErrors,setInvalid)


        if(validationCheck){
            console.log('oK')
            const formData = {
                ...data,
                country: Continents.find(f => f.key === Number(data.country)).value,
                writer: user.userData.id 
            }
            
            Axios.post('api/products/uploadProduct', formData)
            .then(res => {
                 if(res.data.success){
                     dispatch({type:ADD_PRODUCT,payload:res.data.product})
                     history.push('/')
                 }
             })
             .catch(err => console.log(err))
            
        } 






    }
    return (
        <MainLayout>
            <Form onSubmit={onSubmit}>
                <FileUpload getImages={getImages} />
                {
                    invalid.images && (
                    <span style={{color:'red'}}>{errors.images}</span>
                    )
                }
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input value={data.title} onChange={onChange} invalid={invalid.title} type="text" name="title" id="title" />
                    <FormFeedback>{errors.title && errors.title}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input onChange={onChange} type="textarea" invalid={invalid.description} name="description" id="description" />
                    <FormFeedback>{errors.description && errors.description}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input onChange={onChange} value={data.price} type="number" name="price" id="price" />
                </FormGroup>

                <FormGroup>
                    <Input onChange={onChange} type="select" name="country" defaultValue={Continents[0].key} >
                        {
                            Continents.map(continent => (
                                <option key={continent.key} value={continent.key}>{continent.value}</option>
                            ))
                        }
                    </Input>
                </FormGroup>

                <Button>Submit</Button>
            </Form>

        </MainLayout>
    )
}