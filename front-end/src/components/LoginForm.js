import React from 'react';
import PropTypes from 'prop-types';

function LoginForm(props) {
  const { setEmail, setPassword } = props;

  return (
    <div>
      <h2 className="login-title">Trybeer | Grupo 15</h2>
      <form>
        <label className="form-label" htmlFor="email-input">
          Email
          <input
            className="form-control imput-login"
            type="email"
            data-testid="email-input"
            name="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="form-label" htmlFor="password-input">
          Senha
          <input
            className="form-control imput-login"
            type="password"
            data-testid="password-input"
            name="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
