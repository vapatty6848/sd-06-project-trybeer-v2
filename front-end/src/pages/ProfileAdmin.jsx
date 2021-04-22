import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuSideBar from '../components/menuAdmin/MenuSideBar';

function ProfileAdmin({ history }) {
  useEffect(() => {
    if (!localStorage.user) {
      history.push('/login');
    }
    const admin = JSON.parse(localStorage.getItem('user'));
    const { token } = admin;
    if (!token) {
      history.push('/login');
    }
  }, [history]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user.name;
  const userEmail = user.email;

  return (
    <div>
      <MenuSideBar />
      <h1>Perfil</h1>
      <p>Email:</p>
      <p data-testid="profile-email">{ userEmail }</p>
      <p>Nome:</p>
      <p data-testid="profile-name">{ userName }</p>
    </div>
  );
}

ProfileAdmin.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default ProfileAdmin;
