import React, { useState } from 'react';
import propTypes from 'prop-types';
import './componentsCSS/TopMenu.css';
import { useHistory } from 'react-router-dom';

export default function TopMenuAdmin({ pageTitle }) {
  const history = useHistory();

  const [asideClass, setasideClass] = useState('aside-menu-off');

  const handleOnClickHamburguerButton = () => {
    const asideOn = 'aside-menu-on';
    const asideOff = 'aside-menu-off';
    if (asideClass === asideOn) setasideClass(asideOff);
    if (asideClass === asideOff) setasideClass(asideOn);
  };

  const handleClick = (e) => {
    if (e.target.value === 'Pedidos') { history.push('/admin/orders'); }
    if (e.target.value === 'Perfil') { history.push('/admin/profile'); }
    if (e.target.value === 'Conversas') { history.push('/admin/chats'); }
    if (e.target.value === 'Sair') {
      localStorage.setItem('token', '');
      history.push('/login');
    }
  };

  return (
    <header className="nav-main">
      <div className="title-burguer-div">
        <button
          type="button"
          data-testid="top-hamburguer"
          className="btn-toggle-nav"
          onClick={ handleOnClickHamburguerButton }
        >
          &nbsp;
        </button>
        <h1 data-testid="top-menu" className="page-title">{pageTitle}</h1>
        <aside id="aside" className={ asideClass }>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-orders"
              value="Pedidos"
              onClick={ handleClick }
            >
              Pedidos
            </button>
          </div>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-profile"
              value="Perfil"
              onClick={ handleClick }
            >
              Perfil
            </button>
          </div>

          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-chat"
              onClick={ handleClick }
              value="Conversas"
            >
              Conversas
            </button>
          </div>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-logout"
              value="Sair"
              onClick={ handleClick }
            >
              Sair
            </button>
          </div>
        </aside>
      </div>
    </header>

  );
}

TopMenuAdmin.propTypes = {
  pageTitle: propTypes.string.isRequired,
};
