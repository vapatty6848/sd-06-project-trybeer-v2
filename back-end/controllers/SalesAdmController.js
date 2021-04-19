const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const { getAllOrders, updatedOne, getSaleById } = require('../models/SalesService');

const routerSalesAdm = Router();

routerSalesAdm.get('/', validateToken, async (req, res) => {
  console.log('cheguei no get do backend');
  const { role } = res.locals;
  if (role === 'administrator') {
    const [orders] = await getAllOrders();
    res.status(200).json({ orders });
  }
  res.status(404).json({ message: 'something went wrong' });
});

routerSalesAdm.post('/:id', async (req, res) => {
  const { sale } = req.body;
  await updatedOne(sale);
  // buscar a venda que foi alterada e retornar ela?
  const [updatedSale] = await getSaleById(sale.id);
  console.log(updatedSale);
  res.status(200).json({ updatedSale });
});

module.exports = routerSalesAdm;
