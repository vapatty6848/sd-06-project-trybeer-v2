import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/login.css';
import beerPremium from '../styles/beerPremium.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const history = useHistory();

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
    const passwordLength = 6;

    if (value.length >= passwordLength) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleClick = async () => {
    const response = await api.fetchLogin(email, password);
    localStorage.setItem('user', JSON.stringify({
      ...response.user,
      token: response.token }));
    if (response.user.role === 'client') {
      history.push('/products');
    } else {
      history.push('/admin/orders');
    }
  };

  return (
    <div className="text-center">
      <form className="form-signin">
        <img className="mb-4" src={ beerPremium } width="170" height="170" alt="Logo" />
        <h1 className="h1 mb-3 font-weight-normal">Login</h1>
        <label htmlFor="email">
          Email
          <input
            className="form-control"
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            className="form-control"
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
          />
        </label>
        <button
          className="btn btn-lg btn-danger btn-block"
          type="button"
          data-testid="signin-btn"
          disabled={ !(isEmailValid && isPasswordValid) }
          onClick={ handleClick }
        >
          Entrar
        </button>
        <br />
        <Link
          to="/register"
          data-testid="no-account-btn"
          className="cadastrar"
        >
          Ainda não tenho conta!
        </Link>
        <p className="mt-5 mb-3 text-muted">© Mar de Minas 2021</p>
      </form>
    </div>
  );
}
