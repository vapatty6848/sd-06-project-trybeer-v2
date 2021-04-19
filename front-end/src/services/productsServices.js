const headerType = { 'Content-Type': 'application/json' };

const URL_PRODUCTS = 'http://localhost:3001/products';

const getAllProducts = async () => fetch(URL_PRODUCTS, {
  method: 'GET',
  headers: headerType,
}).then((response) => response.json());

export default getAllProducts;
