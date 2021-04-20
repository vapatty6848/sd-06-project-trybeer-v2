import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { TextInput, SubmitButton } from '../components';
import { yupSchemas, handleSubmit } from '../utils';

import '../styles/Forms.css';

export default function Login() {
  const { tokenContext: { setToken } } = useContext(AppContext);
  const [disableBtn, setDisableBtn] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });

  const history = useHistory();

  const updateLogin = (target) => setLogin({ ...login, [target.name]: target.value });

  const submit = (e) => {
    e.preventDefault();

    const params = { action: 'login', login, setToken, history };
    handleSubmit(params);
  };

  useEffect(() => {
    const validateForm = async () => yupSchemas.login.validate(login)
      .then(() => {
        if (disableBtn === true) setDisableBtn(false);
      })
      .catch((error) => {
        if (disableBtn === false) setDisableBtn(true);
        return error;
      });

    validateForm();
  }, [login, disableBtn]);

  return (
    <div>
      <form onSubmit={ submit }>
        <fieldset>
          <legend>Login</legend>
          <TextInput
            name="email"
            testId="signin"
            value={ login.email }
            callback={ updateLogin }
          />
          <TextInput
            name="password"
            testId="signin"
            value={ login.password }
            callback={ updateLogin }
          />
          <SubmitButton type="signin" disabled={ disableBtn } />
          <Link to="/register">
            <button type="button" data-testid="no-account-btn">
              Ainda não tenho conta
            </button>
          </Link>
        </fieldset>
      </form>
    </div>
  );
}
