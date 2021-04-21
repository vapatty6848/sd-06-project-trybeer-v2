import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

function MenuAdmin() {
  const history = useHistory();

  const handleClickSair = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('totalCart');
    history.push('/login');
  };

  return (
    <div className="admin-side-bar-container">
      <div className="align-center">
        <h1>Trybeer</h1>
        <h3>Admin</h3>
      </div>
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Meus Pedidos"
        dataTestid="side-menu-item-orders"
        handleClick={ () => history.push('/admin/orders') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Meu Perfil"
        dataTestid="side-menu-item-profile"
        handleClick={ () => history.push('/admin/profile') }
        btnDisable={ false }
      />
      <Button
        className="btn-login btn btn-success width-med margin-med"
        title="Conversas"
        dataTestid="side-menu-item-chat"
        handleClick={ () => history.push('/admin/chats') }
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

export default MenuAdmin;
