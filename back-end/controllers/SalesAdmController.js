const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const customSequelizeTable = require('../utils/customSequelizeTable');
const { sales } = require('../models');

const routerSalesAdm = Router();

routerSalesAdm.get('/', validateToken, async (req, res, next) => {
  try {
    const { role } = res.locals;
    if (role === 'administrator') {
      const orders = await sales.findAll();
      res.status(200).json({ orders });
    }
  } catch (err) {
    next(err);
  }
});

routerSalesAdm.post('/:id', async (req, res, next) => {
  const { id, status } = req.body.sale;
  try {
    await sales.update(
      { status },
      { where: { id } },
    ); 
    const saleADM = await customSequelizeTable(id);
    return res.status(200).json(saleADM);
  } catch (err) {
    next(err);
  }
});

module.exports = routerSalesAdm;
