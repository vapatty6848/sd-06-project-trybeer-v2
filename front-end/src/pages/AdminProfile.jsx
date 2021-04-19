import React from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import TopMenuAdmin from '../components/TopMenuAdmin';

export default function AdminProfile() {
  const history = useHistory();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const handleName = () => {
    if (tokenFromLocalStorage) {
      const tokenDecoded = jwtDecode(tokenFromLocalStorage);
      return tokenDecoded.name;
    }
  };

  const handleEmail = () => {
    if (tokenFromLocalStorage) {
      const tokenDecoded = jwtDecode(tokenFromLocalStorage);
      return tokenDecoded.email;
    }
  };
  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      {handleRedirect(tokenFromLocalStorage)}
      <TopMenuAdmin pageTitle="TryBeer" />
      <div>
        <span data-testid="profile-name">{`Nome: ${handleName()}`}</span>
      </div>
      <div>
        <span data-testid="profile-email">{`Email: ${handleEmail()}`}</span>
      </div>
    </div>
  );
}
