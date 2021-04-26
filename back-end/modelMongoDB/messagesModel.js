const connection = require('./connection');

const createMessage = (email, sentAt, message) => connection().then((db) => 
  db.collection('messages').insertOne(
    { email, sentAt, message },
  ));

const getAll = () => connection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  createMessage,
  getAll,
};
