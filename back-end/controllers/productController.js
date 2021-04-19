const { Router } = require('express');
const product = require('./product');

const router = Router();

router.get('/products', product.getAllProducts);

module.exports = router;
