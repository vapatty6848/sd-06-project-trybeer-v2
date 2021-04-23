const connection = require('./connection');

const saveAdminMessage = async (message, userId) => {
  await connection()
    .then((db) => db.collection('messages').updateOne(
      { userId },
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

module.exports = {
  getChats,
  saveAdminMessage,
};
