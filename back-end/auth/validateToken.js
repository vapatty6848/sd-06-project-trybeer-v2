const jwt = require('jsonwebtoken');

const secret = 'nossosegredo';

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (_e) {
    return null;
  }
};

module.exports = validateToken;
