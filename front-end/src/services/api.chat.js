import socketClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001';

const chat = socketClient(ENDPOINT);

export default chat;
