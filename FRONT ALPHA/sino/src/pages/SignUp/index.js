import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = props => {
  const classes = useStyles();
  const { history } = props;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();
    if(!name || !email || !cpf || !phone || !password) {
      setErro("Preencha todos os dados para se cadastrar")
    } else{
      try{
        await api.post("/maneger", { name, email, cpf, phone, password });
        history.push("/");
      }catch (err) {
        console.log(err);
        setErro("Ocorreu um erro ao registrar sua conta!");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item>
              {erro}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                type="text"
                placeholder="Nome"
                onChange={e => setName({ name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="Endereço de e-mail"
                onChange={e => setEmail({ email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cpf"
                label="Cpf"
                name="cpf"
                type="text"
                placeholder="Cpf"
                onChange={e => setCpf({ cpf: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Telefone"
                name="phone"
                type="text"
                placeholder="Telefone"
                onChange={e => setPhone({ phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type="password"
                placeholder="Senha"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordC"
                label="Confirmar senha"
                type="password"
                id="passwordC"
                placeholder="Senha"
                onChange={e => setPassword({ password: e.target.value })}
              />
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                  Cadastrar
              </Button>
              <Grid item>
                <Link to="/" variant="body2">Fazer login</Link>
              </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);