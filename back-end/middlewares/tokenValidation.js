const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const secret = 'prjetoTrybeerGrupo1';

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(NOT_FOUND).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userService.findUserByEmail(decoded.email);
    req.user = user; 
    next();
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'Incorrect token' });
  }
}

module.exports = {
  validateToken,
};
