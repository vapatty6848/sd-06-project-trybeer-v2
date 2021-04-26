import React, { useContext } from 'react';

import { GlobalContext } from '../../Contexts/GlobalContext';

import S from './styles';

const LogoTryBeer = () => {
  const { stateSideBar } = useContext(GlobalContext);
  return (
    <S.Container stateSideBar={ stateSideBar }>
      <h1>
        Try
        <span>Beer</span>
      </h1>

      <img
        src="./images/trybeer-logo.png"
        alt="Logo TryBeer"
      />
    </S.Container>
  );
};

export default LogoTryBeer;
