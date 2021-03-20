import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { ApiService } from '../services';

function Register({ history }) {
  const { email, setEmail, name, setName,
    role, setRole, handleClick, password, setPassword } = useContext(Context);
  const [valid, setValid] = useState(false);
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
    const twelve = /[^()[\]{}*&^%$#@!0-9]+.{11,30}[a-zA-Z]$/;
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password) && twelve.test(name));
  }, [email, password, name]);

  return (
    <form className="needs-validation">
      <div className="col-md-5 mb-3">
        <label htmlFor="signup-name">
          Nome
          <input
            type="text"
            data-testid="signup-name"
            id="signup-name"
            onChange={ ({ target }) => setName(target.value) }
            className="form-control"
            placeholder="Digite um nome"
          />
          <small id="signup-name" className="form-text text-muted">
            O nome deve ter no mínimo 12 caracteres.
          </small>
        </label>
      </div>
      <div className="col-md-5 mb-3">
        <label htmlFor="signup-email">
          Email
          <input
            type="email"
            data-testid="signup-email"
            id="signup-email"
            onChange={ ({ target }) => setEmail(target.value) }
            className="form-control"
            placeholder="Digite um email"
          />
          <small id="signup-email" className="form-text text-muted">
            O email não deve conter caracteres especiais.
          </small>
        </label>
      </div>
      <div className="col-md-5 mb-3">
        <label htmlFor="signup-password">
          Senha
          <input
            type="password"
            data-testid="signup-password"
            id="signup-password"
            onChange={ ({ target }) => setPassword(target.value) }
            className="form-control"
            placeholder="Digite uma senha"
          />
          <small id="signup-password" className="form-text text-muted">
            A senha deve ter no mínimo 6 caracteres.
          </small>
        </label>
      </div>
      <div className="form-group form-check ml-4 mb-5">
        <label htmlFor="signup-seller" className="form-check-label">
          <input
            type="checkbox"
            data-testid="signup-seller"
            id="signup-seller"
            checked={ !isChecked }
            onChange={ ({ target }) => handleRole(target.checked) }
            className="form-check-input"
          />
          Quero vender
        </label>
      </div>
      <div className="form-check">
        <button
          disabled={ !valid }
          type="button"
          data-testid="signup-btn"
          onClick={ () => handlePage() }
          className={ !valid ? 'btn btn-light' : 'btn btn-success' }
        >
          Cadastrar
        </button>
      </div>
      {msg === emailExistMsg ? <span>{msg}</span> : null}
    </form>
  );
}

Register.defaultProps = {
  history: '/register',
};

Register.propTypes = {
  history: propTypes.shape(),
};

export default Register;
