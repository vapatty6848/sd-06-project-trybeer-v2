const { Router } = require('express');
const services = require('./service');
const checkToken = require('../middlewares/checkToken');

const controller = Router();

const getById = async (req, res) => {
  const response = await services.getById(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

const getAll = async (req, res) => {
  const response = await services.getAll(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

const create = async (req, res) => {
  const response = await services.create(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

const update = async (req, res) => {
  const response = await services.update(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

controller.get('/:id', checkToken, getById);
controller.get('/', checkToken, getAll);
controller.post('/', checkToken, create);
controller.put('/', checkToken, update);

module.exports = controller;
