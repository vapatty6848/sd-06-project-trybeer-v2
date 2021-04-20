import API from '../axios';

export const post = (route, body = {}) => {
  const response = API.post(route, body)
    .then((res) => res.data)
    .catch((error) => error.response.data);

  return response;
};

export const update = (route, body = {}) => {
  const response = API.put(route, body)
    .then((res) => res.data)
    .catch((error) => error.response.data);

  return response;
};

export const get = (route, body = {}) => {
  const response = API.get(route, body)
    .then((res) => res.data)
    .catch((error) => error.response.data);

  return response;
};

export const remove = (route, body = {}) => {
  const response = API.delete(route, body)
    .then((res) => res.data)
    .catch((error) => error.response.data);

  return response;
};
