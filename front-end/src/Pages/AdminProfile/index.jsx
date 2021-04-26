import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
import profile from './profile';

import S from './styles';

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
