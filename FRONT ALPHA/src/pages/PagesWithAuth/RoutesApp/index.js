import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { ClinicList, ManagerSetup, ClinicSetup } from '../PagesAuthLevel1';
import Clinic from '../PagesAuthLevel2';

const RoutesLevel1 = () => {
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

export default RoutesLevel1;