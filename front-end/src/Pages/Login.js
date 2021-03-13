import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import loginFetch from '../services/LoginService';

const jwt = require('jsonwebtoken');

export default function Login({ history }) {
  const [valid, setValid] = useState(false);
  const { email, setEmail } = useContext(Context);
  const [password, setPass] = useState('');

  async function decoder() {
    const jsonWebToken = await loginFetch(email, password);
    if (jsonWebToken.message !== 'Email ou senha inválidos') {
      localStorage.setItem('token', JSON.stringify(jsonWebToken.token));
      const decode = jwt.decode(jsonWebToken.token);
      return decode;
    }
    return jsonWebToken.message;
  }

  async function handleClick() {
    const decode = await decoder();
    if (decode && decode.role === 'client') {
      history.push('/products');
    } else if (decode && decode.role === 'administrator') {
      history.push('/admin/orders');
    } else {
      // eslint-disable-next-line no-alert
      return window.alert(decode);
    }
    setValid(false);
  }

  useEffect(() => {
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password));
  }, [email, password]);

  return (
    <div className="">
      <h1 className="">Trybeer Sixteen</h1>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
          className="form-control"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPass(target.value) }
          className="form-control"
          placeholder="Password"
        />
      </label>
      <button
        disabled={ !valid }
        type="submit"
        data-testid="signin-btn"
        onClick={ () => handleClick() }
        className="btn btn-warning text-dark"
      >
        ENTRAR
      </button>
      <Link to="/register" data-testid="no-account-btn">Ainda não tenho conta</Link>
    </div>
  );
}

Login.defaultProps = {
  history: '/login',
};
Login.propTypes = {
  history: propTypes.shape(),
};
