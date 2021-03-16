import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuTop({ title }) {
  return (
    <div className="pos-f-t">
      <nav className="navbar navbar-dark bg-dark">
        <button
          className="navbar-toggler"
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
        <h2 data-testid="top-title">{title}</h2>
      </nav>

      <aside className="collapse side-menu-container" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <ul className="nav flex-column">
            <Link
              data-testid="side-menu-item-products"
              className="nav-link active"
              to="/products"
            >
              Produtos
            </Link>
            <Link
              data-testid="side-menu-item-my-orders"
              className="nav-link"
              to="/orders"
            >
              Meus Pedidos
            </Link>
            <Link
              data-testid="side-menu-item-my-profile"
              className="nav-link"
              to="/profile"
            >
              Meu Perfil
            </Link>
            <Link
              data-testid="side-menu-item-logout"
              className="nav-link disabled"
              to="/login"
            >
              Sair
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
}

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
