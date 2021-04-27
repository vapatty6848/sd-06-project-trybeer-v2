const {
  validateUserName,
  validateEmailField,
  validatePasswordField,
} = require('./utils');

const error = {
  invalidFieldIsVendor: 'C_ERR_ISVENDOR_INVALID',
  unavaibleEmail: 'C_ERR_EMAIL_UNAVAIBLE',
};

const validateIsVendor = (bool) => {
  if (typeof bool !== 'boolean') throw new Error(error.invalidFieldIsVendor);
};

const verifyEmailAvaibility = (object) => {
  if (object) throw new Error(error.unavaibleEmail);
};

module.exports = ({ name, email, password, isVendor = false }, isEmailAvaible) => {
  validateUserName(name);
  validateEmailField(email);
  validatePasswordField(password);
  validateIsVendor(isVendor);
  verifyEmailAvaibility(isEmailAvaible);
};
