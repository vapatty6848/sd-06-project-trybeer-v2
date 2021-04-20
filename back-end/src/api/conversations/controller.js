const { Router } = require('express');
const services = require('./service');
const checkToken = require('../middlewares/checkToken');

const controller = Router();

const getById = async (req, res) => {
  const response = await services.getById(req);
  const { status, payload } = response;
  const { file, inputs } = payload;
  return res.status(status).render(file, inputs);
};

const getByUserId = async (req, res) => {
  const response = await services.getByUserId(req);
  const { status, payload } = response;
  const { file, inputs } = payload;
  return res.status(status).render(file, inputs);
};

console.log('AQUII')
controller.get('/:id',
// checkToken,
getById);

controller.get('/',
// checkToken,
// getByUserId);

(req, res) => res.sendFile(__dirname + '../../views/index.html'));
// (req, res) => res.status(200).render('./index.ejs'));

module.exports = controller;
