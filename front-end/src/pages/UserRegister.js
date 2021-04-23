import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import {
  validateNewUser,
  registerNewUSer,
} from '../services/UserRegisterService';
import Input from '../components/Register/Input';
import AlreadyRegisterdMessage from '../components/Register/AlreadyRegisterdMessage';

import './UserRegister.css';

function UserRegister() {
  const { newUser, setNewUser } = useContext(TrybeerContext);
  const [enableButton, setEnableButton] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => setLoading(false));

  return (
    loading
      ? <div>Loading</div>
      : (
        <div className="mainDiv">
          <div>
            <h1 className="titleRegister">User Register</h1>
          </div>
          <form>
            <Input
              title="Nome"
              id="signup-name"
              type="text"
              callback={ () => validateNewUser(newUser, setNewUser, setEnableButton) }
            />
            <br />
            <Input
              title="Email"
              id="signup-email"
              type="email"
              callback={ () => validateNewUser(newUser, setNewUser, setEnableButton) }
            />
            <br />
            <Input
              title="Senha"
              id="signup-password"
              type="password"
              callback={ () => validateNewUser(newUser, setNewUser, setEnableButton) }
            />
            <br />
            <Input
              title="Quero vender"
              id="signup-seller"
              type="checkbox"
              callback={ () => validateNewUser(newUser, setNewUser, setEnableButton) }
            />
            <button
              className="buttonRegisterUser"
              disabled={ enableButton }
              type="button"
              data-testid="signup-btn"
              onClick={ () => registerNewUSer(history, newUser, setAlreadyRegistered) }
            >
              Cadastrar
            </button>
            { alreadyRegistered ? <AlreadyRegisterdMessage /> : null }
          </form>
        </div>
      )
  );
}

export default UserRegister;
