const authToken = require('./authToken.middlewares');
const log = require('./log.middlewares');
const handleError = require('./handleError.middlewares');
const authAdmin = require('./authAdmin.middlewares');
const handleErrorTestMode = require('./handleErrorTestMode.middlewares');

module.exports = {
  authToken,
  log,
  handleError,
  authAdmin,
  handleErrorTestMode,
};
