import { combineReducers } from 'redux';
import { patientReducer } from './patientReducer';
import { signInReducer } from './signInReducer';

const mainReducer = combineReducers({
    patient: patientReducer,
    signIn: signInReducer
});

export default mainReducer;