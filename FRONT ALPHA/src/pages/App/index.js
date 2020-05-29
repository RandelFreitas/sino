import React from 'react';
import { BrowserRouter, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import MenuManager from './MenuManager';

export default function Sino() {
  let match = useRouteMatch();

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>Menu</li>
            <li>
              <Link to={`${match.url}/dashboard`}>Home</Link>
            </li>
            <li>
              <Link to={`${match.url}/menu`}>Menu</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={`${match.url}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${match.url}/menu`}>
            <MenuManager />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

