import React from 'react';
import PropTypes from 'prop-types';

function RegisterForm(props) {
  const { setName, setEmail, setPassword, setCheck } = props;

  return (
    <div>
      <h2 className="login-title">Cadastrar Conta</h2>
      <form>
        <label htmlFor="signup-name">
          Nome
          <input
            className="form-control imput-login"
            type="name"
            data-testid="signup-name"
            name="signup-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="signup-email">
          Email
          <input
            className="form-control imput-login"
            type="email"
            data-testid="signup-email"
            name="signup-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="signup-password">
          Senha
          <input
            className="form-control imput-login"
            type="password"
            data-testid="signup-password"
            name="signup-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <label htmlFor="signup-seller">
          <input
            className="form-check-input"
            type="checkbox"
            data-testid="signup-seller"
            name="signup-seller"
            id="checkbox"
            onChange={ ({ target }) => setCheck(target.value) }
          />
          Quero vender
        </label>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  setName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setCheck: PropTypes.func.isRequired,
};

export default RegisterForm;
