const { Router } = require('express');
const rescue = require('express-rescue');
const ordersService = require('../service/ordersService');
const { validateToken } = require('../middlewares/tokenValidation');

const router = Router();
const CREATED = 201;
const OK = 200;

router.post('/orders', validateToken, rescue(async (req, res) => {
  try {
    const { totalPrice, address, number, date, orderStatus, cartProducts } = req.body.objOrder;
    const userId = req.user.id;
    const orderData = { totalPrice, address, number, date, orderStatus };
    const insertId = await ordersService.createOrders(userId, orderData);
    cartProducts.map(async (product) => {
      const mySaleProducts = {
        saleId: insertId.dataValues.id,
        productId: product.id + 1,
        quantity: product.quantityItem,
      };
      await ordersService.createProductsSales(mySaleProducts);
    });
    res.status(CREATED).json({ message: 'Compra realizada com sucesso!' });
  } catch (error) {
    console.error(error.message);
  }
  }));

  router.get('/orders', validateToken, rescue(async (req, res) => {
    const userId = req.user.id;
    const sales = await ordersService.getOrders(userId);
    res.status(OK).json(sales);
  }));

  router.get('/orders/:id', validateToken, rescue(async (req, res) => {
    const saleId = req.params.id;

    const mySaleDetail = await ordersService.getSaleDetail(saleId);
    res.status(200).json(mySaleDetail);
  }));

  router.get('/admin/orders', validateToken, rescue(async (req, res) => {
    const allSales = await ordersService.getAllSales();
    res.status(200).json(allSales);
  }));

  router.put('/orders/:id', validateToken, rescue(async (req, res) => {
    const saleId = req.params.id;
    const { status } = req.body;

    await ordersService.updateSale(saleId, status);

    return res.status(201).json({ message: 'Sale atualizada com sucesso!' });
  }));

  module.exports = router;