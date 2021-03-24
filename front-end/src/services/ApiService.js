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
      authorization: localStorage.getItem('token'),
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
      authorization: localStorage.getItem('token'),
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
      authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(order),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return newOrder;
};

const getOrders = async () => {
  const orders = await fetch(`${baseURL}orders`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return orders;
};

const getSales = async () => {
  const sales = await fetch(`${baseURL}sales`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return sales;
};

const getOrderDetails = async (id) => {
  const orders = await fetch(`${baseURL}details/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return orders;
};

const getSaleDetails = async (id) => {
  const salesDetail = await fetch(`${baseURL}adm/detail/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return salesDetail;
};

const updateStatus = async (id) => {
  const status = await fetch(`${baseURL}adm/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return status;
};

export default {
  login,
  getProducts,
  editName,
  register,
  registerOrder,
  getOrders,
  getOrderDetails,
  getSales,
  getSaleDetails,
  updateStatus,
};
