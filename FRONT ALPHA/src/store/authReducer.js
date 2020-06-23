import api from '../services/api';
import history from '../services/history';
import { setTokenLocalStorage } from '../services/auth';

const ACTIONS = {
    AUTH1: 'AUTH_LEVEL1',
    AUTH2: 'AUTH_LEVEL2',
}

const ESTADO_INICIAL = {
    manager: [],
    token: '',
}

export const authReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.AUTH1:
            return {...state, manager: action.manager}
        case ACTIONS.AUTH2:
            return {...state, token: action.token}
        default:
            return state;
    }
}

export function auth1(login){
    return dispatch => {
        api.post('/auth/authenticate', login)
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

export function auth2(id){
    return dispatch => {
        api.post('/level1/clinics/authenticate', ({"clinicId":id}))
        .then(Response => {
            dispatch({
                type: ACTIONS.AUTH2,
                token: Response.data.token,
            },
                setTokenLocalStorage(Response.data.token), 
                history.push('/app/clinic')
            )
        })
    }
}