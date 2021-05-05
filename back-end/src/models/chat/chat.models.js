const connection = require('./connection');

const saveMessage = async (message, userId, email) => {
  const integer = parseInt(userId, 10);
  await connection()
    .then((db) => db.collection('messages').updateOne(
      { userId: integer },
      {
        $push: { messages: message },
        $set: { nickname: email },
      },
      { upsert: true },
    ))
    .catch((err) => err);

  return true;
};

const getMessagesByUserId = async (userId) => {
  const result = await connection()
    .then((db) => db.collection('messages').findOne({ userId }));

  return result;
};

module.exports = {
  getMessagesByUserId,
  saveMessage,
};
