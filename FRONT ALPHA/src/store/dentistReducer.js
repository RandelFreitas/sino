import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
    LIST: 'DENTIST_LIST',
    ADD: 'DENTIST_ADD',
    BYID: 'DENTIST_BY_ID',
    REMOVE: 'DENTIST_REMOVE',
    UPDATA: 'DENTIST_UPDATE',
}

const ESTADO_INICIAL = {
    dentists: [],
    dentistById: [],
}

export const dentistReducer = (state = ESTADO_INICIAL, action) => {
    const list = [...state.dentists, action.dentist];
    switch(action.type){
        case ACTIONS.LIST:
            return {...state, dentists: action.dentists.doc}
        case ACTIONS.ADD:
            return {...state, dentists: list}
        case ACTIONS.BYID:
            return {...state, dentistById: action.dentistById}
        default:
            return state;
    }
}

export function list(){
    return dispatch => {
        api.get('/level2/dentists')
        .then(Response => {
            dispatch({
                type: ACTIONS.LIST,
                dentists: Response.data,
            })
        })
    }
}