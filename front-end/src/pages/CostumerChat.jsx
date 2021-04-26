import React from 'react';
import ChatMessage from '../components/ChatMessage';
import MessageBox from '../components/MessageBox';
// import socket from '../utils/socketClient';

export default function CostumerChat() {
  return (
    <div>
      <MessageBox />
      <ChatMessage />
    </div>
  );
}
