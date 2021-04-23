const { Router } = require('express');
const services = require('./service');
const checkToken = require('../middlewares/checkToken');

const getAll = async (req, res) => {
  const response = await services.getAll(req);
  const { status, payload } = response;
  res.status(status).json(payload);
};

const controller = Router();

controller.get('/',
checkToken,
getAll);

module.exports = controller;