const { Router } = require('express');
const rescue = require('express-rescue');
const ordersService = require('../service/ordersService');
const { validateToken } = require('../middlewares/tokenValidation');

const router = Router();
const CREATED = 201;
const OK = 200;

router.post('/orders', validateToken, rescue(async (req, res) => {
    const { totalPrice, address, number, date, orderStatus, cartProducts } = req.body.objOrder;
    const userId = req.user.id;
    const orderData = { totalPrice, address, number, date, orderStatus };
    const [{ insertId }] = await ordersService.createOrders(userId, orderData);
    // console.log('meu carrinho', cartProducts);
        cartProducts.map(async (product) => {
          const mySaleProducts = {
            saleId: insertId,
            productId: product.id + 1,
            quantity: product.quantityItem,
          };
          await ordersService.createProductsSales(mySaleProducts);
        });
    
    res.status(CREATED).json({ message: 'Compra realizada com sucesso!' });
  }));

  router.get('/orders', validateToken, rescue(async (req, res) => {
    const userId = req.user.id;
    const sales = await ordersService.getOrders(userId);
    res.status(OK).json(sales);
  }));

  router.get('/orders/:id', validateToken, rescue(async (req, res) => {
    const saleId = req.params.id;

    const mySaleDetail = await ordersService.getSaleDetail(saleId);
    // console.log('entrei no controller', mySaleDetail);
    res.status(200).json(mySaleDetail);
  }));

  router.get('/admin/orders', validateToken, rescue(async (req, res) => {
    const allSales = await ordersService.getAllSales();
    // console.log('entrei no controller', allSales);
    res.status(200).json(allSales);
  }));

  router.put('/orders/:id', validateToken, rescue(async (req, res) => {
    const saleId = req.params.id;
    // console.log('entrei no orders controller', saleId);
    await ordersService.updateSale(saleId);

    return res.status(201).json({ message: 'Sale atualizada com sucesso!' });
  }));

  module.exports = router;