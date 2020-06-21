import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
    LIST: 'CLINIC_LIST',
    ADD: 'CLINIC_ADD',
    BYID: 'CLINIC_BY_ID',
    REMOVE: 'CLINIC_REMOVE',
    UPDATE: 'CLINIC_UPDATE',
}

const ESTADO_INICIAL = {
    clinics: [],
    clinicById: [],
    loading: false,
}

export const clinicReducer = (state = ESTADO_INICIAL, action) => {
    const list = [...state.clinics, action.clinic];
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, clinics: action.clinics.docs}
        case ACTIONS.BYID:
            return {...state, clinicById: action.clinicById, loading: action.loading}
        case ACTIONS.ADD:
            return {...state, clinics: list}
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

export function getClinicById(id){
    return dispatch => {
        api.get(`/level1/clinics/${id}`)
        .then(Response => {
            dispatch({
                type: ACTIONS.BYID,
                clinicById: Response.data,
                loading: true,
            })
        })
    }
}

export function addClinic(clinic){
    return dispatch => {
        api.post(`/level1/clinics`, clinic)
        .then(Response => {
            dispatch({
                type: ACTIONS.ADD,
                clinic: Response.data
            }, console.log(Response.data))
        })
    }
}
