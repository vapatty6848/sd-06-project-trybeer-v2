const { Router } = require('express');
const { sales, products } = require('../models');

const router = Router();

router.get('/orderDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productsOfSale = await sales.findByPk(id, {
      include: [
        { model: products, as: 'products', through: { attributes: ['quantity'] } },
      ],
    });

    if (!productsOfSale) return res.status(404).json({ message: 'Não foram encontrado vendas.' });
    return res.status(200).json(productsOfSale);
  } catch (error) {
    console.log(error.message, 'orderDetailsController');
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
