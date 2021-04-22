const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (email) => {
  const secret = process.env.TOKEN_SECRET || 'segredodogrupo7';

  const jwtConfig = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return token;
};
