import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import RoutesApp from './routesApp';

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
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to={`${match.url}`}>SINO</Link>
            </Typography>
            <Typography>
              <Link to={`${match.url}/menu`}>Configurações</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div>
        <RoutesApp />
      </div>
    </div>
  );
};