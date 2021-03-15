const { Login } = require('../models');

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const RegisterValidation = async (req, _res, next) => {
  const { email } = req.body;

  const userExists = await Login.getByEmail(email);

  if (userExists && email === userExists.email) {
    return next(errorMsg(403, 'E-mail already in database.'));
  }

  req.infoUser = userExists;

  next();
};

module.exports = { RegisterValidation };