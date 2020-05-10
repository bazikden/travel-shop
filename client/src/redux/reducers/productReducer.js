import { GET_ALL_PRODUCTS, ADD_PRODUCT } from "./types"

const initialState = {}

export const productReducer = (state = initialState,action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,products:action.payload
            }

        case ADD_PRODUCT:
            return {
                ...state,products:[...state.products,action.payload]
            }    

    
        default: return state

    }
}