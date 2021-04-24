const URL_CHAT = 'http://localhost:3001/chat';

// const headerType = { 'Content-Type': 'application/json' };

export const findUsers = async () => fetch(`${URL_CHAT}`, {
  method: 'GET',
}).then((response) => response.json());

export const getMessages = async (id) => fetch(`http://localhost:3001/chat/${id}`, {
  method: 'GET',
}).then((response) => response.json());

export const beleza = 'blz';
