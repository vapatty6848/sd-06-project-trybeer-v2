// const validateToken = require('../auth/validateToken');
const { Login } = require('../models');

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const LoginValidation = async (req, _res, next) => {
  const { email, password } = req.body;

  const userExists = await Login.getByEmail(email);

  if (!userExists || email !== userExists.email || password !== userExists.password) {
    return next(errorMsg(401, 'Email ou senha inválidos'));
  }

  req.infoUser = userExists;

  next();
};

module.exports = { LoginValidation };