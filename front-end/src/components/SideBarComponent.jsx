import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BeersAppContext from '../context/BeersAppContext';
import '../style/SideBarCostumer.css';

function SideBarComponent() {
  const history = useHistory();
  const {
    setUser,
    setProductQuantity,
    setAmount,
  } = useContext(BeersAppContext);

  return (
    <div className="side-menu-container">
      <button
        type="button"
        data-testid="side-menu-item-products"
        onClick={ () => history.push('/products') }
      >
        Produtos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-orders"
        onClick={ () => history.push('/orders') }
      >
        Meus Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-profile"
        onClick={ () => history.push('/profile') }
      >
        Meu Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-chat"
        onClick={ () => history.push('/chat') }
      >
        Conversar com a loja
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        className="side-menu-container-logout"
        onClick={ () => {
          setUser({});
          setProductQuantity([]);
          setAmount(0.00);
          history.push('/login');
        } }
      >
        Sair
      </button>
    </div>
  );
}

export default SideBarComponent;
