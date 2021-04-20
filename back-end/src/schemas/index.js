const authLogin = require('./authLogin.schemas');
const authRegisterUser = require('./authRegisterUser.schemas');
const authDetailsSale = require('./authDetailsSale.schemas');
const authNewSale = require('./authNewSale.schemas');
const authStatusUpdate = require('./authUpdateSale.schemas');
const utils = require('./utils');

module.exports = {
  authLogin,
  authRegisterUser,
  authDetailsSale,
  authNewSale,
  authStatusUpdate,
  utils,
};
