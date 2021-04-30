import io from 'socket.io-client';

const socket = io('https://main-group-6-back.herokuapp.com');
socket.on('connect', () => console.log('Connect => a new connect'));

export default socket;
