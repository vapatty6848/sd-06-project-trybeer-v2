import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { redirectMenuBar } from '../../services/index';

function SideBar() {
  const history = useHistory();
  return (
    <div className="side-menu-container">
      <button
        data-testid="side-menu-item-products"
        onClick={ () => redirectMenuBar(history, '/products') }
        type="button"
      >
        Produtos
      </button>
      <button
        data-testid="side-menu-item-my-orders"
        onClick={ () => redirectMenuBar(history, '/orders') }
        type="button"
      >
        Meus Pedidos
      </button>
      <button
        data-testid="side-menu-item-my-profile"
        onClick={ () => redirectMenuBar(history, '/profile') }
        type="button"
      >
        Meu Perfil
      </button>
      <Link to="/login">
        <button
          data-testid="side-menu-item-logout"
          type="button"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default SideBar;
