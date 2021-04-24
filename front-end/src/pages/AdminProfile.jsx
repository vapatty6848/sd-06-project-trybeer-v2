import React from 'react';
import { Redirect } from 'react-router';
import MenuTopAdmin from '../components/MenuTopAdmin';
import '../styles/adminProfile.css';

export default function AdminProfile() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Redirect to="login" />;

  return (
    <div className="main-container-adm">
      <div className="menu-top-adm">
        <MenuTopAdmin />
      </div>
      <div className="page-body-adm">
        <div className="page-title-adm">
          <h1>Perfil</h1>
        </div>
        <div className="main-page-adm form-group">
          <p
            className="form-control"
            data-testid="profile-name"
          >
            {`Nome: ${user.name}`}
          </p>
          <p
            className="form-control"
            data-testid="profile-email"
          >
            {`Email: ${user.email}`}
          </p>
        </div>
      </div>
    </div>
  );
}
