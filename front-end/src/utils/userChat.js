import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';

const useChat = (email) => {
  // guarda msg e altera msgs
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  // socket de referencia só muda se eu quiser
  useEffect(() => {
    socketRef.current = socketClient('http://localhost:3001', { query: email });
    socketRef.current.on('chat:SendMessage', (message) => {
      setMessages([...messages, message]);
    });
    // colocando mesg nova no estado
    return () => {
      socketRef.current.disconnect();
    };
  }, [email, messages]);
  const sendMessage = (message) => {
    socketRef.current.emit('chat:sendMessage', {
      email,
      sentAt: new Date(),
      message,
      socket: socketRef.current,
    });
  };
  return { messages, sendMessage };
};
export default useChat;
// retorna as msg e a função para colocar as novas
