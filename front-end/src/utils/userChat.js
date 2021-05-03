import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';

const useChat = (email) => {
  // guarda msg e altera msgs
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  // socket de referencia só muda se eu quiser
  useEffect(() => {
    socketRef.current = socketClient('http://localhost:3001', { query:{ Idemail: email }});
    socketRef.current.on(email, (message) => {
      console.log('linha 11g', message)
      setMessages([...messages, message]);
    });
    console.log('aqui')
    // colocando mesg nova no estado
    return () => {
      socketRef.current.disconnect();
    };
  }, [email, messages]);

  const sendMessage = (message) => {
    console.log('userChat l23', message)
    socketRef.current.emit('chat:sendMessage', {
      email,
      sentAt: new Date(),
      message,
      // socket: socketRef.current,
    });
  };
  return { messages, sendMessage };
};

export default useChat;
// retorna as msg e a função para colocar as novas
