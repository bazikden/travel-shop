import { REGISTER, LOGIN, AUTH, LOGOUT } from "./types"

const initialState = {}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, register: action.payload }

        case LOGIN:
            return { ...state, loginSuccess: action.payload }

        case AUTH: {
            return { ...state, userData: action.payload }
        }

        case LOGOUT:
            return { ...state, loginSuccess: false, userData: null }

        default: return state
    }
}