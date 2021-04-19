const userService = require('../services/UsersService');
const validateToken = require('../auth/validateToken');

const validEmailRegex = (email) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
const validPassword = (password) => password !== '' && password.length > 5;
const validName = (name) => {
  const NAME_REGEX = RegExp(/^[a-záàâãéèêíïóôõöúçñ ]+$/i);
  return NAME_REGEX.test(name);
};

const validateEmailDatabase = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.findByEmail(email);
  if (user.length > 0) return res.status(400).json({ message: 'User is already registered' });
  next();
};

const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!validEmailRegex(email) || !validPassword(password) || !validName(name)) {
    return res.status(400).json({ message: 'Invalid entries. Try again' });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await userService.findByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not registered' });
  if (!validEmailRegex(email) || !validPassword(password)) {
    return res.status(400).json({ message: 'Invalid entries. Try again' });
  }
  next();
};

const isUserLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  const loggedIn = validateToken(authorization);
  if (!loggedIn) return res.status(401).json({ message: 'Operation not authorized' });
  req.user = loggedIn;
  next();
};

const isUserAdmin = async (req, res, next) => {
  const { user: { role } } = req;
  if (role !== 'administrator') return res.status(401).json({ message: 'User is not an Admin' });
  next();
};

module.exports = {
  validateRegister,
  validateEmailDatabase,
  validateLogin,
  isUserLoggedIn,
  isUserAdmin,
};
