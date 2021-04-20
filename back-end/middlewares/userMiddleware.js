const { userSchema, loginSchema } = require('../schemas/userSchema');
const validateRegister = require('./validateRegister');
const validateLogin = require('./validateLogin');

const validateUserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body.user;
    await userSchema.validate({ name, email, password });
    await validateRegister(req, res, next);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
  next();
};

const validateUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body.user;
    await loginSchema.validate({ email, password });
    await validateLogin(req, res, next);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
  next();
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
};