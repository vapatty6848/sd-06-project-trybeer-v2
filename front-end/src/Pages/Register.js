import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import registerFetch from '../services/RegisterService';

function Register({ history }) {
  const { email, setEmail, name, setName, role, setRole } = useContext(Context);
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

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
    const newUser = await registerFetch(name, email, password, role);
    if (newUser.message !== 'Email já cadastrado' && role === 'client') {
      history.push('/products');
    } else if (newUser.message !== 'Email já cadastrado' && role === 'administrator') {
      history.push('/admin/orders');
    } else {
      console.log(newUser.message);
      history.push('/register');
    }
  }

  useEffect(() => {
    const twelve = /[^()[\]{}*&^%$#@!0-9]+.{11,30}[a-zA-Z]$/;
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
          placeholder="12 ou mais caracteres"
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
          id="signup-seller"
          checked={ !isChecked }
          onChange={ ({ target }) => handleRole(target.checked) }
          className="form-control"
        />
      </label>
      <button
        disabled={ !valid }
        type="submit"
        data-testid="signup-btn"
        onClick={ () => handlePage() }
        className="btn btn-warning text-dark"
      >
        Cadastrar
      </button>
    </div>
  );
}

Register.defaultProps = {
  history: '/register',
};

Register.propTypes = {
  history: propTypes.shape,
};

export default Register;
