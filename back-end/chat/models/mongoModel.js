const connection = require('./connection');

const createMessages = async (user, time, message, to) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('messages').insertOne({ user, time, message, to }));
  return {
    _id: insertedId,
    user,
    time,
    message,
    to,
  };
};

const getAllMessages = async () => connection()
  .then((database) => database.collection('messages').find().toArray());
    
const getUserMessages = async (email) => connection()
  .then((database) => database.collection('messages')
  .find({ $or: [{ user: email }, { user: 'Loja', to: email }] }).toArray());

const getMsgUsers = async () => connection()
  .then((db) => db.collection('messages').aggregate(
    [
      { $group: { _id: '$user', lastMessage: { $max: '$time' } } }, 
      { $sort: { lastMessage: -1 } },
      { $project: { user: '$_id', lastMessage: 1 } },
    ],
  ).toArray());

module.exports = {
  createMessages,
  getAllMessages,
  getUserMessages,
  getMsgUsers,
};
