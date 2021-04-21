const tokenValidation = require('../utils/tokenValidation');
const status = require('../utils/allStatusCode');

const VerifyAuthotization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(status.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  
  const payload = tokenValidation(authorization);
  req.user = payload;
  
  if (!payload) return res.status(status.UNAUTHORIZED).json({ message: 'jwt malformed' }); 

  next();
};

module.exports = VerifyAuthotization;