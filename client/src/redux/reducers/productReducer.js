import { GET_ALL_PRODUCTS, ADD_PRODUCT, SHOW_MORE_PRODUCTS, SET_CONTINENT_FILTER, SET_PRICE_FILTER } from "./types"

const initialState = {
    products:[],
    filteredProducts:null,
    continents:[
        { key: 1, value: "Africa" },
        { key: 2, value: "Europe" },
        { key: 3, value: "Asia" },
        { key: 4, value: "North America" },
        { key: 5, value: "South America" },
        { key: 6, value: "Australia" },
        { key: 7, value: "Antarctica" }
    ],
    prices:[
        {key:1 , value:"Any"},
        {key:2 , value:"$0 to $199"},
        {key:3 , value:"$200 to $399"},
        {key:4 , value:"$400 to $600"},
        {key:5 , value:"$600 to $1000"},
        {key:6 , value:"more than $1000"},
    ],
    renderProps:{
        skip:0,
        limit:6,
        filter:{
            continent:[],
            price:[]
        }
    }
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state, products: action.payload
            }

        case ADD_PRODUCT:
            return {
                ...state, products: [...state.products, action.payload]
            }

        case SHOW_MORE_PRODUCTS:
            return {
                ...state,
                products:[...state.products,...action.payload]
            }    
        
        case SET_CONTINENT_FILTER:
            return {
                ...state,
                renderProps:{...state.renderProps,filter:{...state.renderProps.filter,continent:action.payload}}
            }
            
        case SET_PRICE_FILTER:
            return {
                ...state,
                renderProps:{...state.renderProps,filter:{...state.renderProps.filter,price:action.payload}}
            }    

        default: return state

    }
}