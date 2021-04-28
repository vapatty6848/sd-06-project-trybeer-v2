const connection = require('./connection');

const COLLECTION_NAME = 'messages';

const getAll = async () => {
  const allMessages = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .find().toArray());

  return allMessages;
};

const getByRoom = async (room) => {
  const allMessages = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOne({ room }));

  return allMessages;
};

const date = new Date();

const saveMessage = async (message, from, dest, room) => {
  const newMessage = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .updateOne(
        { room },
        { $push: { messages: { message, from, dest, date } } },
        { upsert: true },
      ));

  return newMessage;
};

module.exports = {
  getAll,
  getByRoom,
  saveMessage,
};