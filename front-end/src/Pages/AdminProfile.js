import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { SideBar } from '../components';
import '../App.css';

function AdminProfile({ history }) {
  const { validateToken, name, email } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar title="Perfil" />
      <form className="adm-body">
        <div className="form-inline">
          <p
            data-testid="profile-name"
            className="admin-profile name-admin"
          >
            {`Nome: ${name}`}
          </p>
        </div>
        <div className="form-inline">
          <p
            data-testid="profile-email"
            className="admin-profile"
          >
            {`Email: ${email}`}
          </p>
        </div>
      </form>
    </div>
  );
}

AdminProfile.defaultProps = {
  history: '/admin/orders',
};

AdminProfile.propTypes = {
  history: propTypes.shape(),
};

export default AdminProfile;
