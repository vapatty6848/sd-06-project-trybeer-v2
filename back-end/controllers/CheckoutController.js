const { Router } = require('express');
const CheckoutService = require('../services/CheckoutService');

const CheckoutController = new Router();

CheckoutController.post('/', CheckoutService);

module.exports = CheckoutController;