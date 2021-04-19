const { Router } = require('express');
const orderDetailsService = require('../services/orderDetailsService');

const router = Router();

router.get('/orderDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productsOfSale = await orderDetailsService.saleDetails(id);

    if (!productsOfSale) return res.status(404).json({ message: 'Não foram encontrado vendas.' });
    return res.status(200).json(productsOfSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
