import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import InputRegister from './InputRegister';
import InputCheckbox from './InputCheckbox';
import Button from './Button';

// Material-ui

import '../style/Register.css';

const RegisterForm = ({ state, setState, handleClick }) => {
  const { name,
    email, password, seller, formValidated, messageError, responseError } = state;
  const { setName, setEmail, setPassword, setSeller } = setState;
  return (

    <main>
      <form>
        <h1>Pagina de Registro</h1>
        <InputRegister
          name="email"
          setValue={ setName }
          value={ name }
          label="Nome"
        />
        <InputRegister
          name="email"
          setValue={ setEmail }
          value={ email }
          label="Email"
          type="email"
        />
        <InputRegister
          name="email"
          setValue={ setPassword }
          value={ password }
          label="Senha"
          type="password"
        />
        <InputCheckbox
          name="seller"
          setValue={ setSeller }
          checked={ seller }
          label="Quero vender"
          type="checkbox"
        />
        <Grow
          in={ messageError }
          style={ { transformOrigin: '0 0 0' } }
          { ...(messageError ? { timeout: 1500 } : {}) }
        >
          <p className="signup-p">
            {messageError
       !== '' || responseError !== '' ? messageError || responseError : null}
          </p>
        </Grow>

        <Button
          className="email-label"
          type="button"
          disabled={ !formValidated }
          data-testid="signup-btn"
          onClick={ async () => handleClick() }
        >
          Cadastrar
        </Button>

        <Link
          to="/login"
          className="no-account-btn"
          data-testid="no-account-btn"
        >
          <Button>
            Já tenho conta
          </Button>
        </Link>
      </form>
    </main>
  );
};
export default RegisterForm;

RegisterForm.propTypes = {
  state: PropTypes.shape(PropTypes.any).isRequired,
  setState: PropTypes.shape(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};
