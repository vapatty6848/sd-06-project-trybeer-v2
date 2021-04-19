import axios from 'axios';

const ORDER_NOT_FOUND = 'ops! order not found';

export const loginUser = async (email, password) => {
  const user = await axios({
    method: 'POST',
    url: 'http://localhost:3001/login',
    data: {
      email,
      password,
    },
  }).then((res) => res.data.user)
    .catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });

  return user;
};

export const registerNewUser = async (name, email, password, role) => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:3001/register',
    data: {
      name,
      email,
      password,
      role,
    },
  }).then((res) => res.data.message)
    .catch((err) => err.response.data.message);

  return response;
};

export const updateUser = async (name, email, token) => {
  const response = await axios({
    method: 'PUT',
    url: 'http://localhost:3001/profile/edit',
    data: {
      name,
      email,
      token,
    },
  }).then((res) => res.data)
    .catch((err) => err.response.data);

  return response;
};

export const updateStatus = async (id) => {
  const response = await axios({
    method: 'PUT',
    url: `http://localhost:3001/admin/orders/${id}`,
  }).then((res) => res.data)
    .catch((err) => err.response.data);

  return response;
};

export const findAllProducts = async () => {
  const products = await axios({
    url: 'http://localhost:3001/products',
  }).then((res) => res.data)
    .catch(() => {
      console.error('ops! products not found');
    });

  return products;
};

export const registerOrder = async (infosOrder) => {
  const order = await axios.post('http://localhost:3001/orders', infosOrder)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`ops! ocorreu um erro${err}`);
    });

  return order;
};

export const getAllOrders = async (email) => {
  const orders = await axios({
    url: `http://localhost:3001/orders/${email}`,
  }).then((res) => res.data)
    .catch(() => {
      console.error(ORDER_NOT_FOUND);
    });

  return orders;
};

export const getOrderDetails = async (id) => {
  const order = await axios({
    url: `http://localhost:3001/orderdetails/${id}`,
  }).then((res) => res.data)
    .catch(() => {
      console.error(ORDER_NOT_FOUND);
    });

  return order;
};

export const getAllAdminOrders = async () => {
  const orders = await axios({
    url: 'http://localhost:3001/admin/orders',
  }).then((res) => res.data)
    .catch(() => {
      console.error(ORDER_NOT_FOUND);
    });

  return orders;
};

export const getAdminOrderById = async (id) => {
  const orders = await axios({
    url: `http://localhost:3001/admin/orders/${id}`,
  }).then((res) => res.data)
    .catch(() => {
      console.error(ORDER_NOT_FOUND);
    });

  return orders;
};
