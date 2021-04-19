import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyRegister, handleCheckbox, handleSubmitRegister } from '../services';
import cadastro from '../img/cadastro.png';
import '../css/Register.css';

function Register() {
  const [activeBtn, setActiveBtn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
  const [checked, setChecked] = useState(false);
  const history = useHistory();

  useEffect(() => verifyRegister(user, setActiveBtn), [checked, user]);

  return (
    <div className="register-page">
      <img src={ cadastro } alt="cadastro" className="register-logo" />
      <div className="register-form">
        <span className="register-label">Nome</span>
        <input
          className="register-input"
          placeholder="Minimo 12 caracteres"
          data-testid="signup-name"
          type="text"
          onChange={ (event) => setUser({ ...user, name: event.target.value }) }
        />
        <span className="register-label">Email</span>
        <input
          className="register-input"
          placeholder="email@email.com"
          data-testid="signup-email"
          type="email"
          onChange={ (event) => setUser({ ...user, email: event.target.value }) }
        />
        <span className="register-label">Senha</span>
        <input
          className="register-input"
          placeholder="Minimo 6 caracteres"
          data-testid="signup-password"
          type="password"
          onChange={ (event) => setUser({ ...user, password: event.target.value }) }
        />
        <label htmlFor="checkbox">
          Quero vender
          <input
            id="checkbox"
            type="checkbox"
            data-testid="signup-seller"
            checked={ checked }
            onChange={ () => handleCheckbox(checked, setChecked, setUser, user) }
          />
        </label>
        <button
          className="register-button"
          data-testid="signup-btn"
          disabled={ !activeBtn }
          type="button"
          onClick={ () => handleSubmitRegister(user, checked, setUser, history) }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Register;
