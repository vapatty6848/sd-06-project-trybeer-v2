const { Router } = require('express');
// const Chat = require('../mongoDB/SchemaMongoose');
const tokenValidation = require('../utils/tokenValidation');
const { UNAUTHORIZED, OK, NOT_FOUND } = require('../utils/allStatusCode');
const connection = require('../database/connectionMongo');

const ChatController = new Router();

ChatController.get('/', async (req, res) => {
  const { authorization: token } = req.headers;
  const payload = tokenValidation(token);
  const { email } = payload;  

  const resRequired = await connection()
    .then((db) => db.collection('messages').findOne({ email }));

  if (!resRequired) return res.status(NOT_FOUND).json({ err: 'NOT_FOUND' });

  res.status(OK).json(resRequired.messages);
});

ChatController.get('/admin/get', async (req, res) => {
  const { authorization: token } = req.headers;
  const payload = tokenValidation(token);
  const { role } = payload;

  if (role !== 'administrator') return res.status(UNAUTHORIZED).json({ err: 'UNAUTHORIZED' });
  
  const resRequired = await connection()
    .then((db) => db.collection('messages').aggregate([
      { $project: { _id: 0, email: 1, lastMessage: { $slice: ['$messages', -1] } } },
      { $unwind: '$lastMessage' },
      { $project: { email: 1, date: '$lastMessage.date' } },
    ]).toArray());

  res.status(OK).json(resRequired);
});

ChatController.get('/admin/:email', async (req, res) => {
  const { email } = req.params;
  const { authorization: token } = req.headers;
  const payload = tokenValidation(token);
  const { role } = payload;

  if (role !== 'administrator') return res.status(UNAUTHORIZED).json({ err: 'UNAUTHORIZED' });
  
  const resRequired = await connection()
    .then((db) => db.collection('messages').findOne({ email }));

  if (!resRequired) return res.status(NOT_FOUND).json({ err: 'NO_CONTENT' });

  res.status(OK).json(resRequired.messages);
});

module.exports = ChatController;
