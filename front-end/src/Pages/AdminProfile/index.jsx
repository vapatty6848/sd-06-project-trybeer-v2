import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
// import LogoTryBeer from '../../Components/LogoTryBeer';

import S from './styles';

// const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));
const profile = (name, email) => (
  <S.ContextProfile>

    <S.ContextName>
      <div>
        <BiUser />
      </div>
      <span data-testid="profile-name">{ name }</span>
    </S.ContextName>

    <S.ContextEmail>
      <div>
        <FiMail />
      </div>
      <span data-testid="profile-email">{ email }</span>
    </S.ContextEmail>

  </S.ContextProfile>
);

const AdminProfile = () => {
  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');

  const { stateSideBarAdmin } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    const dataStorage = JSON.parse(localStorage.getItem('user'));

    if (!dataStorage) {
      history.push('/login');
    } else {
      setEmailState(dataStorage.email);
      setNameState(dataStorage.name);
    }
  }, [history]);

  return (
    <>
      <MenuTopAdmin dataTestid="top-title" title="Meu perfil" />

      <S.Context>
        <SideBarAdmin />

        <S.Container stateSideBar={ stateSideBarAdmin }>

          {profile(nameState, emailState)}
        </S.Container>
      </S.Context>
    </>
  );
};

export default AdminProfile;
