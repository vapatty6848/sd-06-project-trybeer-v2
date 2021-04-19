const jwt = require('jsonwebtoken');

const secret = '723y78yrfd3gtg47gf673t1yhfbto46378w32';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = ({ id, role }) => {
  const token = jwt.sign({ id, role }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
  secret,
};
