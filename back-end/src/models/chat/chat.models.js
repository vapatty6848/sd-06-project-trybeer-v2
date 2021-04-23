const connection = require('./connection');

const saveMessage = async (message, userId) => {
  await connection()
    .then((db) => db.collection('messages').updateOne(
      { userId },
      { $push: { messages: message } },
      { upsert: true },
    ))
    .catch((err) => err);

  return true;
};

const getMessagesById = async (userId) => {
    const result = await connection()
      .then((db) => db.collection('messages').findOne({ userId }));

    return result;
};

module.exports = {
  getMessagesById,
  saveMessage,
};
