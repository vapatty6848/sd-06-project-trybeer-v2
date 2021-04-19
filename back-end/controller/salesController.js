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
  const fullSale = [];
  const { id } = req.params;
  const orders = await models.sales_products.findAll({ where: { sale_id: id } });
  const sale = await models.sales.findOne({ where: { id } });
  orders.forEach(async (order, index) => {
    const product = await models.products.findOne({ where: { id: order.product_id } });
    const productDetails = {
        Status: sale.status,
        idVenda: sale.id,
        product: product.name,
        price: product.price,
        total: sale.total_price,
        saleDate: sale.sale_date,
        quantidade: order.quantity,
      };
    fullSale.push(productDetails);
    if (index === orders.length - 1) res.status(200).send(fullSale);
  });
});

salesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  await updateOrder(id);
  const order = await getOrder(id);
  return res.status(201).send(order);
});

module.exports = salesRouter;
