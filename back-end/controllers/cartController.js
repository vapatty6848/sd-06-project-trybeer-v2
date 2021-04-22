const { Router } = require('express');
const { sales } = require('../models');
const { salesProducts } = require('../models');

const router = Router();

router.post('/checkout', async (req, res) => {
  const { userId, total, street, number, data, status } = req.body;

  try {
    const saleId = await sales
      .create({
        userId,
        totalPrice: total,
        deliveryAddress: street,
        deliveryNumber: number,
        saleDate: data,
        status,
      });
    return res.status(201).json({ saleId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/saleProduct', async (req, res) => {
  const salesProductsBody = req.body;

  try {
    await salesProducts.create({ 
      saleId: salesProductsBody.saleId,
      productId: salesProductsBody.productId,
      quantity: salesProductsBody.quantity,
    });
    return res.status(201).json(salesProductsBody);
  } catch (error) {
    console.log(`cartController: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/saleProduct', async (req, res) => {
  try {
      const allSales = await sales.findAll();

      if (!allSales) return res.status(404).json({ message: 'Requisição não encontrada!' });

      return res.status(200).json(allSales);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
});

module.exports = router;
