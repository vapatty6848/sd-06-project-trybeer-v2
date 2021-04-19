const { Router } = require('express');
const cartService = require('../services/cartService');

const router = Router();

router.post('/checkout', async (req, res) => {
  const { userId, total, street, number, data, status } = req.body;

  try {
    const saleId = await cartService
      .addSale({ userId, total, street, number, data, status });
    return res.status(201).json({ saleId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/saleProduct', async (req, res) => {
  const salesProducts = req.body;

  try {
    await cartService.addSaleProduct(salesProducts);
    return res.status(201).json(salesProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/saleProduct', async (req, res) => {
  try {
      const allSales = await cartService.getAllSales();

      if (!allSales) return res.status(404).json({ message: 'Requisição não encontrada!' });

      return res.status(200).json(allSales);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
});

module.exports = router;
