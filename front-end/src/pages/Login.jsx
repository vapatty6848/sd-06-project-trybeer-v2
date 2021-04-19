import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { verifyEmailAndPassword, handleSubmit } from '../services';
import logo from '../img/trybe.png';
import '../css/Login.css';

function Login() {
  const [activeBtn, setActiveBtn] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const history = useHistory();

  useEffect(() => {
    const { email, password } = user;
    verifyEmailAndPassword(email, password, setActiveBtn);
  }, [user]);

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ logo } alt="logo" className="logo" />
        <div className="form-container">
          <h3 className="login-title">PROJECT - TRYBEER</h3>
          <span>Email</span>
          <input
            type="email"
            data-testid="email-input"
            className="input-form-login"
            onChange={ ({ target }) => setUser({ ...user, email: target.value }) }
          />
          <span>Senha</span>
          <input
            type="password"
            data-testid="password-input"
            className="input-form-login"
            onChange={ ({ target }) => setUser({ ...user, password: target.value }) }
          />
          <button
            type="submit"
            disabled={ !activeBtn }
            onClick={ () => handleSubmit(history, user) }
            data-testid="signin-btn"
            className="button-form-login"
          >
            Entrar
          </button>
          <Link to="/register">
            <button type="button" data-testid="no-account-btn" className="link-button">
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
