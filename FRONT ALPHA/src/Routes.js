import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";

import Menu from "./pages/PagesWithAuth";
import history from './services/history';

import { isAuthenticated } from "./services/auth";
import { SignUp, SignIn, NotFound, ForgotPassword } from "./pages/PagesWithoutAuth";

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
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/app" component={Menu}/>
        <Redirect to="/not-found" />
    </Switch>
  </Router>
);

export default Routes;