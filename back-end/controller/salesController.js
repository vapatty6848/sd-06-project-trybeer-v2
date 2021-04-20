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
    user_id: userId,
    total_price: totalPrice,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
  };
  const sales = await models.sales.create(obj);
  const insertId = sales.id;

  return res.status(201).json(insertId);
});

salesRouter.post('/:id', async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  
  const obj = {
    sale_id: saleId,
    product_id: productId,
    quantity,
  };
  await models.sales_products.create(obj);

  return res.status(201).json(obj);
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sales = await models.sales.findAll({
    where: { id },
    include: { model: models.products, as: 'products' },
  });
  return res.status(200).json(sales);
});

// [
//   {
//     "Status": "Pendente",
//     "idVenda": 1,
//     "product": "Heineken 600ml",
//     "price": "7.50",
//     "total": "69.96",
//     "saleDate": "2021-04-19T21:49:25.000Z",
//     "quantidade": "3"
//   },
//   {
//     "Status": "Pendente",
//     "idVenda": 1,
//     "product": "Antarctica Pilsen 300ml",
//     "price": "2.49",
//     "total": "69.96",
//     "saleDate": "2021-04-19T21:49:25.000Z",
//     "quantidade": "4"
//   },
//   {
//     "Status": "Pendente",
//     "idVenda": 1,
//     "product": "Brahma 600ml",
//     "price": "7.50",
//     "total": "69.96",
//     "saleDate": "2021-04-19T21:49:25.000Z",
//     "quantidade": "5"
//   }
// ]

salesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  await updateOrder(id);
  const order = await getOrder(id);
  return res.status(201).send(order);
});

module.exports = salesRouter;
