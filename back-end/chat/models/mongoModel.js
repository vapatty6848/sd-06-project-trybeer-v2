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
.then((db) => db.collection('messages').aggregate([
  { $group: { _id: '$user', lastMessage: { $max: '$time' } } },
  { $project: { _id: 0, user: '$_id', lastMessage: '$lastMessage' } },
  { $sort: { lastMessage: -1 } },
]).toArray());
  // .then({ $project: { _id: 0, email: '$_id', lastMessage:  } })

module.exports = {
  createMessages,
  getAllMessages,
  getUserMessages,
  getMsgUsers,
};
