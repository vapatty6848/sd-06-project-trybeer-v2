import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BeersAppContext from '../context/BeersAppContext';
import fetchApiJsonBody from '../service/fetchApi';
import funcValidations from '../service/funcValidations';

import '../style/LoginRegister.css';

const logo = require('../images/logo.png');

function LoginPage() {
  const history = useHistory();
  const {
    setUser,
    // user,
  } = useContext(BeersAppContext);

  // if (user.token) history.push('/products');

  const [valid, setValid] = useState(true);
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState('');

  const isValid = async () => {
    const email = funcValidations.validateEmail(inputValues.email);
    const password = funcValidations.validatePassword(inputValues.password);
    if (password && email) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputValues.password, inputValues.emai]);

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    const returnLogin = await fetchApiJsonBody('/login', inputValues);
    if (returnLogin.err) {
      setErrMessage(returnLogin.err);
      return;
    }
    setUser(returnLogin);
    if (returnLogin.role === 'administrator') {
      history.push('/admin/orders');
    } else if (returnLogin.role === 'client') {
      history.push('/products');
    }
  };

  const redirect = () => history.push('/register');

  return (
    <div className="login-register">
      <img src={ logo } className="img-logo-login" alt="logo" />
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="pass">
          Senha
          <br />
          <input
            type="password"
            id="pass"
            name="password"
            value={ inputValues.password }
            onChange={ handleChange }
            data-testid="password-input"
          />
        </label>
        <span>{ errMessage }</span>
        <button
          data-testid="signin-btn"
          id="enter"
          type="button"
          disabled={ valid }
          onClick={ handleClick }
        >
          Entrar
        </button>
        <button
          data-testid="no-account-btn"
          id="sign-up"
          type="button"
          onClick={ redirect }
          className="bttn-text"
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
