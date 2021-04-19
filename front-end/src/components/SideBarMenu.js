import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

const SidebarMenu = () => {
  const { eraseLocalStorage, isVisible, setVisibility } = useContext(TrybeerContext);

  return (
    <div>
      {
        isVisible && (
          <div className="side-menu-container">
            <div className="side-menu-main-options">
              <Link to="/products">
                <button
                  data-testid="side-menu-item-products"
                  type="button"
                  onClick={ setVisibility }
                >
                  Produtos
                </button>
              </Link>
              <Link to="/orders">
                <button
                  data-testid="side-menu-item-my-orders"
                  type="button"
                  onClick={ setVisibility }
                >
                  Meus Pedidos
                </button>
              </Link>
              <Link to="/profile">
                <button
                  data-testid="side-menu-item-my-profile"
                  type="button"
                  onClick={ setVisibility }
                >
                  Meu Perfil
                </button>
              </Link>
            </div>
            <Link to="/login" className="justify-at-the-end">
              <button
                className="justify-at-the-end"
                data-testid="side-menu-item-logout"
                type="button"
                onClick={ () => {
                  eraseLocalStorage();
                } }
              >
                Sair
              </button>
            </Link>
          </div>)
      }
    </div>
  );
};

export default SidebarMenu;
