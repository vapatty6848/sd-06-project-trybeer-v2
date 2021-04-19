const { Router } = require('express');
const adminOrderService = require('../services/adminOrderService');

const router = Router();

router.get('/adminOrders', async (req, res) => {
  try {
    const allOrders = await adminOrderService.allOrders();

    if (!allOrders) return res.status(404).json({ message: 'Pedidos não foram encontrados.' });

    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/changeStatus', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(404).json({ message: 'Pedido não encontrado.' });
    const idModified = Number(id);
    await adminOrderService.changeStatus(idModified);
    return res.status(200).json({ message: 'Alterado com Sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
