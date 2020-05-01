import axios from 'axios';

const ACTIONS = {
    SIGNIN: 'SIGNIN',
}

const ESTATE_INIT = {
    TOKEN_KEY: ''
}

export const signInReducer = ( state = ESTATE_INIT, action ) => {
    switch(action.type){
        case ACTIONS.SIGNIN:
            return {...state, TOKEN_KEY: action.TOKEN_KEY}
        default:
            return state;
    }
}

export function singIn(e){
    return dispatch => {
        console.log('ok');
        axios.post('https://minhastarefas-api.herokuapp.com/auth/authenticate', e )
        .then(response => {
            dispatch({
                type: ACTIONS.SIGNIN,
                TOKEN_KEY: response.headers.TOKEN_KEY
            })
        })
    }
}