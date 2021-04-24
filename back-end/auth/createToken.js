const jwt = require('jsonwebtoken');

const secret = 'prjetoTrybeerGrupo1';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

// Payload é o que vem no corpo do nosso login!
const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
