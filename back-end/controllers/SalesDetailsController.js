const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const customSequelizeTable = require('../utils/customSequelizeTable');

const routerSalesDetails = Router();

routerSalesDetails.use(validateToken);

routerSalesDetails.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const sales = await customSequelizeTable(id);
    console.log(sales)
    return res.status(200).json(sales);
  } catch (err) {
    next({ status: 404, message: err.message });
  }
});

module.exports = routerSalesDetails;
