import axios from 'axios';

require('dotenv').config();

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const token = storage ? storage.token : false;

  try {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  } catch (err) {
    console.log('err', err);
  }
});

export default api;
