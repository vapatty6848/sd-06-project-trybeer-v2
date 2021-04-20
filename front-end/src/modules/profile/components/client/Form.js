import React, { useEffect, useState } from 'react';
import * as API from '../../../../utils';
import Buttons from './Buttons';
import EmailInput from './EmailInput';
import NameInput from './NameInput';

function Form() {
  const [form, setForm] = useState({ email: '', name: '' });
  const [errorForm, setErrorForm] = useState({ name: true, email: false });
  const [msg, setMsg] = useState({ error: '', success: '' });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    if (storage) setForm({ email: storage.email, name: storage.name });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await API.update('/users', form);
    if (response.message) {
      return setMsg((prev) => ({ ...prev, error: 'Fail to update user name.' }));
    }
    const storage = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...storage, name: response.name }));
    setMsg((prev) => ({ ...prev, success: 'User updated with success.' }));
  };

  return (
    <form className="flex flex-col mt-10 space-y-4" onSubmit={ handleSubmit }>
      { NameInput(setErrorForm, setForm, form.name) }
      { EmailInput(form.email) }
      { Buttons(msg, setMsg, errorForm) }
    </form>
  );
}

export default Form;
