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

const fetchChangeStatus = async (idModified) => {
  const data = { id: idModified };
  await fetch('http://localhost:3001/changeStatus', {
    method: 'PUT',
    headers: contentType,
    body: JSON.stringify(data),
  });
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
};
