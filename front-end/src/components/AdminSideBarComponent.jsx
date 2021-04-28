import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BeersAppContext from '../context/BeersAppContext';
import '../style/SideBarAdmin.css';

function AdminSideBarComponent() {
  const history = useHistory();
  const {
    setUser,
  } = useContext(BeersAppContext);

  return (
    <div className="admin-side-bar-container">
      <h1>TryBeer</h1>
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => history.push('/admin/orders') }
      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => history.push('/admin/profile') }
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-chat"
        onClick={ () => history.push('/admin/chats') }
        // className="bttn_sidebar_admin_bottom"
      >
        Conversas
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => {
          setUser({});
          history.push('/login');
        } }
        className="bttn_sidebar_admin_bottom"
      >
        Sair
      </button>
    </div>
  );
}

export default AdminSideBarComponent;
