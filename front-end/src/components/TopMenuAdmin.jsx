import React from 'react';
import propTypes from 'prop-types';
import './componentsCSS/TopMenu.css';
import { useHistory } from 'react-router-dom';

export default function TopMenuAdmin({ pageTitle }) {
  const history = useHistory();

  const handleClick = (e) => {
    if (e.target.value === 'Pedidos') {
      history.push('/admin/orders');
    }
    if (e.target.value === 'Perfil') {
      history.push('/admin/profile');
    }
    if (e.target.value === 'Sair') {
      localStorage.setItem('token', '');
      history.push('/login');
    }
  };

  return (
    <aside className="admin-side-bar-container">
      <h1 data-testid="top-menu">{pageTitle}</h1>
      <button
        type="button"
        data-testid="side-menu-item-orders"
        value="Pedidos"
        onClick={ handleClick }
      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        value="Perfil"
        onClick={ handleClick }
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        value="Sair"
        onClick={ handleClick }
      >
        Sair
      </button>
    </aside>
  );
}

TopMenuAdmin.propTypes = {
  pageTitle: propTypes.string.isRequired,
};
