const { Router } = require('express');
const rescue = require('express-rescue');
const LoginService = require('../service/LoginService');
const ProductService = require('../service/ProductService');
const CheckoutService = require('../service/CheckoutService');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', rescue(async (req, res) => {
  try {
    const { cart, userEmail, totalPrice, status, rua, numero } = req.body;

    const { id: userId } = await LoginService.getByEmail(userEmail);
    const products = await ProductService.getAll();

    const newCart = cart.map((product) => {
      const newProduct = products.find((newP) => product.name === newP.name);

      return { id: newProduct.id, quantity: product.quantity };
    });

    const { id: saleId } = await CheckoutService.create({
      userId, totalPrice: totalPrice.replace(',', '.'), rua, numero, status,
    });

    const saleProduct = newCart.map((element) => ({ saleId, ...element }));

    await CheckoutService.createSaleProduct(saleProduct);

    return res.status(OK).json({ message: 'Sales success' });
  } catch (err) {
    return res.status(BAD_REQUEST).json({ message: 'Sale failure' });
  }
}));

module.exports = router;
