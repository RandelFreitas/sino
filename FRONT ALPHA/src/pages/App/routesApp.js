import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import MenuManager from './MenuManager';
import ClinicList from './ClinicList';
import Clinic from './Clinic';

const RoutesApp = () => {
  let match = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${match.url}/menu`} component={MenuManager} />
      <Route path={`${match.url}/clinica`} component={Clinic}/>
      <Route path={`${match.url}/`} component={ClinicList}/>
    </Switch>
  )
}

export default RoutesApp;