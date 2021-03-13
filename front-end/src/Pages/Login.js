import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import loginFetch from '../services/LoginService';

export default function Login({ history }) {
  const [valid, setValid] = useState(false);
  const { email, setEmail } = useContext(Context);
  const [password, setPass] = useState('');

  async function handleClick() {
    const { jsonWebToken, decode } = await loginFetch(email, password);
    console.log(decode);
    if (decode.role === 'client') {
      history.push('/products');
      localStorage.setItem('token', JSON.stringify(jsonWebToken.token));
    } else if (decode.role === 'administrator') history.push('/admin/orders');
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
