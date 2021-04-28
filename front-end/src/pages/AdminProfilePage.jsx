import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AdminSideBarComponent from '../components/AdminSideBarComponent';
import BeersAppContext from '../context/BeersAppContext';
import '../style/AdminProfile.css';

function AdminProfilePage() {
  const history = useHistory();
  const {
    user: { name, email, token },
  } = useContext(BeersAppContext);

  if (!token) history.push('/login');

  return (
    <div>
      <AdminSideBarComponent />
      <div className="admin_profile">
        <p data-testid="profile-name">
          Nome:
          <span>{ name }</span>
        </p>
        <p data-testid="profile-email">
          Email:
          <span>{ email }</span>
        </p>
      </div>
    </div>
  );
}

export default AdminProfilePage;
