import React, { useContext, useState, useEffect } from 'react';
import * as API from '../../../utils';
import Buttons from './Buttons';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import GlobalContext from '../../../context/Context';

function Form() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorForm, setErrorForm] = useState({ email: true, password: true });
  const [errorMsg, setErrorMsg] = useState('');
  const { setToken } = useContext(GlobalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await API.post('/users/login', form);
    if (response.message) return setErrorMsg(response.message);
    localStorage.setItem('user', JSON.stringify({ ...response, email: form.email }));
    const delay = 1000;
    setTimeout(() => setToken(true), delay);
  };

  useEffect(() => {
    const clear = () => clearTimeout(handleSubmit);
    return clear;
  }, []);

  return (
    <form className="flex flex-col mt-10" onSubmit={ handleSubmit }>
      <div className="flex flex-col space-y-4">
        { EmailInput(setErrorForm, setForm, form.email) }
        { PasswordInput(setErrorForm, setForm, form.password) }
        { Buttons(errorMsg, errorForm) }
      </div>
    </form>
  );
}

export default Form;
