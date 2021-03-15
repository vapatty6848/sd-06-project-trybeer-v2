import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';

function Register({ history }) {
  const { email, setEmail, name, setName, setRole } = useContext(Context);
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  async function handleRole(value) {
    if (value === false) setRole('client');
    if (value === true) setRole('administrator');
  }

  useEffect(() => {
    setCheckbox(false);
  }, []);

  useEffect(() => {
    const twelve = /^[a-zA-Z]{12}/; // precisa de um regex aqui
    const seven = /.{6,}/;
    const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    setValid(reg.test(email) && seven.test(password) && twelve.test(name));
  }, [email, password, name]);

  return (
    <div>
      <label htmlFor="signup-name">
        Nome
        <input
          type="text"
          data-testid="signup-name"
          onChange={ ({ target }) => setName(target.value) }
          className="form-control"
          placeholder="Digite um nome de 12 ou mais caracteres"
        />
      </label>
      <label htmlFor="signup-email">
        Email
        <input
          type="email"
          data-testid="signup-email"
          onChange={ ({ target }) => setEmail(target.value) }
          className="form-control"
          placeholder="Digite um email"
        />
      </label>
      <label htmlFor="signup-password">
        Senha
        <input
          type="password"
          data-testid="signup-password"
          onChange={ ({ target }) => setPassword(target.value) }
          className="form-control"
          placeholder="Digite uma senha"
        />
      </label>
      <label htmlFor="signup-seller">
        Quero vender
        <input
          type="checkbox"
          data-testid="signup-seller"
          value={ checkbox }
          onClick={ ({ target }) => handleRole(target.value) }
          className="form-control"
        />
      </label>
      <button
        disabled={ !valid }
        type="submit"
        data-testid="signup-btn"
        onClick={ () => history.push('/login') }
        className="btn btn-warning text-dark"
      >
        Cadastrar
      </button>
    </div>
  );
}

Register.propTypes = {
  history: propTypes.shape.isRequired,
};

export default Register;
