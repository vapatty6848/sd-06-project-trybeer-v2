import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';

const SidebarMenuADM = () => {
  const { eraseLocalStorage, setVisibility } = useContext(TrybeerContext);

  return (
    <div className="admin-side-bar-container">
      <p>TryBeer</p>
      <Link to="/admin/orders">
        <button
          data-testid="side-menu-item-orders"
          type="button"
          onClick={ setVisibility }
        >
          Pedidos
        </button>
      </Link>
      <Link to="/admin/profile">
        <button
          data-testid="side-menu-item-profile"
          type="button"
          onClick={ setVisibility }
        >
          Perfil
        </button>
      </Link>
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
    </div>
  );
};

export default SidebarMenuADM;
