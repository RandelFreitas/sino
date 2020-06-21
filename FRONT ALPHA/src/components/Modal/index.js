import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Grid, CardActions, CardContent, CardActionArea, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';

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
    margin: 'auto',
    color: 'white',
    background: '#3f51b5',
    borderRadius: 4,
    fontSize: 15,
    padding: 10,
  },
  linkDesabled:{
    color: 'gray',
    pointerEvents: 'none'
  },
  button: {
    width: '100%',
    marginLeft: 50,
  },
  title: {
    textAlign: 'center',
    padding: 8
  }
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

  const [accept, setAccept] = useState(true);
  const acceptOk = () => {
    setAccept(false);
  };

  const modal =(
    <Grid item>
        <Modal
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
                  <h2 className={classes.title}>Atenção!</h2>
                  <div className={classes.paper}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <p>
                        O cadastro de uma nova clínica acarretará no <br/> aumento de R$ 49,90 em cada mensalidade.
                      </p>
                    </Typography>
                  </div><br/>
                  <FormControlLabel onClick={()=>acceptOk()} control={<Checkbox value="accept" color="primary" />} label="Estou ciente"/>
                </CardContent>
                <CardActions>
                  <Link className={clsx(classes.link, accept && classes.linkDesabled )} to={`${match.url}/clinicSetup`} disabled>
                      ACEITAR
                  </Link>
                </CardActions>
              </CardActionArea>
            </Card>
          </Fade>
        </Modal>
      </Grid>
  )

  return (
    <Grid container>
      <Grid item>
        <Button className={classes.button} onClick={handleOpen} variant="contained" color="primary">
          Adicionar nova Clínica
        </Button>
      </Grid>
        {modal}
    </Grid>
  );
}