const { Router } = require('express');
const rescue = require('express-rescue');
const { Sales } = require('../../models');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.get('/', rescue(async (_req, res) => {
  const sales = await Sales.findAll();

  return res.status(OK).json(sales);
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const orderInfo = await Sales.findAll({ where: { userId: id } });

    return res.status(OK).json(orderInfo);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;

  const order = await Sales.update(
    { status: newStatus },
    { where: { id } },
  );

  res.status(OK).json(order);
}));

module.exports = router;
