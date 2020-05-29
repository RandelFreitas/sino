import axios from 'axios';

const http = axios.create({
    baseURL : 'http://localhost:3001/api'
})

const ACTIONS = {
    SIGNIN: 'SIGNIN',
}

const ESTATE_INIT = {
    TOKEN_KEY: '@token'
}

export const signInReducer = ( state = ESTATE_INIT, action ) => {
    switch(action.type){
        case ACTIONS.SIGNIN:
            const TOKEN_KEY = '@token'
            localStorage.setItem(TOKEN_KEY, action.token)
            return {...state}
        default:
            return state;
    }
}

export function signIn( login ){
    return dispatch => {
        http.post('/auth/authenticate', login)
        .then(response => {
            dispatch({
                type: ACTIONS.SIGNIN,
                token: response.data.token
            })
        })
    }
}