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

export function signIn(){
    return dispatch => {
        console.log('ok')
    }
}