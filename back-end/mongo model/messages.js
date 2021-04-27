const connection = require('./connection');

const getAllByUser = async (email) => (
  connection().then((db) => db.collection('messages')
    .find({ email })
    .project({ messages: 1, _id: 0 })
    .toArray())
);

const saveMessage = async (email, nickname, message, timestamp) => {
  const messages = { nickname, message, timestamp };
  
  return connection().then((db) => db.collection('messages').updateOne(
    { email },
    { $push: { messages } },
    { upsert: true },
  ));
};

const getCustomersChat = async () => (
  connection().then((db) => db.collection('messages')
    .find()
    .project({ _id: 0 })
    .toArray())
);

module.exports = {
  getAllByUser,
  saveMessage,
  getCustomersChat,
};
