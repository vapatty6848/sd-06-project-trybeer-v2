const connection = require('./connection');

const saveMessage = async (message, email, timestamp, role) => {
  const userFound = await connection()
    .then((db) => db.collection('messages').findOne({ email }));

  if (userFound) {
    await connection().then((db) => db.collection('messages')
      .updateOne(
        { email },
        {
          $push: { messages: { message, timestamp, role } },
          $set: { lastMessage: timestamp },
        },
      ));
  } else {
    await connection().then((db) => db.collection('messages')
      .insertOne({
        email, messages: [{ message, timestamp, role }], lastMessage: timestamp,
      }));
  }
};

const getMessages = async () => {
  const messages = await connection().then((db) => db.collection('messages')
    .find().toArray());

  return messages;
};

module.exports = { saveMessage, getMessages };
