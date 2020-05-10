import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Axios from 'axios'


export const FileUpload = ({ getImages }) => {
    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        const config = {
            haeders: {
                'content-type': 'multipart/form-data'
            }
        }
        const formData = new FormData()
        formData.append('file', files[0])

        Axios.post('api/products/uploadImage', formData, config)
            .then(res => {
                if (res.data.success) {
                    setImages([...Images, res.data.image])
                    getImages([...Images, res.data.image])
                } else {
                    alert('Failed to save image')
                }
            })
            .catch(err => console.log(err))
    }

    const onDelete = image => {
        setImages(Images.filter(f => f !== image))
        getImages(Images.filter(f => f !== image))
        Axios.post(`api/products/deleteImage`,{image})
    }
    return (
        <div className="d-flex justify-content-between">
            <Dropzone  onDrop={onDrop} multiple={false} maxSize={800000000} >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div style={{
                            width: '300px',
                            height: '300px',
                            border: '2px solid grey',
                            display: 'flex',
                            cursor: 'pointer',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} {...getRootProps()}>
                            <input  {...getInputProps()} />
                            <span className='aim' >+</span>
                        </div>
                    </section>
                )}
            </Dropzone>
            <div style={{ display: 'flex', height: '300px', overflowX: "scroll", margin: '0 10px' }}>
                {
                    Images.map(image => (
                        <div  key={image} style={{ height: '190px' }} className='flex-grow-1 w-100 my-auto position-relative'>
                            <div
                                onClick={() => onDelete(image)}
                                style={{ right: '5px', top: '5px', cursor: 'pointer' }}
                                className='position-absolute border border-secondary  rounded-circle px-2'
                            >X</div>
                            <img className='h-100' src={`http://localhost:5000/${image}`} alt='' />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}