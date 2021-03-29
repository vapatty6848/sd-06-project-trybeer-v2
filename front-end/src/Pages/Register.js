import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { ApiService } from '../services';

import '../Register.css';

function Register({ history }) {
  const { email, setEmail, name, setName, valid, setValid,
    role, setRole, handleClick, password, setPassword } = useContext(Context);
  const [isChecked, setIsChecked] = useState(true);
  const [msg, setMsg] = useState('');
  const emailExistMsg = 'E-mail already in database.';

  async function handleRole(value) {
    if (value === false) {
      setIsChecked(true);
      setRole('client');
    } else if (value === true) {
      setIsChecked(false);
      setRole('administrator');
    }
  }

  async function handlePage() {
    const newUser = await ApiService.register(name, email, password, role);
    setMsg(newUser.message);
    if (newUser.message !== emailExistMsg && role === 'client') {
      await handleClick(history);
    } else if (newUser.message !== emailExistMsg && role === 'administrator') {
      await handleClick(history);
    } else {
      console.log(newUser);
    }
  }

  useEffect(() => {
    setValid(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const twelve = /[^()[\]{}*&^%$#@!0-9]+.{11,30}[a-zA-Z]$/;
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password) && twelve.test(name));
    // eslint-disable-next-line
  }, [email, password, name]);

  return (
    <div className="register-container">
      <form className="register-form">
        <div className="register-inputs">
          <label htmlFor="signup-name">
            Nome
            <input
              type="text"
              data-testid="signup-name"
              id="signup-name"
              onChange={ ({ target }) => setName(target.value) }
              className="register-name"
              placeholder="Digite um nome"
            />
            <small id="signup-name" className="register-description">
              Deve conter no mínimo 12 caracteres.
            </small>
          </label>
          <label htmlFor="signup-email">
            Email
            <input
              type="email"
              data-testid="signup-email"
              id="signup-email"
              onChange={ ({ target }) => setEmail(target.value) }
              className="register-email"
              placeholder="Digite um email"
            />
            <small id="signup-email" className="register-description">
              Não deve conter caracteres especiais.
            </small>
          </label>
          <label htmlFor="signup-password">
            Senha
            <input
              type="password"
              data-testid="signup-password"
              id="signup-password"
              onChange={ ({ target }) => setPassword(target.value) }
              className="register-pass"
              placeholder="Digite uma senha"
            />
            <small id="signup-password" className="register-description">
              Deve conter no mínimo 6 caracteres.
            </small>
          </label>
        </div>
      </form>
      <section className="register-section-btns">
        <div className="register-check-container">
          <label htmlFor="signup-seller" className="register-check-label">
            <input
              type="checkbox"
              data-testid="signup-seller"
              id="signup-seller"
              checked={ !isChecked }
              onChange={ ({ target }) => handleRole(target.checked) }
            />
            Quero vender
          </label>
        </div>
        <div className="register-button-container">
          <button
            disabled={ !valid }
            type="button"
            data-testid="signup-btn"
            onClick={ () => handlePage() }
            className="register-button"
          >
            Cadastrar
          </button>
        </div>
        {msg === emailExistMsg ? <span className="register-span">{msg}</span> : null}
      </section>
    </div>
  );
}

Register.defaultProps = {
  history: '/register',
};

Register.propTypes = {
  history: propTypes.shape(),
};

export default Register;
