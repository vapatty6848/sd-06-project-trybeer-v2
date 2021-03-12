import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import loginFetch from '../services/LoginService';

export default function Login({ history }) {
  const [valid, setValid] = useState(false);
  const { email, setEmail } = useContext(Context);
  const [password, setPass] = useState('');

  async function handleClick(type) {
    const token = await loginFetch(email, password);
    console.log(token);
    if (type === 'client') {
      history.push('/products');
      localStorage.setItem('user', JSON.stringify({ email }));
    }
    if (type === 'register') history.push('/register');
    setValid(false);
  }

  useEffect(() => {
    const seven = /.{7,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password));
  }, [email, password]);

  return (
    <div className="">
      <h1 className="">Trybeer Sixteen</h1>
      <input
        type="email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        value={ email }
        className="form-control"
        placeholder="Email"
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPass(target.value) }
        value={ password }
        className="form-control"
        placeholder="Password"
      />
      <button
        disabled={ !valid }
        type="submit"
        data-testid="signin-btn"
        onClick={ () => handleClick('client') }
        className="btn btn-warning text-dark"
      >
        Entrar
      </button>
      <button
        type="button"
        data-testid="no-account-btn"
        onClick={ () => handleClick('register') }
        className=""
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

Login.defaultProps = {
  history: '/login',
};
Login.propTypes = {
  history: propTypes.shape(),
};
