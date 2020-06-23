import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { managerReducer } from './managerReducer';
import { clinicReducer } from './clinicReducer';
import { dentistReducer } from './dentistReducer';
import { financesReducer } from './financesReducer';
import { patientReducer } from './patientReducer';
import { schedulingReduce } from './schedulingReduce';
import { secrataryReducer } from './secrataryReducer';

const mainReducer = combineReducers({
    auth: authReducer,
    manager: managerReducer,
    clinic: clinicReducer,
    dentist: dentistReducer,
    finances: financesReducer,
    patient: patientReducer,
    scheduling: schedulingReduce,
    secretary: secrataryReducer
});

export default mainReducer;