import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
    LIST: 'PATIENT_LIST',
    ADD: 'PATIENT_ADD',
    BYID: 'PATIENT_BY_ID',
    REMOVE: 'PATIENT_REMOVE',
    UPDATA: 'PATIENT_UPDATE',
}

const ESTADO_INICIAL = {
    patients: [],
    patientById: [],
}

export const patientReducer = (state = ESTADO_INICIAL, action) => {
    const list = [...state.patients, action.patient];
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, patients: action.patients.doc}
        case ACTIONS.ADD:
            return {...state, patients: list}
        case ACTIONS.BYID:
            return {...state, patientById: action.patientById}
        default:
            return state;
    }
}

export function list(){
    return dispatch => {
        api.get('/level2/patients')
        .then(Response => {
            dispatch({
                type: ACTIONS.LIST,
                patients: Response.data,
            })
        })
    }
}