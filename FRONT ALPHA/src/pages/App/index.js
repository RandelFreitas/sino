import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import MenuManager from './MenuManager';
import RoutesLevel from './RoutesLevel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 345,
    margin: 50,
  },
}));

export default function Sino() {
  const classes = useStyles();
  let match = useRouteMatch();

  return (
    <BrowserRouter>
      <div>
        
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                SINO
              </Typography>
              <Typography>
                <Link to={`${match.url}/`}>Home</Link>
              </Typography>
              <Typography>
                <Link to={`${match.url}/menu`}>Menu</Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <Switch>
          <Route path={`${match.url}/menu`}>
            <MenuManager />
          </Route>
          <Route path={`${match.url}/clinica`}>
            <RoutesLevel />
          </Route>
          <Route path={`${match.url}/`}>
            <Link to={`${match.url}/clinica`}><Dashboard /></Link>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

