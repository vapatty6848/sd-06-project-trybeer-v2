import React from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import AdminListChats from '../components/AdminListChats';

function AdminChat() {
  try {
    JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <MenuTop title="Trybeer" />
        <h1>Conversas</h1>
        <AdminListChats />
      </div>
    );
  } catch (err) {
    return <Redirect to="/login" />;
  }
}

export default AdminChat;
