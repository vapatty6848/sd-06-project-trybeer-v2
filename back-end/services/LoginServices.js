const { users } = require('../models');
const { UNAUTHORIZED, OK } = require('../utils/allStatusCode');
const { createToken } = require('../utils/createToken');
const {
  validateEmail,
  validatePassword,
} = require('../utils/funcValidations');

const objErr = (err, status) => ({ err, status });

const emailAndPasswordIsExists = (email, password) => {
  switch (false) {
    case email:
    case password:
      return objErr('All fields must be filled', UNAUTHORIZED);
    default: return null;
  }
};

const emailAndPasswordCheckContent = (email, password) => {
  switch (false) {
    case validateEmail(email):
    case validatePassword(password):
      return objErr('Incorrect username or password', UNAUTHORIZED);
    default: return null;
  }
};

const checkUserRegister = (email, password, user) => {
  if (!user || email !== user.email || password !== user.password) {
    return objErr('Incorrect username or password', UNAUTHORIZED); 
  }
  return null;
};

const LoginServices = async (req, res) => {
  const { email, password } = req.body;

  const error = emailAndPasswordIsExists(email, password);
  if (error) return res.status(error.status).json({ err: error.err });

  const error2 = emailAndPasswordCheckContent(email, password);
  if (error2) return res.status(error2.status).json({ err: error2.err });

  const { dataValues: user } = await users.findOne({ where: { email } });

  const error3 = checkUserRegister(email, password, user);
  if (error3) return res.status(error3.status).json({ err: error3.err });

  const { password: _password, ...userWithoutPassword } = user;
  const { id: _id, ...userWithoutId } = userWithoutPassword;
  const token = createToken(userWithoutPassword);
  return res.status(OK).json({ ...userWithoutId, token });
};

module.exports = LoginServices;