import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';

export default function Login({ history }) {
  const { email, setEmail, password, setPassword,
    handleClick, valid, setValid } = useContext(Context);

  useEffect(() => {
    setValid(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password));
    // eslint-disable-next-line
  }, [email, password]);

  return (
    <div>
      <h1 className="">Trybeer Sixteen</h1>
      <form>
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
              onChange={ ({ target }) => setPassword(target.value) }
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
            onClick={ () => handleClick(history) }
            className={ !valid ? 'btn btn-light' : 'btn btn-success' }
          >
            Entrar
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
