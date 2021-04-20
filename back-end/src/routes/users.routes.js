const express = require('express');

const controllers = require('../controllers/users');
const middlewares = require('../middlewares');

const users = express.Router();

users.post('/register', controllers.register);

users.put('/edit', middlewares.authToken, controllers.profile);

module.exports = users;
