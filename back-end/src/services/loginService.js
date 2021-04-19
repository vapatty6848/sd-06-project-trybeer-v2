const Model = require('../models/loginModels');
const httpResponse = require('../utils/httpResponses');
const generateToken = require('../auth/generateToken');

const loginService = async (email, password) => {
  if (!email || !password) return httpResponse.INVALID_DATA;

  const [[user]] = await Model.validateLogin(email, password);
    // console.log(user)
  // if (!user) return httpResponse.USER_NOT_FOUND  
  if (!user || user.length === 0) return httpResponse.USER_NOT_FOUND;
  delete user.password;
    
  const authenticatedUser = generateToken(user);
  
  return authenticatedUser;
};

module.exports = {
  loginService,
};