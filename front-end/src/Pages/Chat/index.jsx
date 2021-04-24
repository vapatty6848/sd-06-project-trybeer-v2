import React, { useEffect, useState } from 'react';

import { saveMessage } from '../../Services/Apis';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const dataStorage = localStorage.getItem('user');
    const { email, role } = JSON.parse(dataStorage);

    setEmail(email);
    setRole(role)
  }, []);

  const generateTimeStamp = () => {
    const dateOptions = Intl.DateTimeFormat(
      'en-gb',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
    ).formatToParts(new Date());
    const dateParts = {};
  
    dateOptions.forEach(({ type, value }) => {
      dateParts[type] = value;
    });
  
    const { hour, minute } = dateParts;
  
    return `${hour}:${minute}`;
  };

  const renderMessage = (timestamp) => {
    const ul = document.getElementById('messages-container')
    const li = document.createElement('li');

    const emailSpan = document.createElement('span');
    emailSpan.setAttribute('data-testid', 'nickname');
    emailSpan.innerText = email;

    const timeSpan = document.createElement('span');
    timeSpan.setAttribute('data-testid', 'message-time');
    timeSpan.innerText = timestamp;

    const messageSpan = document.createElement('p');
    messageSpan.setAttribute('data-testid', 'text-message');
    messageSpan.innerText = message;

    const lineSpan = document.createElement('span');
    lineSpan.innerText = ' - ';

    li.appendChild(emailSpan);
    li.appendChild(lineSpan);
    li.appendChild(timeSpan);
    li.appendChild(messageSpan);
    ul.appendChild(li);
  };

  const handleSendMessage = () => {
    const timestamp = generateTimeStamp();
    saveMessage(message, email, timestamp, role);

    renderMessage(timestamp);
    setMessage('');
  };

  return (
    <div>
      <ul id="messages-container">
      </ul>
      <form>
        <input
          type="text"
          value={ message }
          onChange={ ({ target: { value } }) => setMessage(value) }
          data-testid="message-input"
        />
        <button
          type="button"
          onClick={ handleSendMessage }
          data-testid="send-message"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
