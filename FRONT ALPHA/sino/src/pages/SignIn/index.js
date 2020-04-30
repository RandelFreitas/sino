import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from "../../services/api";
import { login } from "../../services/auth";

const SignIn = props => {
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
        const response = await api.post("/auth/authenticate", { email, password });
        login(response.data.token);
        history.push('/app');
      }catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais. T.T")
      }
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      {error && <p>{error}</p>}
      <input onChange={e => setEmail(e.target.value)} type="email" value={email}/>
      <input onChange={e => setPassword(e.target.value)} type="password" value={password}/>
      <button type="submit">Entrar</button>
    </form>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);