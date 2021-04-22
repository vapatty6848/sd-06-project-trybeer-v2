import io from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Connect => a new connect'));

export default socket;
