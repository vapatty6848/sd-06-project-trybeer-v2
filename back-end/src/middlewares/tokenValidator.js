const jwt = require('jsonwebtoken');
const { secret } = require('../authorization/jwtConfig');
const { ThrowError } = require('./errorHandler/errorHandler');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const userModel = require('../models/UserModel');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new ThrowError(status.UNAUTHORIZED, messages.UNAUTHORIZED);
    const { userData } = jwt.verify(token, secret);
    const tokenUserEmail = userData[0].email;
    const user = await userModel.getEmail(tokenUserEmail);
    if (!user.length) throw new ThrowError(status.NOT_FOUND, messages.USER_NOT_FOUND);
    const [registeredUser] = user;
    req.user = registeredUser;
    next();
  } catch (error) {
    next(error);
  }
}; 