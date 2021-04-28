import socketClient from 'socket.io-client';

<<<<<<< HEAD
const ENDPOINT = process.env.REACT_APP_ENDPOINT
  || 'http://localhost:4001';

const chat = socketClient(ENDPOINT);
=======
const chat = (ENDPOINT, options) => socketClient(ENDPOINT, options);
>>>>>>> 6d1445ee553f20ab587eeaa21ddb73ada415aacd

export default chat;
