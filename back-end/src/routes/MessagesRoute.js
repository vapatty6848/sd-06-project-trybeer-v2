const { Router } = require('express');

const { MessagesController } = require('../controller');

const MessagesRoute = Router();

MessagesRoute.post('/', MessagesController.createMessage);

MessagesRoute.get('/', MessagesController.findMessagesGroup);

MessagesRoute.get('/:id', MessagesController.findMessagesById);

module.exports = MessagesRoute;