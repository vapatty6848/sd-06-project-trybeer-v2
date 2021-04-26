import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import Container from './styles';

import LoadingBeer from '../../Components/LoadingBeer';
import LogoTryBeer from '../../Components/LogoTryBeer';
import form from './form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const emailFormat = /\S+@\S+\.\S+/.test(email);
    const six = 6;
    const minPasswordLength = password.length >= six;

    setIsDisabled(!(emailFormat && minPasswordLength));
  }, [email, password]);

  const time = 3500;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1 * time);
  }, []);

  const params = {
    setEmail, setPassword, isDisabled, email, password, history,
  };
  return (
    <div>
      {isLoading ? (
        <LoadingBeer />
      ) : (
        <Container>
          <LogoTryBeer />
          {form(params)}
        </Container>
      )}
    </div>
  );
};

export default Login;
