import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import './Profile.scss';

function Profile(props) {
  const { user, eraseLocalStorage } = useContext(TrybeerContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const TIME_TO_REDIRECT = 3000;

  const setConfig = useCallback(() => {
    setEmail(user.email);
    setName(user.name);
  }, [user.email, user.name]);

  const onChangeName = ({ target: { value } }) => {
    if (name === value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = user;
    await fetchFunctions.put('register', token, { name: e.target.form[0].value, email });
    const { history } = props;
    setIsUpdated(true);
    eraseLocalStorage();
    setTimeout(() => history.push('/login'), TIME_TO_REDIRECT);
  };

  useEffect(() => {
    setConfig();
  }, [isUpdated, setConfig]);

  return (
    <div>
      <TopMenu
        titleMenu="Meu perfil"
      />
      <form method="put">
        <div className="content-panel">
          <label htmlFor="name">
            Name
            <input
              data-testid="profile-name-input"
              type="text"
              name="name"
              placeholder="Nome"
              id="name"
              onChange={ onChangeName }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              value={ email }
              readOnly="readonly"
              data-testid="profile-email-input"
              type="text"
              name="email"
              placeholder="Email"
              id="email"
            />
          </label>
          <button
            data-testid="profile-save-btn"
            type="submit"
            className="save-btn"
            disabled={ disabled }
            onClick={ handleSubmit }
          >
            Salvar
          </button>
          {
            isUpdated && (<div> Atualização concluída com sucesso </div>)
          }
        </div>
      </form>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Profile;
