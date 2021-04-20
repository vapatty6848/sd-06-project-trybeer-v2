// const { getByEmail } = require('../models/UsersService');
const { Users } = require('../../models');

async function validateEmail(req, res, next) {
    // const { email } = req.body.user;
    // const [user] = await getByEmail(email);
    // res.locals.user = user;
    const { email } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
}

module.exports = validateEmail;