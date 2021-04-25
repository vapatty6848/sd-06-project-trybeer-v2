import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/menuTopAdmin.css';

export default function MenuTopAdmin() {
  return (
    <div className="container-adm">
      <div className="title-adm">
        <h1 data-testid="top-title">Trybeer</h1>
      </div>
      <div className="admin-side-bar-container">
        <div className="main-link-adm">
          <div className="link-first-adm">
            <Link
              to="/admin/orders"
              data-testid="side-menu-item-orders"
              className="btn btn-danger"
            >
              Meus Pedidos
            </Link>
            <Link
              to="/admin/profile"
              data-testid="side-menu-item-profile"
              className="btn btn-danger"
            >
              Meu Perfil
            </Link>
            <Link
              to="/admin/chats"
              data-testid="side-menu-item-chat"
              className="btn btn-danger"
            >
              Conversas
            </Link>
          </div>
          <div className="link-second-adm">
            <Link
              to="/login"
              data-testid="side-menu-item-logout"
              className="btn btn-danger"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
