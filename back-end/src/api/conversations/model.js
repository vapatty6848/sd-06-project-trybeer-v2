const connection = require('../../database/mongodb/connection');

const collection = 'conversations';

const findOne = (property, value) => connection()
  .then((db) => db.collection(collection))
  .then((table) => table.findOne({ [property]: value }));

const create = (id) => connection()
  .then((db) => db.collection(collection))
  .then((table) => table.insertOne({ userId: id, messages: [], createdAt: new Date() }));

module.exports = {
  findOne,
  create,
};