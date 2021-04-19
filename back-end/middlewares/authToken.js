const jwt = require('jsonwebtoken');
const { findByEmail } = require('../model/User');
const { UNAUTHORIZED } = require('../schema/statusSchema');

const SECRET = 'senhaSuperSecreta.com';

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'jwt is missing' });

  jwt.verify(authorization, SECRET, async (err, decoded) => {
    if (err) return res.status(UNAUTHORIZED).json({ message: 'failed to auth token' });
    const { email } = decoded.data[0];
    const login = await findByEmail(email);
    if (!login) return res.status(UNAUTHORIZED).json({ message: 'user not registered' });
  });

  next();
};

module.exports = {
  SECRET,
  verifyLogin,
};
