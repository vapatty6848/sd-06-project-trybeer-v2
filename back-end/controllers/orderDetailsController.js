const { Router } = require('express');
const { salesProducts, sales, products } = require('../models');

const router = Router();

router.get('/orderDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // const productsOfSale = await salesProducts.findAll({
    //   include: [{
    //     model: sales, as: 'sales', attributes: ['saleDate', 'status'],
    //   }, {
    //     model: products, as: 'products', attributes: ['name', 'price'],
    //   }],
    // });
    // const sale = await sales.findAll({
    //   where: { id },
    //   include: { model: products, as: 'products' },
    // });

    // const salesProducts = sale[0].products;

    // const allProducts = 

    const productsOfSale = await salesProducts.findAll({ salesId: id });

    if (!productsOfSale) return res.status(404).json({ message: 'Não foram encontrado vendas.' });
    return res.status(200).json(productsOfSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
