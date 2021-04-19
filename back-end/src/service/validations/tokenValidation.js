const jwt = require('jsonwebtoken');
const { secret } = require('../utils');
const userModel = require('../../model/usersModel');

const UNAUTHORIZED = 401;

const tokenValidation = async (token) => {
  const result = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      const wrongTokenInfo = {
        payload: { message: err.message },
        status: UNAUTHORIZED,
      };
      return wrongTokenInfo;
    }

    const { id, role } = decoded;
    return ({ id, role });
  });

  if (!result.payload) {
    const checkUser = await userModel.getById(result.id);
    const { id: storageId } = checkUser;
    const { id: idFromToken } = result;
    
    if (storageId === idFromToken) return true;
  }

  return result;
};

module.exports = tokenValidation;
