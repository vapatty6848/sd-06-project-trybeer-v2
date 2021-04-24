import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import socket from '../Socket.io/socket';

function AdminWebChat() {
  const { email: emailRoute } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('openRoom', emailRoute);
    // 'fgre@rfed.eff'
  }, []);

  useEffect(() => {
    socket.on('message', (messageParam) => {
      console.log('messageParam', messageParam);
    });
  }, [messages]);

  const five = 5;

  return (
    <div>
      <h1>{ `Conversando com ${emailRoute}` }</h1>
      {
        messages.map(({ email, message, date }, index) => (
          <div key={ index }>
            <p>{ `${email} - ${date.toLocaleTimeString().substring(0, five)}` }</p>
            <p>{ message }</p>
          </div>
        ))
      }
    </div>
  );
}

export default AdminWebChat;
