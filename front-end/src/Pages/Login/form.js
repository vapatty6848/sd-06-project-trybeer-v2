import React from 'react';

import { FiMail, FiLock } from 'react-icons/fi';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { loginUser } from '../../Services/Apis';

const saveLocalStorage = (res) => {
  localStorage.setItem('user', JSON.stringify(res));
};

const handleSubmit = async ([event, email, password, history]) => {
  event.preventDefault();
  const user = await loginUser(email, password);
  saveLocalStorage(user);
  history.push((user.role === 'client') ? '/products' : '/admin/orders');
};

const userRegistered = () => {
  window.location.href = '/register';
};

export default function form(params) {
  const { setEmail, setPassword, isDisabled, email, password, history } = params;
  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));

  return (
    <form onSubmit={ (e) => handleSubmit([e, email, password, history]) }>
      <h1>Login</h1>
      <Input
        id="email"
        type="text"
        label="Email"
        dataTestid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        themeStorage={ theme && theme.title }
        icon={ FiMail }
      />
      <Input
        id="senha"
        type="password"
        label="Senha"
        width="400px"
        dataTestid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
        themeStorage={ theme && theme.title }
        icon={ FiLock }
      />
      <Button
        type="submit"
        heigth="40px"
        color="green"
        fontSize="20px"
        disabled={ isDisabled }
        dataTestid="signin-btn"
      >
        Entrar
      </Button>
      <Button
        type="button"
        heigth="40px"
        color="grayButton"
        fontSize="16px"
        dataTestid="no-account-btn"
        onClick={ userRegistered }
      >
        Ainda não tenho conta
      </Button>
    </form>
  );
}
