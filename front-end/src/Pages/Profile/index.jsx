import React, { useEffect, useState, useContext } from 'react';

import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { updateUser } from '../../Services/Apis';

import Button from '../../Components/Button';
import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import Input from '../../Components/Input';
import LogoTryBeer from '../../Components/LogoTryBeer';

import Container from './styles';

const handleSubmit = async (event, { name, email }, token, setUpdateMessage) => {
  event.preventDefault();

  const updated = await updateUser(name, email, token);

  if (updated.message === 'Token Inválido') localStorage.setItem('user', '{}');
  if (updated.name === name) localStorage.setItem('user', JSON.stringify(updated));

  setUpdateMessage(true);
};

const button = (isDisabled) => (
  <Button
    type="submit"
    heigth="40px"
    color="green"
    fontSize="20px"
    disabled={ isDisabled }
    dataTestid="profile-save-btn"
  >
    Salvar
  </Button>
);

const form = ([
  name,
  setNameState,
  email,
  token,
  isDisabled,
  updateMessage,
  setUpdateMessage,
]) => {
  const user = { name, email };
  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));

  return (
    <form onSubmit={ (e) => handleSubmit(e, user, token, setUpdateMessage) }>
      <h1 data-testid="top-title">Meu perfil</h1>
      <Input
        id="name-input"
        value={ name }
        label="Nome"
        dataTestid="profile-name-input"
        onChange={ ({ target }) => setNameState(target.value) }
        themeStorage={ theme && theme.title }
        icon={ BiUser }
      />
      <Input
        id="email-input"
        value={ email }
        label="Email"
        dataTestid="profile-email-input"
        readOnly
        themeStorage={ theme && theme.title }
        icon={ FiMail }
      />

      {button(isDisabled)}

      {(updateMessage) ? <p>Atualização concluída com sucesso</p> : null}
    </form>
  );
};

const Profile = () => {
  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);

  const { stateSideBar } = useContext(GlobalContext);

  useEffect(() => {
    const dataStorage = localStorage.getItem('user');
    const { name, email } = JSON.parse(dataStorage);

    setEmailState(email);
    setNameState(name);
  }, []);

  useEffect(() => {
    const nameFormat = /^[A-Za-z ]+$/.test(nameState);
    const dataStorage = localStorage.getItem('user');
    const { name } = JSON.parse(dataStorage);
    const twelve = 12;

    setIsDisabled(!((nameFormat && nameState.length > twelve && nameState !== name)));
  }, [nameState]);

  const dataStorage = localStorage.getItem('user');

  let token = '';

  if (dataStorage !== null) {
    token = JSON.parse(dataStorage).token;
  }

  return (
    <>
      <MenuTop dataTestid="top-title" title="Meu perfil" />
      <SideBar />
      <Container stateSideBar={ stateSideBar }>
        <LogoTryBeer />
        {form([
          nameState,
          setNameState,
          emailState,
          token,
          isDisabled,
          updateMessage,
          setUpdateMessage,
        ])}
      </Container>
    </>
  );
};

export default Profile;
