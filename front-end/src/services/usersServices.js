const headerType = { 'Content-Type': 'application/json' };

const URL_USERS = 'http://localhost:3001/users';

export const getToken = async (token) => fetch(URL_USERS, {
  method: 'GET',
  headers: {
    authorization: token,
  },
}).then((response) => response.json());

export const changeName = async (data) => fetch(`${URL_USERS}/edit`, {
  method: 'PUT',
  headers: headerType,
  body: JSON.stringify(data),
}).then((response) => response.json());

export const registerUser = async (user) => fetch(`${URL_USERS}/register`, {
  method: 'POST',
  headers: headerType,
  body: JSON.stringify(user),
}).then((response) => response.json());

export const getUserByEmail = async (email) => fetch(URL_USERS, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
}).then((response) => response.json());

export const getAllUsers = () => fetch(URL_USERS)
  .then((response) => response.json());
