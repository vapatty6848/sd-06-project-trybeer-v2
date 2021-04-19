import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken, getUserByEmail } from '../services/usersServices';
import LoginForm from '../components/LoginForm';
import Button from '../components/Button';
import { regex, minPassword } from '../variables';

const redirect = (userFound, history) => {
  if (userFound.role === 'client') {
    history.push('/products');
  } else if (userFound.role === 'admin' || userFound.role === 'administrator') {
    history.push('/admin/orders');
  }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [loginSucess, setLoginSucess] = useState(true);
  const history = useHistory();

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    if (storageUser) {
      const user = await getToken(storageUser.token);
      console.log(user);
      if (user.role === 'client') {
        history.push('/products');
      } else if (user.role === 'admin' || user.role === 'administrator') {
        history.push('/admin/orders');
      }
    }
  };

  useEffect(() => {
    auxFunc();
  }, []);

  useEffect(() => {
    if (password.length >= minPassword && regex.test(email)) {
      return setBtnDisable(false);
    }
    setBtnDisable(true);
  }, [email, password]);

  const handleLocalStorage = (user) => {
    const { id, name, role, token } = user;
    const obj = {
      id,
      name,
      email,
      token,
      role,
    };
    const jsonAux = JSON.stringify(obj);
    localStorage.setItem('user', jsonAux);
  };

  const handleClick = async () => {
    const userFound = await getUserByEmail(email);
    if (userFound.message || userFound.password.toString() !== password.toString()) {
      return setLoginSucess(false);
    }
    setLoginSucess(true);
    handleLocalStorage(userFound);
    redirect(userFound, history);
  };

  return (
    <div className="login-container d-grid gap-2">
      <LoginForm setEmail={ setEmail } setPassword={ setPassword } />
      <Button
        className="btn-login btn btn-success"
        title="Entrar"
        dataTestid="signin-btn"
        handleClick={ handleClick }
        btnDisable={ btnDisable }
      />
      <Button
        className="btn-login btn btn-success"
        title="Ainda não tenho conta"
        dataTestid="no-account-btn"
        handleClick={ () => history.push('/register') }
        btnDisable={ false }
      />
      {!loginSucess ? <p>Email ou senha incorretos.</p> : null}
    </div>
  );
}

export default Login;
