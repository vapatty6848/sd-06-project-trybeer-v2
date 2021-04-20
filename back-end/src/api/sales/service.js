const model = require('./model');

// GET ALL --------------------------------------------------------------------
const getAll = async ({ user }) => {
  const { role, id } = user;
  
  const sales = role === 'administrator'
    ? await model.findAll()
    : await model.findByUserId(id);

  if (!sales) return ({ status: 500, payload: 'Internal error.' });
  
  return ({ status: 200, payload: sales });
};

// GET SALE BY SALE ID --------------------------------------------------------
const getById = async ({ params }) => {
  const { id } = params;

  const sale = await model.findOne('id', id);

  if (!sale) return ({ status: 401, payload: 'Not found.' });

  return ({ status: 200, payload: sale });
};

// UPDATE STATUS --------------------------------------------------------
const update = async ({ params }) => {
  const { id } = params;

  const sale = await model.findOne('id', id);

  if (!sale) return ({ status: 401, payload: 'Not found.' });
  
  sale.status = 'delivered';
  sale.save();

  return ({ status: 200, payload: { message: 'Sale updated.' } });
};

// CRIAÇÃO DE VENDA----------------------------------------------------------
const validateEntries = ({ customerId, total, address, number }) => {
  if (!customerId || !total) return 'The sale is missing total price or customer identity.';
  if (!number || !address) return 'The sale is address.';
  return '';
};

const validateProducts = (products) => {
  const productsContent = products.map((product) => (product.id && product.quantity));
  const productsAreNotValid = productsContent.includes(false);

  if (productsAreNotValid) return 'Invalid products in sale.';
  return '';
};

const create = async ({ body }) => {
  const { total, address, number, customerId, products } = body;

  const entriesAreValid = validateEntries({ customerId, total, address, number });
  const productsValid = validateProducts(products);

  if (entriesAreValid !== '') return ({ status: 400, message: entriesAreValid });
  if (productsValid !== '') return ({ status: 400, message: productsValid });
  
  const newSale = await model.create({ total, address, number, customerId, products });

  if (!newSale) return ({ status: 500, payload: 'Internal error.' });

  return ({ status: 201, payload: { message: 'Sale created.' } });
};

module.exports = { create, getAll, getById, update };
