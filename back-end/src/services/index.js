const session = require('./session.services');
const users = require('./users.services');
const products = require('./products.services');
const sales = require('./sales.services');
const admin = require('./admin.services');
const chat = require('./chat.services');

module.exports = {
  session,
  users,
  products,
  sales,
  admin,
  chat,
};
