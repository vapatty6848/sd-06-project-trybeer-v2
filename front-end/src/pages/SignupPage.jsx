import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import BeersAppContext from '../context/BeersAppContext';
import fetchApiJsonBody from '../service/fetchApi';
import funcValidations from '../service/funcValidations';

import '../style/LoginRegister.css';

const logo = require('../images/logo.png');

function SignupPage() {
  const history = useHistory();
  const {
    setUser,
    // user,
  } = useContext(BeersAppContext);

  // if (user.token) history.push('/products');

  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(true);
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [errMessage, setErrMessage] = useState('');
  const handleCheck = () => setChecked(!checked);

  useEffect(() => {
    if (checked) {
      setInputValues({ ...inputValues, role: 'administrator' });
    } else {
      setInputValues({ ...inputValues, role: 'client' });
    }
  }, [checked]);

  const isValid = () => {
    const email = funcValidations.validateEmail(inputValues.email);
    const password = funcValidations.validatePassword(inputValues.password);
    const name = funcValidations.validateName(inputValues.name);
    if (email && name && password) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => isValid(),
    [inputValues.name, inputValues.password, inputValues.email]);

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    const returnSignup = await fetchApiJsonBody('/register', inputValues);
    if (returnSignup.err) {
      setErrMessage(returnSignup.err);
      return;
    }
    setUser(returnSignup);
    if (returnSignup.role === 'administrator') {
      history.push('/admin/orders');
    } else if (returnSignup.role === 'client') {
      history.push('/products');
    }
  };

  return (
    <div className="login-register">
      <img src={ logo } className="img-logo-login" alt="logo" />
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            value={ inputValues.name }
            data-testid="signup-name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={ inputValues.email }
            data-testid="signup-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            value={ inputValues.password }
            data-testid="signup-password"
            onChange={ handleChange }
          />
        </label>
        <div className="checkbox">
          <label htmlFor="vender">
            Quero vender
            <input
              type="checkbox"
              data-testid="signup-seller"
              defaultChecked={ checked }
              onChange={ handleCheck }
            />
          </label>
        </div>
        <span>{errMessage}</span>
        <button
          id="sign-up"
          type="button"
          data-testid="signup-btn"
          disabled={ valid }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
