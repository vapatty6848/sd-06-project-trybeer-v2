import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';
import FormLogin from '../components/pageLogin/FormLogin';
import api from '../services/api';
import { loginUtils } from '../utils';
import '../css/bulma.min.css';
import '../css/login.css';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [valid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [displayErr, setDisplayErr] = useState(false);

  useEffect(() => {
    localStorage.cart = JSON.stringify([]);
    if (!localStorage.user) localStorage.user = JSON.stringify({});
  }, []);

  useEffect(() => {
    loginUtils.visibilityBtnLogin(user, setValid);
  }, [user]);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const userData = await api.generateToken(user.email, user.password);

    if (userData.result) {
      // console.log(userData.response);
      const { role } = userData.response;
      setErrMsg(false);
      if (role === 'administrator') history.push('/admin/orders');
      else history.push('/products');
      localStorage.user = JSON.stringify(userData.response);
    } else {
      setDisplayErr(true);
      setErrMsg(userData.response.message);
    }
  };

  return (
    <LoginContext.Provider
      value={ {
        dataUser: user,
        isDisabled: valid,
        handleIputs: handleChange,
        handleButton: handleClick,
        router: history,
        messageError: errMsg,
        displayError: displayErr,
      } }
    >
      <div className="main-content">
        <FormLogin />
      </div>
    </LoginContext.Provider>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Login;
