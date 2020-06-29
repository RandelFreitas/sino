import api from '../services/api';
//import history from '../services/history';

const ACTIONS = {
    BYID: 'MANAGER_BY_ID'
}

const ESTADO_INICIAL = {
    manager: [],
}

export const managerReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.BYID:
            return {...state, manager: action.manager}
        default:
            return state;
    }
}

export function byId (id) {
    return dispatch => {
        api.get(`/public/managers/${id}`)
        .then(Response => {
            dispatch({
                type: ACTIONS.BYID,
                manager: Response.data
            })
        })
    }
}