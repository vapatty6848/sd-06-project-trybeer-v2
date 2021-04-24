const conn = require('../config/connection');

const getAll = async () => {
  const messages = await conn()
    .then((db) => db.collection('messages').find().toArray());
  return messages;
};

const postMessages = async (message, user, timestamp) => {
  const messages = await conn()
    .then((db) => db.collection('messages').insertOne({ user, message, timestamp }));
  return messages;
};

module.exports = {
  getAll,
  postMessages,
};