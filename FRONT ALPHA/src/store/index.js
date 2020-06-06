import { combineReducers } from 'redux';
import { clinicReducer } from './clinicReducer';
import { dentistReducer } from './dentistReducer';
import { financesReducer } from './financesReducer';
import { managerReducer } from './managerReducer';
import { patientReducer } from './patientReducer';
import { scheduleReduce } from './scheduleReduce';
import { secrataryReducer } from './secrataryReducer';

const mainReducer = combineReducers({
    clinic: clinicReducer,
    dentist: dentistReducer,
    finances: financesReducer,
    manager: managerReducer,
    patient: patientReducer,
    schedule: scheduleReduce,
    secretary: secrataryReducer
});

export default mainReducer;