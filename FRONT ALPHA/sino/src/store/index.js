import { combineReducers } from 'redux';
import { patientReducer } from './patientReducer';

const mainReducer = combineReducers({
    patient: patientReducer
});

export default mainReducer;