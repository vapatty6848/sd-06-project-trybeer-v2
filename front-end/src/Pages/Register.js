import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';

function Register({ history }) {
  const { email, setEmail, name, setName, role, setRole } = useContext(Context);
  const [password, setPassword] = useState('');

  return (
    <div>
      <label htmlFor="signup-name">
        Nome
        <input
          type="text"
          data-testid="signup-name"
          // onChange={ ({ target }) => setEmail(target.value) }
          className="form-control"
          placeholder="Digite um nome de 12 ou mais caracteres"
        />
      </label>
      <label htmlFor="signup-email">
        Email
        <input
          type="email"
          data-testid="signup-email"
          // onChange={ ({ target }) => setEmail(target.value) }
          className="form-control"
          placeholder="Digite um email"
        />
      </label>
      <label htmlFor="signup-password">
        Senha
        <input
          type="password"
          data-testid="signup-password"
          // onChange={ ({ target }) => setPass(target.value) }
          className="form-control"
          placeholder="Digite uma senha"
        />
      </label>
      <label htmlFor="signup-seller">
        Quero vender
        <input
          type="checkbox"
          data-testid="signup-seller"
          // onChange={ ({ target }) => setPass(target.value) }
          className="form-control"
        />
      </label>
    </div>
  );
}

Register.propTypes = {
  history: propTypes.shape.isRequired,
};

export default Register;
