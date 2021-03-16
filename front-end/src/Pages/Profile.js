import React, { useContext } from 'react';
import MenuTop from '../components/MenuTop';
import Context from '../Context/Context';

export default function Profile() {
  const { name, setName, email } = useContext(Context);
  function handleClick() {

  }
  return (
    <div>
      <MenuTop title="Meu perfil" />
      <input data-testid="profile-name-input" value={ name } />
      <input data-testid="profile-email-input" value={ email } />
      <button
        type="button"
        data-testid="profile-save-btn"
        onClick={ handleClick }
      >
        Salvar
      </button>
    </div>
  );
}
