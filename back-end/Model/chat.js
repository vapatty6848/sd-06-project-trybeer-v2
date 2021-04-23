const connection = require('./connection');

const saveMessage = async (message, email, timestamp, role = 'client') => {
  await connection().then((db) => db.collection('messages')
    .insertOne({ message, email, timestamp, role }));
};

module.exports = { saveMessage };
