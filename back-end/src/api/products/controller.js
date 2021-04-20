const { Router } = require('express');
const services = require('./service');

const controller = Router();

const getAll = async (_req, res) => {
  const response = await services.getAll();
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

controller.get('/', getAll);

module.exports = controller;