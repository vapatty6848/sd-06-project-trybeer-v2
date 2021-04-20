const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const { sales } = require('../models');

const routerSalesAdm = Router();

routerSalesAdm.get('/', validateToken, async (req, res) => {
  console.log('cheguei');
  const { role } = res.locals;
  if (role === 'administrator') {
    const orders = await sales.findAll();
    res.status(200).json({ orders });
  }
  res.status(404).json({ message: 'something went wrong' });
});

routerSalesAdm.post('/:id', async (req, res) => {
  const { sale } = req.body;
  // await updatedOne(sale);
  console.log(sale);
  await sales.update(
    sale,
    {
      where: { id: sale.id },
    },
  );
  // const [updatedSale] = await getSaleById(sale.id);
  const updatedSale = await sales.findByPk(sale.id);
  console.log(updatedSale);
  res.status(200).json({ updatedSale });
});

module.exports = routerSalesAdm;
