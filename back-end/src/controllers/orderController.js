const { Router } = require('express');
const Service = require('../services/orderService');
const Model = require('../models/orderModels');
const status = require('../utils/httpStatusCode');

const orderRouter = Router();
const erroReturnCatch = status.INTERNAL_SERVER_ERROR;
const messageJson = { message: 'Internal Server Error' };

orderRouter.post('/', async (req, res) => {
  try {
    const { userID, value, street, number, date, saleProduct } = req.body;
    await Service.create({ userID, value, street, number, date, saleProduct });
    res.status(200).json(userID, value, street, number, date);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/', async (_req, res) => {
  try {
    const allSales = await Service.getAll();

    return res.status(status.OK).json(allSales);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const Sale = await Service.getBySalesId(id);

    return res.status(status.OK).json(Sale);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.put('/', async (req, res) => {
  const { id } = req.body;
  await Model.updateStatusOrder(id);
  res.status(200).json('atualizado');
});

module.exports = orderRouter;
