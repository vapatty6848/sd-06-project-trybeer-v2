import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { profile } from '../api/index';
import AdminSideBar from '../components/AdminSideBar';
import '../css/AdminProfile.css';

function AdminOrders() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const user = await profile(localStorage.getItem('token'));
      if (!user) return history.push('/login');
      setName(user.name);
      setEmail(user.email);
    };
    fetchData();
  }, [history]);

  return (
    <div>
      <AdminSideBar />
      <section className="admin-profile-container">
        <h1>Perfil de adminstrador</h1>
        <div>
          <p data-testid="profile-name">
            {`Nome: ${name} `}
          </p>
          <p data-testid="profile-email">
            {`Email: ${email}`}
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminOrders;
