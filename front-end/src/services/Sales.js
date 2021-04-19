const { endpoint } = require('./utils');

const applicationJsonContent = 'application/json';

const postSale = (token, payload, products) => fetch(`${endpoint}/sales/checkout`, {
  method: 'post',
  headers: {
    'Content-type': applicationJsonContent,
    authorization: token,
  },
  body: JSON.stringify({ payload, products }),
})
  .then((response) => response.json());

const getAllSales = () => fetch(`${endpoint}/sales`)
  .then((response) => response.json());

const getSalesById = (id) => fetch(`${endpoint}/sales/${id}`)
  .then((response) => response.json());

const getSales = () => fetch(`${endpoint}/sales`)
  .then((response) => response.json());

const getAdminSaleDetails = async (id) => {
  const response = await fetch(`${endpoint}/sales/admin/details/${id}`);
  const result = await response.json();
  return result;
};

const fullfilSale = (id) => fetch(`${endpoint}/sales/admin/details/${id}`, {
  method: 'put',
}).then((response) => response.json());

module.exports = {
  getAdminSaleDetails,
  getSales,
  postSale,
  fullfilSale,
  getAllSales,
  getSalesById,
};
