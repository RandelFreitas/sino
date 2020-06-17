import api from '../services/api';
import history from "../services/history";
import { setTokenLocalStorage } from '../services/auth';

const ACTIONS = {
    LIST: 'CLINIC_LIST',
    AUTH: 'AUTH_CLINIC',
    ADD: 'CLINIC_ADD',
    BYID: 'CLINIC_BY_ID',
    REMOVE: 'CLINIC_REMOVE',
    UPDATE: 'CLINIC_UPDATE',
}

const ESTADO_INICIAL = {
    clinics: [],
    token: ''
}

export const clinicReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, clinics: action.clinics.docs}
        case ACTIONS.AUTH:
            return {...state, token: action.token }
        default:
            return state;
    }
}

export function list(){
    return dispatch => {
        api.get('/level1/clinics')
        .then(Response => {
            dispatch({
                type: ACTIONS.LIST,
                clinics: Response.data,
            })
        })
    }
}

export function authClinic(id){
    return dispatch => {
        api.post('/level1/clinics/authenticate', ({"clinicId":id}))
        .then(Response => {
            dispatch({
                type: ACTIONS.AUTH,
                token: Response.data.token,
            },
                setTokenLocalStorage(Response.data.token), 
                history.push('/app/clinica')
            )
        })
    }
}

/*
export function authClinic(id){
    return dispatch => {
        //history.push('/level1/clinics/aute');
        console.log(id);
    }
}
*/