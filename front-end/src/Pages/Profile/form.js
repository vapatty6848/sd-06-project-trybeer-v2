import React from 'react';

import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';

import { updateUser } from '../../Services/Apis';

import Input from '../../Components/Input';
import button from './button';

const handleSubmit = async (event, { name, email }, token, setUpdateMessage) => {
  event.preventDefault();

  const updated = await updateUser(name, email, token);

  if (updated.message === 'Token Inválido') localStorage.setItem('user', '{}');
  if (updated.name === name) localStorage.setItem('user', JSON.stringify(updated));

  setUpdateMessage(true);
};


export default function form([
  name,
  setNameState,
  email,
  token,
  isDisabled,
  updateMessage,
  setUpdateMessage,
]) {
  const user = { name, email };
  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));

  return (
    <form onSubmit={ (e) => handleSubmit(e, user, token, setUpdateMessage) }>
      <h1 data-testid="top-title">Meu perfil</h1>
      <Input
        id="name-input"
        value={ name }
        label="Nome"
        dataTestid="profile-name-input"
        onChange={ ({ target }) => setNameState(target.value) }
        themeStorage={ theme && theme.title }
        icon={ BiUser }
      />
      <Input
        id="email-input"
        value={ email }
        label="Email"
        dataTestid="profile-email-input"
        readOnly
        themeStorage={ theme && theme.title }
        icon={ FiMail }
      />

      {button(isDisabled)}

      {(updateMessage) ? <p>Atualização concluída com sucesso</p> : null}
    </form>
  );
}
