const conn = require('../config/connection');

const getAll = async () => {
  const messages = await conn()
    .then((db) => db.collection('messages').find().toArray());
  return messages;
};

const getMostRecentMessageFromUser = async (user) => {
  const messages = await conn()
    .then((db) => db.collection('messages')
      .find({ user })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray());

  return messages[0];
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const getAllUniqueUsers = async () => {
  const users = await conn()
    .then((db) => db.collection('messages')
      .find({})
      .project({ _id: 0, user: 1 })
      .toArray());

    const listOfEmails = users.map((userObject) => userObject.user);
    const filteredUsers = listOfEmails.filter(onlyUnique);

    return filteredUsers;
};

const postMessages = async (message, user, timestamp) => {
  const messages = await conn()
    .then((db) => db.collection('messages').insertOne({ user, message, timestamp }));
  return messages;
};

module.exports = {
  getAll,
  getAllUniqueUsers,
  getMostRecentMessageFromUser,
  postMessages,
};