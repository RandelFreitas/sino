import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Grid, CardActions, CardContent, CardActionArea, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  button: {
    width: '100%',
    marginLeft: 50,
  },
}));

export default function ModalMessager() {
  const classes = useStyles();
  let match = useRouteMatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item>
        <Button className={classes.button} onClick={handleOpen} variant="contained" color="primary">
          Adicionar nova Clínica
        </Button>
      </Grid>
      <Grid item>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>

          <Fade in={open}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Atenção!</h2>
                    <Typography gutterBottom variant="h5" component="h2">
                      <p>
                        O cadastro de uma nova clínica acarretará no <br/> aumento de R$ 49,90 em cada mensalidade.
                      </p>
                    </Typography>
                  </div><br/>
                  <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Estou ciente"/>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary">
                    <Link className={classes.link} to={`${match.url}/clinicSetup`}>Aceitar</Link>
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
}