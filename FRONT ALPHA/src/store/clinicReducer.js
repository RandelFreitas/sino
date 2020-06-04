import api from '../services/api';

const ACTIONS = {
    LIST: 'CLINIC_LIST',
    ADD: 'CLINIC_ADD',
    REMOVE: 'CLINIC_REMOVE',
    UPDATE: 'CLINIC_UPDATE',
}

const ESTADO_INICIAL = {
    clinics: []
}

export const clinicReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, clinics: action.clinics}
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
                clinics: Response.data
            })
        })
    }
}