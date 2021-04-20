const atob = require('atob');
const { users } = require('../models');

const parseJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    return null;
  }
};

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'Token não encontrado' });
  const decode = parseJWT(token);
  if (!decode) return next({ status: 401, message: 'Token expirado ou inválido' });
  const user = await users.findOne({ where: { email: decode.userData } });
  if (!user && !user.id) return next({ status: 401, message: 'invalid match of token' });
  res.locals.role = user.role;
  res.locals.userId = user.id;
  return next();
}

module.exports = validateToken;
