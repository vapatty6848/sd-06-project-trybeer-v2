import axios from 'axios';

const path = 'http://localhost:3001';

const config = (token) => ({ headers: { authorization: token },
  'Content-Type': 'application/json' });

const fetchUserByEmail = async (email, password, token) => {
  try {
    const user = await axios.post(`${path}/login`,
      { email, password },
      config(token));
    return user.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchAllProducts = async () => {
  try {
    const products = await axios.get(`${path}/products`);
    return products;
  } catch (error) {
    console.error(error);
  }
};

const updateUserName = async (email, name) => {
  await axios.put(`${path}/profile`, { email, name });
};

const createUser = async (email, name, password, role) => {
  const newUserToken = await axios
    .post(`${path}/register`, { email, name, password, role });
  return newUserToken.data;
};

const createOrder = async (token, objOrder) => {
  const newOrder = await axios.post(`${path}/orders`,
    { objOrder },
    config(token));
  return newOrder.data;
};

const getSales = async (token) => {
  const sales = await axios.get(`${path}/orders`,
    config(token));
  // console.log('fetches', sales);
  return sales;
};

const getSaleById = async (token, pathName) => {
  const sale = await axios.get(`${path}${pathName}`,
    config(token));
  return sale;
};

const getAllSales = async (token) => {
  const allSales = await axios.get(`${path}/admin/orders`,
    config(token));
  return allSales;
};

const updateSale = async (token, adminPathName) => {
  try {
    await axios.put(`${path}${adminPathName}`,
      {},
      config(token));
  } catch (error) {
    console.log(error);
  }
};

export default {
  fetchUserByEmail,
  updateUserName,
  fetchAllProducts,
  createUser,
  createOrder,
  getSales,
  getSaleById,
  getAllSales,
  updateSale,
};
