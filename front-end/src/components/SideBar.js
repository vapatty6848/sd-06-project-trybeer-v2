import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../App.css';

function SideBar({ title }) {
  return (
    <div className="adm-container">
      <nav className="adm-title">
        <h2 className="" data-testid="top-title">{title}</h2>
      </nav>
      <nav className="admin-side-bar-container">
        <div className="adm-navbar">
          <Link
            data-testid="side-menu-item-orders"
            className="adm-link"
            to="/admin/orders"
          >
            Pedidos
          </Link>
          <Link
            data-testid="side-menu-item-profile"
            className="adm-link"
            to="/admin/profile"
          >
            Perfil
          </Link>
          <Link
            data-testid="side-menu-item-logout"
            className="adm-link"
            to="/login"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Link>
        </div>
      </nav>
    </div>
  );
}

SideBar.propTypes = {
  title: propTypes.string.isRequired,
};

export default SideBar;
