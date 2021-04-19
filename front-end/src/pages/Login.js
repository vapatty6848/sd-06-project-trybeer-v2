import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../context/UserContext';
import { login } from '../api/axiosApi';

import { Container, Content } from '../components/styled-components';
import { Button, Input, Title, Label } from '../components';

export default function Login() {
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(UserContext);
  const [loginUserLocal, setLoginUserLocal] = useState({ email: '', password: '' });

  const handleLogin = async (dataUser) => {
    const user = await login(dataUser);
    localStorage.setItem('user', JSON.stringify(user));
    setLoginUser({ ...loginUser, user });

    if (user.role === 'client') {
      history.push({ pathname: '/products' });
    } else if (user.role === 'administrator') {
      history.push({ pathname: '/admin/orders' });
    } else {
      history.push({ pathname: '/register' });
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginUserLocal({ ...loginUserLocal, [name]: value });
  };

  const { email, password } = loginUserLocal;
  const inputEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const PASSWORD_MIN_SIZE = 6;
  const activeButton = inputEmail.test(email) && password.length >= PASSWORD_MIN_SIZE;

  return (
    <section>
      <Container>
        <Content>
          <Title title="Login" />
          <Label text="Email" />
          <Input
            type="email"
            id="email-input"
            name="email"
            onChange={ handleChange }
          />
          <Label text="Senha" />
          <Input
            type="password"
            id="password-input"
            name="password"
            onChange={ handleChange }
          />
          <Button
            type="button"
            id="signin-btn"
            label="Entrar"
            disabled={ !activeButton }
            onClick={ () => handleLogin(loginUserLocal) }
          />
          <Button
            type="button"
            id="no-account-btn"
            label="Ainda não tenho conta"
            onClick={ () => history.push('/register') }
          />
        </Content>
      </Container>
    </section>
  );
}
