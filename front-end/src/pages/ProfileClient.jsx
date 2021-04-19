import React, { useState, useEffect } from 'react';
import { handleUpdate } from '../services/index';
import { profile } from '../api/index';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import '../css/General.css';
import '../css/ProfileClient.css';

function ProfileClient() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [activeBtn, setActiveBtn] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = ({ value }) => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'));

    if (userFromStorage.name !== value) {
      setActiveBtn(true);
    } else setActiveBtn(false);

    setUser({ ...user, name: value });
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await profile(token);
      localStorage.setItem(
        'user',
        JSON.stringify({ name: response.name, email: response.email, id: response.id }),
      );
      setUser({ name: response.name, email: response.email });
    }

    setActiveBtn(false);
    fetchData();
  }, []);

  useEffect(() => {
    const EXPIRE_MESSAGE = 4000;

    setTimeout(() => {
      setShowMessage(false);
    }, EXPIRE_MESSAGE);
  }, [showMessage]);

  return (
    <div className="client-profile-container">
      <ControllerHeader title="Meu perfil" />
      <section className="client-profile-content">
        <label htmlFor="name">
          Nome:
          <input
            name="name"
            data-testid="profile-name-input"
            value={ user.name }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            value={ user.email }
            data-testid="profile-email-input"
            readOnly
          />
        </label>
        <button
          type="submit"
          disabled={ !activeBtn }
          data-testid="profile-save-btn"
          onClick={ () => handleUpdate(user.name, setShowMessage) }
        >
          Salvar
        </button>
        <span
          className={ showMessage ? 'show' : 'no-show' }
        >
          Atualização concluída com sucesso
        </span>
      </section>
    </div>
  );
}

export default ProfileClient;
