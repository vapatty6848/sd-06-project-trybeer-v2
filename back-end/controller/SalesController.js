const { Router } = require('express');
const { verifyLogin } = require('../middlewares/authToken');
const { product: Product, sale: Sale, salesProduct: SalesProduct } = require('../models');
const { OK } = require('../schema/statusSchema');

const SalesController = new Router();

// Get All Sales
SalesController.get('/', verifyLogin, async (req, res) => {
  const sales = await Sale.findAll();
  return res.status(OK).json(sales);
});

// Get All Sales by User
SalesController.get('/user/:userId', verifyLogin, async (req, res) => {
  const { userId } = req.params;
  const sales = await Sale.findAll({
    where: { userId },
    attributes: ['saleDate', ['id', 'saleId'], ['totalPrice', 'saleTotal'], ['status', 'saleStatus']],
    order: [['userId', 'asc']]
  });
  return res.status(OK).json(sales);
});

// Get All Sales Products by saleID
SalesController.get('/products/:saleId', verifyLogin, async (req, res) => {
  const { saleId } = req.params;
  const sale = await Sale.findByPk(saleId);
  const sales = await Sale.findAll({
    where: { id: saleId },
    include: [
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] },
        attributes: [
          ['id', 'productId'],
          ['name', 'productName'],
          ['price', 'productPrice'],
        ]
      }
    ]
  });
  const products = sales[0].products;
  const saleProducts = { sale, products };
  return res.status(OK).json(saleProducts);
});

// Store request
SalesController.post('/checkout', verifyLogin, async (req, res) => {
  const { userId, totalPrice, address, number, items } = req.body;
  const { dataValues: { id } } = await Sale.create({
    userId,
    totalPrice,
    deliveryAddress: address,
    deliveryNumber: number,
    saleDate: new Date(),
    status: 'Pendente',
  });

  items.map((elem) => SalesProduct.create({
    saleId: id,
    productId: elem.id,
    quantity: elem.total,
  }));

  res.status(OK).json({ saleId: id });
});

// Update
SalesController.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Sale.update({ status }, { where: { id } });  
  res.status(OK).json({ Message: 'Updated status' });
});

module.exports = SalesController;
