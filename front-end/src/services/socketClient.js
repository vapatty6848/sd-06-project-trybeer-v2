import sockeClient from 'socket.io-client';

const baseUrl = 'http://localhost:3001';
const socket = sockeClient(baseUrl);

export default socket;
