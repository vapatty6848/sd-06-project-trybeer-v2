import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuTop({ title }) {
  return (
    <div id="content">
      <nav className="navbar navbar-dark menu-top-nav">
        <button
          className="btn btn-sm btn-outline-secondary dropdown-toggle"
          id="dropdownMenu2"
          type="button"
          data-toggle="dropdown"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-testid="top-hamburguer"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <h2 className="navbar-text" data-testid="top-title">{title}</h2>
      </nav>
      <nav
        id="navbarToggleExternalContent"
        className="row collapse side-menu-container"
      >
        <div className="col-2" id="dropdownMenu2">
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            aria-orientation="vertical"
          >
            <Link
              data-testid="side-menu-item-products"
              className="dropdown-item active mb-3"
              to="/products"
              // role="tab"
            >
              Produtos
            </Link>
            <Link
              data-testid="side-menu-item-my-orders"
              className="dropdown-item my-3"
              to="/orders"
              // role="tab"
            >
              Meus Pedidos
            </Link>
            <Link
              data-testid="side-menu-item-my-profile"
              className="dropdown-item my-3"
              to="/profile"
              // role="tab"
            >
              Meu Perfil
            </Link>
            <Link
              data-testid="side-menu-item-logout"
              className="dropdown-item disabled mt-4"
              to="/login"
              role="tab"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
