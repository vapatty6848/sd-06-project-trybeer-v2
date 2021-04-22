const URL_CHAT = 'http://localhost:3001/chat';

const headerType = { 'Content-Type': 'application/json' };

export const createMessage = async (data) => fetch(`${URL_CHAT}`, {
  method: 'POST',
  headers: headerType,
  body: JSON.stringify(data),
}).then((response) => response.json());

export const beleza = 'blz';
