const baseURL = 'http://localhost:3001/';
const contentType = 'application/json';

const login = async (email, password) => {
  const jsonWebToken = await fetch(`${baseURL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return jsonWebToken;
};

const getProducts = async () => {
  const allProducts = await fetch(`${baseURL}products`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return allProducts;
};

const editName = async (name, email) => {
  const jsonWebToken = await fetch(`${baseURL}profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify({ name, email }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return jsonWebToken;
};

const register = async (name, email, password, role) => {
  const newUser = await fetch(`${baseURL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify({ name, email, password, role }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return newUser;
};

const registerOrder = async (order) => {
  const newOrder = await fetch(`${baseURL}sale/register`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(order),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return newOrder;
};

const getOrders = async () => {
  const orders = await fetch(`${baseURL}sale/register`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return orders;
};

export default { login, getProducts, editName, register, registerOrder, getOrders };
