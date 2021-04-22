const connection = require('./connection');

const addMessage = async (message) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('messages').insertOne(message))
  .catch((err) => err);

return { id: insertedId, ...message };
};

const getAllMessages = async () => {
  const res = await connection()
    .then((db) => db.collection('messages').find().toArray());
  return res;
};

module.exports = { 
  addMessage,
  getAllMessages,
};
