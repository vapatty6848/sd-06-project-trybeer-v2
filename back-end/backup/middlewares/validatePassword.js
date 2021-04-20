// const { getPassword } = require('../models/UsersService');
const { Users } = require('../models');

const validatePassword = async (req, res, next) => {  
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    // return res.status(400).json({ message: 'Campos inválidos' });
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
  res.locals.user = user.dataValues;
  // const { email, password } = req.body.user;
  // console.log(email, password);
  // // const [user] = await getPassword(email);  
  // const user = await User.findOne({ where: { email, password } });.
  // if (password === user.password) return { valid: true };
  // const error = new Error('not found');
  // error.status = 404;
  // throw error;
};

module.exports = validatePassword;