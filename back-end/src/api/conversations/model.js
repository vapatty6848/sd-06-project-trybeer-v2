const connection = require('../../database/mongodb/connection');
const collection = 'conversations';

const findOne = (property, value) => connection
  .then((db) => db.collection(collection))
  .then((collection) => collection.findOne({ where: { [property]: value } }));

const create = (id) => connection
  .then((db) => db.collection(collection))
  .then((collection) => collection.create({ userId: id, messages: [] }));

module.exports = {
  findOne,
  create,
};