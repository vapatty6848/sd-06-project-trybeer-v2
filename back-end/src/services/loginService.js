const { User } = require('../models');
const httpResponse = require('../utils/httpResponses');
const generateToken = require('../auth/generateToken');

const loginService = async (email, password) => {
  if (!email || !password) return httpResponse.INVALID_DATA;

  const user = await User.findOne({ where:
    { email, password },
  });
 
  if (!user || user.length === 0) return httpResponse.USER_NOT_FOUND;
  delete user.password;
    
  const authenticatedUser = generateToken(user);
  
  return { token: authenticatedUser.token };
};

module.exports = {
  loginService,
};