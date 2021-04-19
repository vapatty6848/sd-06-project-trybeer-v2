const jwt = require('jsonwebtoken');

const secret = 'JSONTrybeerSecret@2021';

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = createToken;
