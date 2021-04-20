import React from 'react';

import { BiUser } from 'react-icons/bi';
import { FiMail, FiLock } from 'react-icons/fi';

import { loginUser, registerNewUser } from '../../Services/Apis';

import Input from '../../Components/Input';
import button from './button';

import S from './styles';

const handleSubmit = async (event,
  { name, email, password, isChecked, setEmailAlreadyExists }) => {
  event.preventDefault();

  const role = (isChecked) ? 'admin' : 'client';

  const result = await registerNewUser(name, email, password, role);

  const newUser = await loginUser(email, password);

  if (result && result === 'E-mail already in database.') {
    setEmailAlreadyExists(true);
  } else if (result && result === 'OK') {
    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.href = (newUser.role === 'client') ? '/products' : '/admin/orders';
  }
};

export default function form(params) {
  const { name, setEmail,
    setPassword, isDisabled, email, password, setName,
    isChecked, setIsChecked, emailAlreadyExists, setEmailAlreadyExists,
  } = params;
  const paramsRegistered = { name, email, password, isChecked, setEmailAlreadyExists };
  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));
  return (
    <S.Form onSubmit={ (e) => handleSubmit(e, paramsRegistered) }>
      <h1>Register</h1>
      <Input
        id="name-input"
        label="Nome"
        dataTestid="signup-name"
        onChange={ ({ target }) => setName(target.value) }
        themeStorage={ theme && theme.title }
        icon={ BiUser }
      />
      <Input
        id="email-input"
        label="Email"
        dataTestid="signup-email"
        onChange={ ({ target }) => setEmail(target.value) }
        themeStorage={ theme && theme.title }
        icon={ FiMail }
      />
      {(emailAlreadyExists) ? <p>E-mail already in database.</p> : null}
      <Input
        id="password-input"
        label="Senha"
        dataTestid="signup-password"
        onChange={ ({ target }) => setPassword(target.value) }
        themeStorage={ theme && theme.title }
        icon={ FiLock }
      />
      <S.Label htmlFor="check">
        <input
          className="input-checkBox"
          id="check"
          type="checkBox"
          checked={ isChecked }
          onChange={ ({ target }) => setIsChecked(target.checked) }
          data-testid="signup-seller"
        />
        Quero vender
        <span className="checkmark" />
      </S.Label>
      {button(isDisabled)}
    </S.Form>
  );
}
