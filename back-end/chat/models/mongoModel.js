const connection = require('./connection');

const createMessages = async (user, time, message) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('messages').insertOne({ user, time, message }));
  return {
    _id: insertedId,
    user,
    time,
    message,
  };
};

const getAllMessages = async () => connection()
    .then((database) => database.collection('messages').find().toArray());

module.exports = {
  createMessages,
  getAllMessages,
};
