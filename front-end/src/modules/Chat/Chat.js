import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import Loader from '../../design-components/Loader';
import TopBar from '../../design-components/TopBar';
import api from '../../axios/api';
import runtimeEnv from '@mars/heroku-js-runtime-env' ; 
const env = runtimeEnv(); 

const socket = io(env.REACT_APP_BASE_URL);

function Chat() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')).email;
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
    api.get('/chat', {
      headers: {
        email: user,
      },
    }).then((response) => {
      console.log(response.data);
      setMessages(response.data);
      setLoading(false);
    });
  }, [user]);

  const handleClick = () => {
    const messageObj = {
      email: user,
      message,
      date: new Date(),
    };
    api.post('/chat', messageObj);
    setMessage('');
    setMessages([...messages, messageObj]);
    // io.emit('message', messageObj)
  };

  return (
    loading ? <Loader /> : (
      <div className="rounded-md shadow-sm space-y-4">
        <TopBar
          title="Chat"
          data-testid="top-title"
        />
        <div className="text-center justify-content-center">
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

export default Chat;
