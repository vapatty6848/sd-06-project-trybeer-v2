const { Router } = require('express');
const services = require('./service');
const checkToken = require('../middlewares/checkToken');

const controller = Router();

const login = async (req, res) => {
  const response = await services.login(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

const changeName = async (req, res) => {
  const response = await services.changeName(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

const create = async (req, res) => {
  const response = await services.create(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

controller.post('/login', login);
controller.put('/', checkToken, changeName);
controller.post('/', create);

module.exports = controller;
