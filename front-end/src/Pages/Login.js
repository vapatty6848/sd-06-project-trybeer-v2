import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import loginFetch from '../services/LoginService';

const jwt = require('jsonwebtoken');

export default function Login({ history }) {
  const [valid, setValid] = useState(false);
  const { email, setEmail, setName, password, setPass } = useContext(Context);

  async function decoder() {
    const jsonWebToken = await loginFetch(email, password);
    if (jsonWebToken.message !== 'Email ou senha inválidos') {
      localStorage.setItem('token', jsonWebToken.token);
      const decode = jwt.decode(jsonWebToken.token);
      setName(decode.name);
      return decode;
    }
    return jsonWebToken.message;
  }

  async function handleClick() {
    const decode = await decoder();
    console.log(decode);
    if (decode && decode.role === 'client') {
      setValid(false);
      history.push('/products');
    } else if (decode && decode.role === 'administrator') {
      setValid(false);
      history.push('/admin/orders');
    }
  }

  useEffect(() => {
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password));
  }, [email, password]);

  return (
    <div>
      <h1 className="">Trybeer Sixteen</h1>
      <form className="needs-validation">
        <div className="col-md-5 mb-3">
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              onChange={ ({ target }) => setEmail(target.value) }
              className="form-control"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="col-md-5 mb-3">
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              data-testid="password-input"
              id="password-input"
              onChange={ ({ target }) => setPass(target.value) }
              className="form-control"
              placeholder="Senha"
            />
          </label>
        </div>
        <div className="form-check">
          <button
            disabled={ !valid }
            type="button"
            data-testid="signin-btn"
            onClick={ () => handleClick() }
            className={ !valid ? 'btn btn-light' : 'btn btn-success' }
          >
            ENTRAR
          </button>
        </div>
        <div className="form-check">
          <Link
            to="/register"
            data-testid="no-account-btn"
            className="btn btn-info mt-4"
          >
            Ainda não tenho conta
          </Link>
        </div>
      </form>
    </div>
  );
}

Login.defaultProps = {
  history: '/login',
};

Login.propTypes = {
  history: propTypes.shape(),
};
