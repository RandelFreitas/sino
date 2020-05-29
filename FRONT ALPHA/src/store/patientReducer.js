const ACTIONS = {
    LIST: 'PATIENT_LIST',
    ADD: 'PATIENT_ADD',
    DELETE: 'PATIENT_DELETE'
}

const ESTATE_INIT = {
    patient: []
}

export const patientReducer = ( state = ESTATE_INIT, action ) => {
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, patient: action.patient}
        default:
            return state;
    }
}