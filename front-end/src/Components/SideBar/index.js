import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IoIosBeer } from 'react-icons/io';
import { FaListAlt, FaUserAlt } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';

import { GlobalContext } from '../../Contexts/GlobalContext';

import S from './styles';

const navigationPages = ({
  stateSideBar,
  setStateSideBar,
  history },
route) => {
  setStateSideBar(!stateSideBar);

  if (route === '/login') localStorage.removeItem('user');

  history.push(route);
};

const SideBar = () => {
  const [route, setRoute] = useState();
  const { stateSideBar, setStateSideBar, setStateIsOpacity } = useContext(GlobalContext);

  const history = useHistory();

  const params = {
    stateSideBar,
    setStateSideBar,
    history,
    setRoute,
    route,
    setStateIsOpacity,
  };

  return (
    <div>
      {stateSideBar && (
        <S.CompSideBar className="side-menu-container">
          <S.Navigation
            onClick={ () => navigationPages(params, '/products') }
            data-testid="side-menu-item-products"
          >
            <IoIosBeer
              className="icon"
              fill="#cf8d2e"
              size="30px"
            />
            Produtos
          </S.Navigation>
          <S.Navigation
            onClick={ () => navigationPages(params, '/orders') }
            data-testid="side-menu-item-my-orders"
          >
            <FaListAlt
              className="icon"
              fill="#cf8d2e"
              size="25px"
            />
            Meus pedidos
          </S.Navigation>
          <S.Navigation
            onClick={ () => navigationPages(params, '/profile') }
            data-testid="side-menu-item-my-profile"
          >
            <FaUserAlt
              className="icon"
              fill="#cf8d2e"
              size="25px"
            />
            Meu Perfil
          </S.Navigation>

          <S.Navigation
            className="get-out"
            onClick={ () => navigationPages(params, '/login') }
            data-testid="side-menu-item-logout"
          >
            <ImExit
              className="icon"
              fill="#cf8d2e"
              size="25px"
            />
            Sair
          </S.Navigation>
        </S.CompSideBar>
      )}
    </div>
  );
};

export default SideBar;
