import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import { SignUp, SignIn } from "./pages";
import Sino from "./pages/App";

import history from './services/history';
//import RoutesLevel from "./pages/App/RoutesLevel";
//import { RouteWithLayout } from "./components";



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Router history={history}>
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute path="/app" component={Sino}/>
    </Switch>
  </Router>
);

export default Routes;