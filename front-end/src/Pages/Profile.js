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
      <form>
        <div className="form-group row">
          <input
            data-testid="profile-name-input"
            className="col-sm-2 col-form-label ml-3"
            value={ name }
            onChange={ (target) => { handleChange(target); } }
          />
        </div>
        <div className="form-group row">
          <input
            data-testid="profile-email-input"
            className="form-control-plaintext ml-3"
            readOnly
            value={ email }
          />
        </div>
        <div className="form-group btn">
          <button
            disabled={ valid }
            type="button"
            data-testid="profile-save-btn"
            onClick={ handleClick }
            className={ valid ? 'btn btn-light' : 'btn btn-primary' }
          >
            Salvar
          </button>
          {message ? <span>{message}</span> : null}
        </div>
      </form>
    </div>
  );
}
