export const validation =  (data,setErrors,setInvalid) => {
    const findedErrors = {}
    const invalidFields = {}

    if (data.title === '') {
        findedErrors.title ='Enter the name' 
        invalidFields.title = true 
    } else if (data.title.length < 6) {
        findedErrors.title = 'Must be min  6 symbols' 
        invalidFields.title = true
    }else{
        delete findedErrors.title 
        invalidFields.title = false

    }

    if (data.description === '') {
        findedErrors.description ='Enter the description' 
        invalidFields.description = true 
    } else {
        delete findedErrors.description 
        invalidFields.description = false

    }

    if (data.images.length === 0) {
        findedErrors.images ='Choose the picture' 
        invalidFields.images = true
    } else {
        delete findedErrors.images  
        invalidFields.images = false

    }
    
    setErrors({...findedErrors})
    setInvalid({...invalidFields})
    
    if(Object.keys(findedErrors).length === 0) return true
    return false
}