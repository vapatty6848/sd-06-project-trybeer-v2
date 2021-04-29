import React from 'react';
import AdminChatCard from '../components/AdminChatCard';
import TopMenuAdmin from '../components/TopMenuAdmin';

export default function CostumerChatAdmin() {
  return (
    <div>
      <TopMenuAdmin pageTitle="Conversas" />
      <AdminChatCard />
    </div>
  );
}
