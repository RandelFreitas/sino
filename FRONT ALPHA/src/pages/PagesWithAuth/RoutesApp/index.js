import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { ClinicList, ManagerSetup, ClinicSetup } from '../PagesAuthLevel1';
import { Schedule } from '../PagesAuthLevel2';

const RoutesLevel1 = () => {
  let match = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${match.url}/clinics/clinicSetup`} component={ClinicSetup}/>
      <Route path={`${match.url}/clinics/menuSetup`} component={ManagerSetup}/>
      <Route path={`${match.url}/clinics/clinic`} component={Schedule}/>
      <Route path={`${match.url}/clinics`} component={ClinicList}/>
    </Switch>
  )
}

export default RoutesLevel1;