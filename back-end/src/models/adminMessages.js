const connection = require('../../models/connection');

const getAllMessages = async () => {
  const messages = await connection()
    .then((db) => db.collection('messages')
    .find()
    .toArray());
  return messages;
};

module.exports = {
  getAllMessages,
};