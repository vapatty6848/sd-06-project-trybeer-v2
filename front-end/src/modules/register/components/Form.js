import React, { useContext, useState, useEffect } from 'react';
import * as API from '../../../utils';
import Buttons from './Buttons';
import EmailInput from './EmailInput';
import RoleInput from './RoleInput';
import NameInput from './NameInput';
import PasswordInput from './PasswordInput';
import GlobalContext from '../../../context/Context';

function Form() {
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'client' });
  const [errorForm, setErrorForm] = useState({ email: true, password: true, name: true });
  const [errorMsg, setErrorMsg] = useState('');
  const { setToken } = useContext(GlobalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await API.post('/users', form);
    if (response.message) return setErrorMsg('E-mail already in database.');
    localStorage.setItem('user', JSON.stringify(response));
    const delay = 500;
    setTimeout(() => setToken(true), delay);
  };

  useEffect(() => {
    const clear = () => clearTimeout(handleSubmit);
    return clear;
  }, []);

  return (
    <form className="flex flex-col mt-10" onSubmit={ handleSubmit }>
      <div className="flex flex-col space-y-4">
        { NameInput(setErrorForm, setForm, form.name) }
        { EmailInput(setErrorForm, setForm, form.email) }
        { PasswordInput(setErrorForm, setForm, form.password) }
        { RoleInput(setForm, form.role) }
        { Buttons(errorMsg, setErrorMsg, errorForm) }
      </div>
    </form>
  );
}

export default Form;
