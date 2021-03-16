import React, { useContext, useState } from 'react';
import MenuTop from '../components/MenuTop';
import Context from '../Context/Context';
import profileFetch from '../services/ProfileService';

export default function Profile() {
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState('');
  const { name, setName, email } = useContext(Context);
  function handleClick() {
    profileFetch(name, email);
    setMessage('Atualização concluída com sucesso');
  }
  function handleChange({ target }) {
    setName(target.value);
    setValid(false);
  }
  return (
    <div>
      <MenuTop title="Meu perfil" />
      <input
        data-testid="profile-name-input"
        value={ name }
        onChange={ (target) => { handleChange(target); } }
      />
      <input data-testid="profile-email-input" readOnly value={ email } />
      <button
        disabled={ valid }
        type="button"
        data-testid="profile-save-btn"
        onClick={ handleClick }
      >
        Salvar
      </button>
      {message ? <span>{message}</span> : null}
    </div>
  );
}
