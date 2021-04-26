const connection = require('./connection');
const getCurrentHour = require('../utils/currentHour');

const COLLECTION_NAME = 'messages';

const getAll = async () => {
  const allMessages = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .find().toArray());

  return allMessages;
};

const getByNickname = async (nickname) => {
  const allMessages = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .findOne({ nickname }));

  return allMessages;
};

const saveMessage = async (nickname, message) => {
  const date = getCurrentHour();
  const newMessage = await connection()
    .then((db) => db.collection(COLLECTION_NAME)
      .updateOne(
        { nickname },
        { $push: { messages: { message, date, nickname } } },
        { upsert: true },
      ));

  return newMessage;
};

module.exports = {
  getAll,
  getByNickname,
  saveMessage,
};