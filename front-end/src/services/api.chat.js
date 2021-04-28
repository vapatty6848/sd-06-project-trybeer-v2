import socketClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_ENDPOINT
  || 'http://localhost:4001';

const chat = socketClient(ENDPOINT);

export default chat;
