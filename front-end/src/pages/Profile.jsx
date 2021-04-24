import React, { useState } from 'react';
import { Redirect } from 'react-router';
import MenuTop from '../components/MenuTop';
import api from '../services/api';
import '../styles/profile.css';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState(user.name);
  const [isEnabled, setIsEnabled] = useState(true);
  const [message, setMessage] = useState('');

  if (!user) return <Redirect to="login" />;

  const handleClick = () => {
    api.fetchChangeName(name, user.email);
    localStorage.setItem('user', JSON.stringify({ ...user, name }));
    setMessage('Atualização concluída com sucesso');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
    if (value !== user.name) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  };

  return (
    <div>
      <MenuTop title="Meu perfil" />
      <div className="form-group container-profile">
        <label htmlFor="email">
          Email
          <input
            data-testid="profile-email-input"
            readOnly
            className="form-control"
            type="text"
            id="email"
            name="email"
            value={ user.email }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            data-testid="profile-name-input"
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ (e) => handleChange(e) }
          />
        </label>
      </div>
      <div className="button-profile">
        <button
          data-testid="profile-save-btn"
          className="btn btn-danger"
          type="button"
          disabled={ isEnabled }
          onClick={ handleClick }
        >
          Salvar
        </button>
      </div>
      <div>{message}</div>
    </div>
  );
}
