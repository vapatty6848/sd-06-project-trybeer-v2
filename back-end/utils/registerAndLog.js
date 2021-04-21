const userService = require('../services/UsersService');
const createToken = require('../auth/createToken');

const registerAndLog = async (reqEmail) => {
  // const [userTotal] = await userService.findByEmail(reqEmail);
  const user = await userService.findByEmail(reqEmail);
  const userTotal = user.dataValues;
  const { password, ...userWithoutPassword } = userTotal;
  const token = createToken(userWithoutPassword);
  
  const { id, name, email, role } = userWithoutPassword; 
  return ({
    id,
    name,
    email,
    role,
    token,
  });
};

module.exports = registerAndLog;