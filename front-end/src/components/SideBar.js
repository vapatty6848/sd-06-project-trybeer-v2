import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

function SideBar() {
  const history = useHistory();

  const handleClickSair = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('totalCart');
    history.push('/login');
  };

  return (
    <div className="side-menu-container">
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Produtos"
        dataTestid="side-menu-item-products"
        handleClick={ () => history.push('/products') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Meus Pedidos"
        dataTestid="side-menu-item-my-orders"
        handleClick={ () => history.push('/orders') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Meu Perfil"
        dataTestid="side-menu-item-my-profile"
        handleClick={ () => history.push('/profile') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Conversar com a loja"
        dataTestid="side-menu-chat"
        handleClick={ () => history.push('/chat') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-dark width-med margin-med align-bot"
        title="Sair"
        dataTestid="side-menu-item-logout"
        handleClick={ handleClickSair }
        btnDisable={ false }
      />
    </div>
  );
}

export default SideBar;
