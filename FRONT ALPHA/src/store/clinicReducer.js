import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
    LIST: 'CLINIC_LIST',
    ADD: 'CLINIC_ADD',
    BYID: 'CLINIC_BY_ID',
    CLEAN: 'CLINIC_BY_ID_CLEAN',
    REMOVE: 'CLINIC_REMOVE',
    UPDATE: 'CLINIC_UPDATE',
}

const ESTADO_INICIAL = {
    clinics: [],
    clinicById: [],
    infos: [],
    loading: false,
}

export const clinicReducer = (state = ESTADO_INICIAL, action) => {
    const list = [...state.clinics, action.clinic];
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, clinics: action.clinics, infos: action.infos}
        case ACTIONS.BYID:
            return {...state, clinicById: action.clinicById, loading: action.loading}
        case ACTIONS.ADD:
            return {...state, clinics: list}
        case ACTIONS.UPDATE:
            return state;
        case ACTIONS.CLEAN:
            return {...state, clinicById: []}
        default:
            return state;
    }
}

export function list(page, nOfItems){
    return dispatch => {
        api.get(`/level1/clinics?page=${page}&limit=${nOfItems}`)
        .then(Response => {
            const { docs, ...infos } = Response.data;
            dispatch({
                type: ACTIONS.LIST,
                clinics: docs,
                infos: infos,
            })
        }, history.push(`/app/clinics?page=${page}&limit=${nOfItems}`))
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
            })
        }, history.push('/app'))
    }
}

export function updateClinic(clinic, id){
    return dispatch => {
        api.put(`/level1/clinics/${id}`, clinic)
        .then(Response => {
            dispatch({
                type: ACTIONS.UPDATE,
                //clinic: Response.data
            })
        }, history.push('/app'))
    }
}

export function cleanClinic(){
    return {
        type: ACTIONS.CLEAN,
    }
}