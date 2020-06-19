import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ManagerSetup from './ManagerSetup';
import ClinicList from './ClinicList';
import Clinic from './Clinic';
import ClinicSetup from './ClinicSetup';

const RoutesApp = () => {
  let match = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${match.url}/clinicSetup`} component={ClinicSetup}/>
      <Route path={`${match.url}/menuSetup`} component={ManagerSetup}/>
      <Route path={`${match.url}/clinic`} component={Clinic}/>
      <Route path={`${match.url}/`} component={ClinicList}/>
    </Switch>
  )
}

export default RoutesApp;