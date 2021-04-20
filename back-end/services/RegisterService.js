const { users } = require('../models'); // createRegister, getUserByEmail,
const {
  validateEmail,
  validateName,
  validatePassword,
} = require('../utils/funcValidations');
const { OK, BAD_REQUEST } = require('../utils/allStatusCode');
const { createToken } = require('../utils/createToken');

const objErr = (err, status) => ({ err, status });

const RegisterValidation = (body) => {
  const { name, email, password, role } = body;

  switch (false) {
    case validateEmail(email):
    case validatePassword(password):
    case validateName(name):
    case role:
      return objErr('All fields must be filled', BAD_REQUEST);
    default: return null;
  } 
};

const emailIsExists = async (email) => {
  const retorno = await users.findOne({ where: { email } });
  if (retorno) return objErr('E-mail already in database.', BAD_REQUEST);
  return null;
};

const RegisterServices = async (req, res) => {
  const { body } = req;
  
  const error = RegisterValidation(body);
  if (error) return res.status(error.status).json({ err: error.err });

  const error2 = await emailIsExists(body.email);
  if (error2) return res.status(error2.status).json({ err: error2.err });

  const { dataValues: user } = await users.create(body);

  const { password, name, ...userWithoutPasswordAndName } = user;
  const { id, password: _password, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPasswordAndName);

  res.status(OK).json({ ...userWithoutPassword, token });
};

module.exports = RegisterServices;
