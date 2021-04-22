import React from 'react';
import '../../styles/Menu.css';
import { useHistory } from 'react-router';
// import { FiMenu } from 'react-icons/fi';

function MenuSideBarAdm() {
  const history = useHistory();

  const handlePage = ({ target }) => {
    const { name } = target;
    history.push(`/admin/${name}`);
  };

  return (
    <div className="admin-side-bar-container menuSideBaraAd">
      {/* <span
        data-testid="top-hamburguer"
        className="menuIcon"
      >
        <FiMenu />
      </span> */}

      <button
        type="button"
        className="btnSideBar"
        data-testid="side-menu-item-orders"
        onClick={ handlePage }
        name="orders"
      >
        Meus Pedidos
      </button>
      <button
        type="button"
        className="btnSideBar"
        data-testid="side-menu-item-profile"
        onClick={ handlePage }
        name="profile"
      >
        Meu Perfil
      </button>
      <button
        type="button"
        className="btnSideBar"
        data-testid="side-menu-item-logout"
        onClick={ () => history.push('/login') }
        name="login"
      >
        Sair
      </button>
    </div>
  );
}

export default MenuSideBarAdm;
