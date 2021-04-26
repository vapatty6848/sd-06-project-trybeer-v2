const connection = require('./connection');

const addMessage = async (message) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('messages').insertOne(message))
  .catch((err) => err);
  
  return { id: insertedId, ...message };
  }; 

const getAllUsers = async () => {
  const res = await connection()
    .then((db) => db.collection('messages').aggregate([
      {
        $group: {
          _id: '$user',
        },
      },
    ]).toArray());
  return res;
};

const getMessages = async (id) => {
  const res = await connection()
    .then((db) => db.collection('messages').find({ room: id }).toArray());
  return res;
};

module.exports = { 
  addMessage,
  getAllUsers,
  getMessages,
};
