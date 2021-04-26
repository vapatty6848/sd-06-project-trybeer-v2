import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/menuTopBar.css';

export default function MenuTop(props) {
  const { title } = props;
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(!isVisible);
  }

  return (
    <div>
      <div className="top-bar">
        <div className="button-title">
          <button
            type="button"
            data-testid="top-hamburguer"
            className="btn btn-danger"
            onClick={ handleClick }
          >
            &#9776;
          </button>
        </div>
        <div className="h1-title">
          <h1 data-testid="top-title">{title}</h1>
        </div>
      </div>
      <div className="menu-side-bar">
        {isVisible && (
          <div className="row side-menu-container">
            <div className="col-3">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link btn btn-danger"
                  to="/products"
                  data-testid="side-menu-item-products"
                >
                  Produtos
                </Link>
                <Link
                  className="nav-link btn btn-danger"
                  to="/orders"
                  data-testid="side-menu-item-my-orders"
                >
                  Meus Pedidos
                </Link>
                <Link
                  className="nav-link btn btn-danger"
                  to="/chat"
                  data-testid="side-menu-chat"
                >
                  Conversar com a loja
                </Link>
                <Link
                  className="nav-link btn btn-danger"
                  to="/profile"
                  data-testid="side-menu-item-my-profile"
                >
                  Meu Perfil
                </Link>
                <Link
                  className="nav-link btn btn-danger"
                  to="/login"
                  data-testid="side-menu-item-logout"
                >
                  Sair
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};
