import React, { useContext, useState } from 'react';
import Context from '../Context/Context';
import { ApiService } from '../services';
import { MenuTop } from '../components';

export default function Profile() {
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState('');
  const { name, setName, email } = useContext(Context);

  function handleClick() {
    ApiService.editName(name, email);
    setMessage('Atualização concluída com sucesso');
  }

  function handleChange({ target }) {
    setName(target.value);
    setValid(false);
  }

  return (
    <div className="profile-main-div">
      <MenuTop title="Meu perfil" />
      <form className="d-flex flex-column mt-4">
        <div className="form-group row ml-5">
          <input
            data-testid="profile-name-input"
            className="col-sm-2 col-form-label ml-3 w-75"
            value={ name }
            onChange={ (target) => { handleChange(target); } }
          />
        </div>
        <div className="form-group row ml-5">
          <input
            data-testid="profile-email-input"
            className="form-control-plaintext ml-3 w-75"
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
            className={ valid ? 'btn btn-light' : 'btn btn-save' }
          >
            Salvar
          </button>
          {message ? <span>{message}</span> : null}
        </div>
      </form>
    </div>
  );
}
