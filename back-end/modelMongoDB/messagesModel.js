const connection = require('./connection');

const createMessage = (email, sentAt, message) => connection().then((db) => 
  db.collection('messages').insertOne(
    { email, sentAt, message },
  ));

const getAll = (userEmail) => connection().then((db) => db.collection('messages').find(
  { email: userEmail },
).toArray());

const getAllMessagesAdmin = () => connection().then((db) => db.collection('messages').aggregate([
  {
    $group:
        {
          _id: '$email',
          maxTime: { $max: '$sentAt' },
        },
  },
]));

// db.messages.aggregate( [ { $group : { _id : "$email", maxTime: { $max: "sentAt" }  }] )
/* db.messages.aggregate(
  [
    {
      $group:
        {
          _id: "$email",
          maxTime: { $max: "$sentAt" }
        }
    }
  ]
) */
module.exports = {
  createMessage,
  getAll,
  getAllMessagesAdmin,
};
