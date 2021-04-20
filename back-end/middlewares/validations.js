const { users } = require('../models');

const validatePasswordLogin = async (req, res, next) => {
  const { email, password } = req.body.user;
  const user = await users.findOne({ where: { email, password } });
  if (!user) {
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
  res.locals.user = user.dataValues;
};

const validateEmailLogin = async (req, res, next) => {
  const { email } = req.body.user;
  const user = await users.findOne({ where: { email } });
  if (!user) {
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
};

const validateEmailRegister = async (req, res, next) => {
  const { email } = req.body.user;
  const user = await users.findOne({ where: { email } });
  if (user) {
    return (
      next({
        message: 'Usuário já existe',
        status: 409,
      })
    );
  }
};

module.exports = {
  validatePasswordLogin, validateEmailLogin, validateEmailRegister,
};