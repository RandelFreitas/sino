import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import api from "../../services/api";
import { login } from "../../services/auth";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = props => {
  const classes = useStyles();
  
  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async e => {
    e.preventDefault();
    if(!email || !password){
      setError("Preencha e-mail e senha para continuar!")
    }else {
      try {
        console.log(email);
        const response = await api.post("/auth/authenticate", { email, password });
        login(response.data.token);
        history.push('/app');
      }catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais.")
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
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          {error && <p>{error}</p>}
          <TextField variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus onChange={e => setEmail(e.target.value)} type="email" value={email}/>
          <TextField variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            id="password"
            autoComplete="current-password" onChange={e => setPassword(e.target.value)} type="password" value={password}/>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar"/>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Esqueci minha senha
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);