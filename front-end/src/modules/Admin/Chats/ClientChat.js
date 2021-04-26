import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import Loader from '../../../design-components/Loader';
import SideBarAdmin from '../../../design-components/SideBarAdmin';
import api from '../../../axios/api';
import socket from '../../../utils/socketClient';

function ClientChat() {
  const { email } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const admin = JSON.parse(localStorage.getItem('user')).email;
  const timeFormated = (time) => {
    const maxtime = 9;
    const date = new Date(time);
    const hour = date.getHours();
    const hours = hour > maxtime ? hour : `0${hour}`;
    const minute = date.getMinutes();
    const minutes = minute > maxtime ? minute : `0${minute}`;
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`${socket.id}`);
    });
    api.get(`/admin/chats/search?q=${email}`).then((response) => {
      console.log(response.data);
      setMessages(response.data);
      setLoading(false);
    });
  }, [admin, email]);

  const handleClick = () => {
    const messageObj = {
      email,
      message,
      date: new Date(),
    };
    api.post('/chat', messageObj);
    setMessage('');
    setMessages([...messages, messageObj]);
    socket.emit('chatMessage', messageObj);
  };

  return (
    loading ? <Loader /> : (
      <div className="rounded-md shadow-sm space-y-4">
        <SideBarAdmin />
        <div className="text-center justify-content-center">
          <div className="flex content-center justify-center m-4">
            <Link data-testid="back-button" to="/admin/chats">
              <ChevronDoubleLeftIcon className="h-8 w-8" />
            </Link>
            <h3 className="text-xl ml-2 font-bold">
              {`Conversando com ${messages[0].email}`}
            </h3>
          </div>
          {messages.length !== 0 && messages.map((el, i) => (
            <div key={ i }>
              <div>
                <span data-testid="nickname" className="text-green-600">{el.email}</span>
                {' - '}
                <span data-testid="message-time">{timeFormated(el.date)}</span>
              </div>
              <p data-testid="text-message">{el.message}</p>
            </div>
          ))}
        </div>
        <div className="text-center justify-content-center">
          <input
            className="bg-gray-200 m-2"
            type="text"
            data-testid="message-input"
            value={ message }
            onChange={ (e) => setMessage(e.target.value) }
          />
          <button
            type="button"
            data-testid="send-message"
            onClick={ () => handleClick() }
          >
            Enviar
          </button>
        </div>
      </div>
    )
  );
}

export default ClientChat;
