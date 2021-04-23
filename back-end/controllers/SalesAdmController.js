const { Router } = require('express');

const validateToken = require('../middlewares/validateToken');
const { sales } = require('../models');

const routerSalesAdm = Router();

routerSalesAdm.get('/', validateToken, async (req, res) => {

  const { role } = res.locals;
  if (role === 'administrator') {
    const orders = await sales.findAll();
    res.status(200).json({ orders });
  }
  res.status(404).json({ message: 'something went wrong' });
});

routerSalesAdm.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body.sale;
  let newStatus = status
  switch (status) {
    case 'Pendente':
      newStatus = "Preparando"
      break;
    case 'Preparando':
      newStatus = "Entregue" 
      break;
    case 'Entregue':
      break;
    default:
      console.log(`Error`);
  }

  try {
    await sales.update(
      { status: newStatus },
      { where: { id } },
      ); 
      const saleADM  = await sales.findOne({ where: { id } });

    return res.status(200).json(saleADM);
  } catch (err) {
    next(err);
  }
});

module.exports = routerSalesAdm;
