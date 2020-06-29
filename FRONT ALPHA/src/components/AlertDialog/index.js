import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';

const useStyles = {
  textDecoration: 'none',
  color: 'white'
};

const AlertDialog = () => {
  let match = useRouteMatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog =(
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Criar nova clínica"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            O cadastro de uma nova clínica acarretará no aumento de R$ 49,90 em cada mensalidade.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
            <Link style={useStyles} to={`${match.url}/clinicSetup`}>
              Aceitar
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Adicionar nova clínica
      </Button>
      <div>
        {dialog}
      </div>
    </div>
  )
}

export default AlertDialog;