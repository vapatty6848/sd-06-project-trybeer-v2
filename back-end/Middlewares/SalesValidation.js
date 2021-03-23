const { Login } = require('../models');

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const SalesValidation = async (req, _res, next) => {
  const { userEmail, totalValue, street, number, cart } = req.body;
  const date = new Date();
  const status = 'Pendente';

  const { id } = await Login.getByEmail(userEmail);
  if (!id) return next(errorMsg(404, 'Usuário não encontrado'));
  
  const order = { id, totalValue, street, number, date, status, cart };
  req.order = order;
  
  next();
};

module.exports = { SalesValidation };