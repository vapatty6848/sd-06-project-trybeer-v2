const connection = require('../../database/mongodb/connection');

const collection = 'conversations';

const find = (property, value) => connection()
  .then((db) => db.collection(collection))
  .then((table) => (!property || !value)
    ? table.find({})
    : table.find({ [property]: value }))
  .then((result) =>  result.toArray());

const findOne = (property, value) => connection()
  .then((db) => db.collection(collection))
  .then((table) => table.findOne({ [property]: value }));

const create = (id, email) => connection()
  .then((db) => db.collection(collection))
  .then((table) => table.insertOne({ userId: id, messages: [], createdAt: new Date(), email }));

const update = (id, newMessage) => connection()
  .then((db) => db.collection(collection))
  .then((table) => table.updateOne(
    { userId: id },
    { $set: { messages: newMessage } },
  ));

module.exports = {
  findOne,
  find,
  create,
  update,
};