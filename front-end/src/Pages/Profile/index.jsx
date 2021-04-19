import React, { useEffect, useState, useContext } from 'react';

import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import LogoTryBeer from '../../Components/LogoTryBeer';
import form from './form';

import Container from './styles';

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
