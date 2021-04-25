const connection = require('./connection');

const getAll = async (email) => {
  const response = await connection()
    .then((db) => db.collection('message').find({ email }).toArray());
  return response;
};

const createMessage = async (email, message, time) => {
  await connection().then((db) => db.collection('message').updateOne(
    { email },
    { $push: { messageDetails: { email, message, time } } },
    { upsert: true },
  ));
};

module.exports = {
  getAll,
  createMessage,
};
