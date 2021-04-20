import React, { useEffect, useState } from 'react';
import EmailInput from './EmailInput';
import NameInput from './NameInput';

function Form() {
  const [form, setForm] = useState({ email: '', name: '' });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user'));
    if (storage) setForm({ email: storage.email, name: storage.name });
  }, []);

  return (
    <form className="flex flex-col mt-10  space-y-4">
      { NameInput(form.name) }
      { EmailInput(form.email) }
    </form>
  );
}

export default Form;
