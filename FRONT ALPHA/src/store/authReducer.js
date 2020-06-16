import api from '../services/api';
import history from '../services/history';
import { setTokenLocalStorage } from '../services/auth';

const ACTIONS = {
    AUTH1: 'AUTH_LEVEL1',
}

const ESTADO_INICIAL = {
    manager: [],
}

export const authReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.AUTH1:
            return {...state, manager: action.manager}
        default:
            return state;
    }
}

export function auth1(login){
    const email = login.email;
    const password = login.password;
    return dispatch => {
        api.post('/auth/authenticate', {email, password})
        .then(Response => {
            dispatch({
                    type: ACTIONS.AUTH1,
                    manager: Response.data.token,
               },
                setTokenLocalStorage(Response.data.token), 
                history.push('/app')
            );
        });
    }
}