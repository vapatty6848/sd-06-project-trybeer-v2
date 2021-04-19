import * as axiosHandler from 'axios';

const buildAxiosHandler = () => {
  const axios = axiosHandler.create({
    baseURL: 'http://localhost:3001',
  });

  return axios;
};

function login(user) {
  const axios = buildAxiosHandler();

  return axios.post('/login', user);
}

function profile(token) {
  const axios = buildAxiosHandler();

  return axios.get('/user/profile', {
    headers: { authorization: token },
  }).then((response) => response.data)
    .catch((err) => console.log(err));
}

function register(user) {
  const axios = buildAxiosHandler();
  const result = axios.post('/user', user)
    .catch((err) => {
      if (err.response) {
        const time = 3000;
        const elem = document.createElement('h3');
        elem.innerHTML = err.response.data.message;
        document.querySelector('.register-page').append(elem);
        setTimeout(() => elem.remove(elem), time);
      }
    });

  return result;
}

function updateName(name, id) {
  const axios = buildAxiosHandler();

  return axios.put(`/user/${id}`,
    { name },
    { headers: { Authorization: localStorage.token } });
}

async function getProducts(setProducts) {
  const axios = buildAxiosHandler();
  const token = localStorage.getItem('token');
  axios.get('/products', {
    headers: {
      authorization: token,
    } }).then((response) => setProducts(response.data));
}

async function checkout(params) {
  const { userId, totalPrice, address, number, items } = params;
  const axios = buildAxiosHandler();
  const token = localStorage.getItem('token');

  axios.post('/sales/checkout',
    { userId, totalPrice, address, number, items },
    { headers: { authorization: token } });
}

async function getOrders(setOrders) {
  const axios = buildAxiosHandler();
  const token = localStorage.getItem('token');
  axios.get('/sales', {
    headers: {
      authorization: token,
    } }).then((response) => setOrders(response.data));
}

async function getproductsBySaleId(setProductsOrder, saleId) {
  const axios = buildAxiosHandler();
  const token = localStorage.getItem('token');
  axios.get(`/sales/products/${saleId}`, {
    headers: {
      authorization: token,
    } }).then((response) => setProductsOrder(response.data.products));
}

async function getSalesProductsBySaleId(setSaleDetail, saleId) {
  const axios = buildAxiosHandler();
  const token = localStorage.getItem('token');
  const status = 'Entregue';
  await axios.get(`/sales/products/${saleId}`, {
    headers: {
      authorization: token,
    } }).then((response) => setSaleDetail(response.data));
  await axios.put(`/sales/status/${saleId}`, { status });
}

export {
  checkout,
  getProducts,
  login,
  profile,
  register,
  updateName,
  getOrders,
  getproductsBySaleId,
  getSalesProductsBySaleId,
};
