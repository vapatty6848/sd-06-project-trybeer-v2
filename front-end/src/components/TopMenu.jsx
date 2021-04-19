import React, { useState } from 'react';
import propTypes from 'prop-types';
import './componentsCSS/TopMenu.css';
import { useHistory } from 'react-router-dom';

export default function TopMenu({ pageTitle }) {
  const history = useHistory();

  const [asideClass, setasideClass] = useState('aside-menu-off');

  const handleOnClickHamburguerButton = () => {
    const asideOn = 'aside-menu-on';
    const asideOff = 'aside-menu-off';
    if (asideClass === asideOn) setasideClass(asideOff);
    if (asideClass === asideOff) setasideClass(asideOn);
  };

  const handleOnClickAsideButton = (e) => {
    if (e.target.value === 'Produtos') { history.push('/products'); }
    if (e.target.value === 'Meus Pedidos') { history.push('/orders'); }
    if (e.target.value === 'Meu Perfil') { history.push('/profile'); }
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
        <h1 data-testid="top-title" className="page-title">{ pageTitle }</h1>
        <aside id="aside" className={ asideClass }>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-products"
              onClick={ handleOnClickAsideButton }
              value="Produtos"
            >
              Produtos
            </button>
          </div>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-my-orders"
              onClick={ handleOnClickAsideButton }
              value="Meus Pedidos"
            >
              Meus pedidos
            </button>
          </div>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-my-profile"
              onClick={ handleOnClickAsideButton }
              value="Meu Perfil"
            >
              Meu Perfil
            </button>
          </div>
          <div className="side-menu-container">
            <button
              type="button"
              data-testid="side-menu-item-logout"
              onClick={ handleOnClickAsideButton }
              value="Sair"
            >
              Sair
            </button>
          </div>
        </aside>
      </div>
      {/* </div> */}
    </header>
  );
}

TopMenu.propTypes = {
  pageTitle: propTypes.string.isRequired,
};
