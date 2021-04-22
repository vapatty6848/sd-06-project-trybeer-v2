import React, { useState, useEffect, useContext } from 'react';
import BeersAppContext from '../context/BeersAppContext';
import socket from '../Socket.io/socket';

function AdminChat() {
  const {
    user
  } = useContext(BeersAppContext);

  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('openRoom', 'fgre@rfed.eff');
  }, []);
  
  useEffect(() => {
    socket.on('message', (messageParam) => { console.log('messageParam', messageParam) });
  }, [message]);

  return (
    <div>
      <h1>{`Conversando com`}</h1>
      {
        message.map(({ email, message, hour }) => (
          <div>
            <p>{`${email} - ${hour}`}</p>
            <p>{message}</p>
          </div>
        ))
      }
    </div>
  );
}

export default AdminChat;
