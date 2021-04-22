const { Router } = require('express');
const rescue = require('express-rescue');
const { sales, products } = require('../../models');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.get('/', rescue(async (_req, res) => {
  const sale = await sales.findAll();

  return res.status(OK).json(sale);
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const orderInfo = await sales.findOne({
      where: { id },
      include: {
        model: products,
        as: 'products',
        through: { attributes: ['quantity'], as: 'sale' },
      },
    });

    return res.status(OK).json(orderInfo);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;

  const order = await sales.update(
    { status: newStatus },
    { where: { id } },
  );

  res.status(OK).json(order);
}));

module.exports = router;
