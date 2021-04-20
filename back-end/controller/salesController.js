const { Router } = require('express');
const models = require('../models');

const salesRouter = new Router();

salesRouter.get('/', async (_req, res) => {
  const allSales = await models.sales.findAll();

  res.status(200).json(allSales);
});

salesRouter.post('/', async (req, res) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber } = req.body;
  
  const obj = {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  };
  const sales = await models.sales.create(obj);
  const insertId = sales.id;

  return res.status(201).json(insertId);
});

salesRouter.post('/:id', async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  
  const obj = {
    saleId,
    productId,
    quantity,
  };
  await models.sales_products.create(obj);

  return res.status(201).json(obj);
});

const renderProducts = (sales, salesProducts) => {
  const allProducts = [];
  salesProducts.forEach((product) => {
    const fullProduct = {
      Status: sales[0].status,
      idVenda: sales[0].id,
      product: product.name,
      price: product.price,
      total: sales[0].totalPrice,
      saleDate: sales[0].saleDate,
      quantidade: product.sales_products.quantity,
    };
    allProducts.push(fullProduct);
  });
  return allProducts;
};

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sales = await models.sales.findAll({
    where: { id },
    include: { model: models.products, as: 'products' },
  });
  const salesProducts = sales[0].products;
  const allProducts = renderProducts(sales, salesProducts);
  
  return res.status(200).json(allProducts);
});

salesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await models.sales.update(
    { status },
    { where: { id } },
    );
  const order = await models.sales.findOne({ where: { id } });
  return res.status(201).send(order);
});

module.exports = salesRouter;
