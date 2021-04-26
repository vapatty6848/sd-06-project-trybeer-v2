import React, { useEffect, useState } from 'react';

import S from './styles';

import LogoTryBeer from '../../Components/LogoTryBeer';
import form from './form';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const twelve = 12;

  useEffect(() => {
    const emailFormat = /\S+@\S+\.\S+/.test(email);
    const nameFormat = /^[A-Za-z ]+$/.test(name);
    const six = 6;
    const minPasswordLength = password.length >= six;
    if (emailFormat && nameFormat && minPasswordLength && name.length > twelve) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password, emailAlreadyExists]);

  const params = {
    name,
    setEmail,
    setPassword,
    isDisabled,
    email,
    password,
    setName,
    isChecked,
    setIsChecked,
    emailAlreadyExists,
    setEmailAlreadyExists,
  };

  return (
    <S.Container>
      <LogoTryBeer />
      {form(params)}
    </S.Container>
  );
};

export default Register;
