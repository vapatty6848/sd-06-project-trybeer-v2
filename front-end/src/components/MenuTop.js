import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuTop({ title }) {
  return (
    <div id="content">
      <nav className="navbar navbar-dark bg-dark">
        <button
          className="btn btn-sm btn-outline-secondary"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
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
        <div className="col-2 navbar-dark bg-dark">
          <div
            className="nav flex-column nav-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <Link
              data-testid="side-menu-item-products"
              className="nav-link active mt-5"
              to="/products"
              role="tab"
            >
              Produtos
            </Link>
            <Link
              data-testid="side-menu-item-my-orders"
              className="nav-link mt-3"
              to="/orders"
              role="tab"
            >
              Meus Pedidos
            </Link>
            <Link
              data-testid="side-menu-item-my-profile"
              className="nav-link mt-3"
              to="/profile"
              role="tab"
            >
              Meu Perfil
            </Link>
            <Link
              data-testid="side-menu-item-logout"
              className="nav-link disabled my-5"
              to="/login"
              role="tab"
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
