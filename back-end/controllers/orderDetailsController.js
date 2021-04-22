const { Router } = require('express');
const { salesProducts } = require('../models');

const router = Router();

// colunas: saleDate, status -> tabela sales
// colunas: name, price -> tabela products 
// colunas: saleId, productId e quantity para formar a junção que é a tabela salesProducts

router.get('/orderDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productsOfSale = await salesProducts.findAll({ salesId: id });

    if (!productsOfSale) return res.status(404).json({ message: 'Não foram encontrado vendas.' });
    return res.status(200).json(productsOfSale);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
