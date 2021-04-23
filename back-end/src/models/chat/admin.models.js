const connection = require('./connection');

const saveAdminMessage = async (message, userId) => {
  const integer = parseInt(userId, 10);
  await connection()
    .then((db) => db.collection('messages').updateOne(
      { userId: integer },
      { $push: { messages: message } },
      { upsert: true },
    ))
    .catch((err) => err);

  return true;
};

const getChats = async () => {
    const result = await connection()
      .then((db) => db.collection('messages').find().toArray());

    return result;
};

const getMessagesByUserId = async (userId) => {
  const string = parseInt(userId, 10);
  const result = await connection()
    .then((db) => db.collection('messages').findOne({ userId: string }));

  return result;
};

module.exports = {
  getMessagesByUserId,
  getChats,
  saveAdminMessage,
};
