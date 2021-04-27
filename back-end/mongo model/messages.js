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

module.exports = {
  getAllByUser,
  saveMessage,
};

// [
//   { email: useremail@MediaList.com, messages: [{ nickname, chatmessage, timestamp}] },
//   { email: useremail@MediaList.com, messages: [{ nickname, chatmessage, timestamp}] },
// ]