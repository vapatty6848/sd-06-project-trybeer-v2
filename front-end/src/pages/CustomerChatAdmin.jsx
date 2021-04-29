import React from 'react';
import AdminChatCard from '../components/AdminChatCard';
import ChatMessage from '../components/ChatMessage';
import TopMenuAdmin from '../components/TopMenuAdmin';

export default function CostumerChatAdmin() {
  return (
    <div>
      <TopMenuAdmin pageTitle="Conversas" />
      <ChatMessage />
      <AdminChatCard />
    </div>
  );
}
