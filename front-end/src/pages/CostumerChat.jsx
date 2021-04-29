import React from 'react';
import ChatMessage from '../components/ChatMessage';
import MessageBox from '../components/MessageBox';
import TopMenu from '../components/TopMenu';
// import socket from '../utils/socketClient';

export default function CostumerChat() {
  return (
    <div>
      <TopMenu pageTitle="Chat" />
      <MessageBox />
      <ChatMessage />
    </div>
  );
}
