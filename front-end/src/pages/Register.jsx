import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FormRegister from '../components/pageRegister/FormRegister';
import { registerUtils } from '../utils';
import RegisterContext from '../context/RegisterContext';
import api from '../services/api';
import '../css/register.css';

function Register({ history }) {
  const [newUser, setUser] = useState({ name: '', email: '', senha: '', tipo: 'client' });
  const [valid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [displayErr, setDisplayErr] = useState(false);

  useEffect(() => {
    registerUtils.visibilityBtnRegister(newUser, setValid);
  }, [newUser]);

  const handleChange = ({ target }) => {
    if (target.name === 'tipo') {
      if (target.checked === true) setUser({ ...newUser, [target.name]: target.value });
      else setUser({ ...newUser, [target.name]: 'client' });
    } else { setUser({ ...newUser, [target.name]: target.value }); }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, senha, tipo } = newUser;
    const registerUser = await api.registerUser(name, email, senha, tipo);

    const token = await api.generateToken(email, senha);

    if (registerUser.result) {
      setDisplayErr(false);
      if (newUser.tipo === 'administrator') history.push('/admin/orders');
      else history.push('/products');
      localStorage.user = JSON.stringify(token.response);
    } else {
      setErrMsg(registerUser.response.message);
      setDisplayErr(true);
    }
  };

  return (
    <RegisterContext.Provider
      value={ {
        change: handleChange,
        click: handleClick,
        user: newUser,
        isValid: valid,
        messageError: errMsg,
        displayError: displayErr,
      } }
    >
      <div className="main-content-reg">
        <FormRegister />
      </div>
    </RegisterContext.Provider>
  );
}

Register.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Register;
