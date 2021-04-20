const axios = require('axios');

const baseUrl = 'http://localhost:3001';

const generateToken = async (email, password) => axios
  .post(`${baseUrl}/login`, {
    email,
    password,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const registerUser = async (name, email, password, role) => axios
  .post(`${baseUrl}/user`, {
    name,
    email,
    password,
    role,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const updateNameOfUser = async (name, email) => axios
  .put(`${baseUrl}/user`, {
    name,
    email,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => err.response.data);

const getAllProducts = async (token) => axios
  .get(`${baseUrl}/products`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getAllOrders = async (token) => axios
  .get(`${baseUrl}/orders/admin`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getAllOrdersByUser = async (token) => axios
  .get(`${baseUrl}/orders`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const getOrdersById = async (token, id) => axios
  .get(`${baseUrl}/orders/${id}`, {
    headers: {
      authorization: token,
    },
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const updateStatusOrder = async (status, id) => axios
  .put(`${baseUrl}/orders/${id}`, {
    status,
  })
  .then((res) => res.data)
  .catch((err) => err.response.data);

const regSalesProducts = async (params) => axios
  .post(`${baseUrl}/sales/products`, {
    idSale: params.idSale,
    idProduct: params.idProduct,
    quantity: params.quantity,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response.data, result: false }));

const registerSales = async (params) => axios
  .post(`${baseUrl}/sales`, {
    userId: params.userId,
    total: params.total,
    address: params.address,
    adNumber: params.adNumber,
    date: params.date,
    status: params.status,
  })
  .then((res) => ({ response: res.data, result: true }))
  .catch((err) => ({ response: err.response, result: false }));

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  updateNameOfUser,
  regSalesProducts,
  getAllProducts,
  generateToken,
  registerSales,
  getOrdersById,
  registerUser,
  getAllOrders,
};
