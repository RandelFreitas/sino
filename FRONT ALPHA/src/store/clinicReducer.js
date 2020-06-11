import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
    LIST: 'CLINIC_LIST',
    AUTH: 'AUTH_CLINIC',
    ADD: 'CLINIC_ADD',
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

export const authClinic = () => {
    return dispatch => {
        history.push('/');
        //console.log("ok");
    }
}

/*export function authClinic(id){
    return dispatch => {
        api.post('/level1/clinics/authenticate', ({"clinicId":id}))
        .then(Response => {
            dispatch({
                type: ACTIONS.AUTH,
                token: Response.data
            });
            history.push('/menu');
        })
    }
}*/