const { Router } = require('express');
const rescue = require('express-rescue');
const {
  users, sales, products, sales_products: salesProducts,
} = require('../../models');

const router = new Router();

const OK = 200;

router.post('/', rescue(async (req, res) => {
    const { cart, userEmail, totalPrice, status, rua, numero } = req.body;
    const { id: userId } = await users.findOne({ where: { email: userEmail } });
    const newProducts = await products.findAll();
    const newCart = cart.map((product) => {
      const newProduct = newProducts.find((newP) => product.name === newP.name);
      return { id: newProduct.id, quantity: product.quantity };
    });
    const { id: saleId } = await sales.create({
      userId,
      totalPrice: totalPrice.replace(',', '.'),
      deliveryAddress: rua,
      deliveryNumber: numero,
      status,
    });
    console.log(saleId);
    const saleProduct = newCart.map((element) => ({ saleId, ...element }));
    await salesProducts.create(saleProduct);
    return res.status(OK).json({ message: 'Sales success' });
}));

module.exports = router;
