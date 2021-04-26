const contentType = {
  'Content-Type': 'application/json',
};

const fetchLogin = async (email, password) => {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
  // if (response.message) return false;
  return response;
};

const fetchRegister = async (name, email, password, check) => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({
      name,
      email,
      password,
      role: (check ? 'administrator' : 'client') }),
  }).then((res) => res.json());

  if (response.message) return false;
  return response;
};

const fetchProducts = async () => {
  const response = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers: contentType,
    body: JSON.stringify(),
  }).then((res) => res.json());

  if (response.message) return false;
  return response;
};

const fetchChangeName = async (name, email) => {
  await fetch('http://localhost:3001/changeName', {
    method: 'PUT',
    headers: contentType,
    body: JSON.stringify({
      name,
      email,
    }),
  });
};

const fetchAddSale = async (sale) => {
  const { userId, total, street, number, data, status } = sale;
  const response = await fetch('http://localhost:3001/checkout', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify({
      userId,
      total,
      street,
      number,
      data,
      status,
    }),
  }).then((res) => res.json());

  return response.saleId;
};

const fetchAddSaleProduct = async (salesProducts) => {
  await fetch('http://localhost:3001/saleProduct', {
    method: 'POST',
    headers: contentType,
    body: JSON.stringify(salesProducts),
  });
};

const fetchSales = async () => {
  const response = await fetch('http://localhost:3001/saleProduct', {
    method: 'GET',
    headers: contentType,
    body: JSON.stringify(),
  }).then((res) => res.json());
  if (response.message) return false;
  return response;
};

const fetchAllOrders = async () => {
  const allOrders = await fetch('http://localhost:3001/adminOrders', {
    method: 'GET',
    headers: contentType,
    body: JSON.stringify(),
  }).then((res) => res.json());
  return allOrders;
};

const fetchSaleProduct = async (id) => {
  const productsOfSale = await fetch(`http://localhost:3001/orderDetails/${id}`, {
    method: 'GET',
    headers: contentType,
    body: JSON.stringify(),
  }).then((res) => res.json());
  return productsOfSale;
};

const fetchChangeStatus = async (idModified, status) => {
  const data = { id: idModified, status };
  await fetch('http://localhost:3001/changeStatus', {
    method: 'PUT',
    headers: contentType,
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const fetchChat = async (email) => {
  const result = await fetch('http://localhost:3001/getchat', {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    body: JSON.stringify({ email }),
  }).then((res) => res.json());
  return result;
};

const fetchAllChat = async () => {
  const result = await fetch('http://localhost:3001/getallchat', {
    method: 'GET',
    headers: contentType,
    body: JSON.stringify(),
  }).then((res) => res.json());
  return result;
};

module.exports = {
  fetchLogin,
  fetchRegister,
  fetchProducts,
  fetchChangeName,
  fetchAddSale,
  fetchAddSaleProduct,
  fetchSales,
  fetchAllOrders,
  fetchSaleProduct,
  fetchChangeStatus,
  fetchChat,
  fetchAllChat,
};
