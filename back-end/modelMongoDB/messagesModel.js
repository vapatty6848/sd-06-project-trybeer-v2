const connection = require('./connection');

const createMessage = (email, sentAt, message) => connection().then((db) => 
  db.collection('messages').insertOne(
    { email, sentAt, message },
  ));

const getAll = (userEmail) => connection().then((db) => db.collection('messages').find(
 { email: userEmail },
).toArray());

module.exports = {
  createMessage,
  getAll,
};
