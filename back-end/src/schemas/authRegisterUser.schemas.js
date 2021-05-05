const {
  validateUserName,
  validateEmailField,
  validatePasswordField,
} = require('./utils');

const error = {
  invalidFieldIsVendor: 'C_ERR_ISVENDOR_INVALID',
  unavailableEmail: 'C_ERR_EMAIL_UNAVAILABLE',
};

const validateIsVendor = (bool) => {
  if (typeof bool !== 'boolean') throw new Error(error.invalidFieldIsVendor);
};

const verifyEmailAvaibility = (object) => {
  if (object) throw new Error(error.unavailableEmail);
};

module.exports = ({ name, email, password, isVendor = false }, isEmailAvaible) => {
  validateUserName(name);
  validateEmailField(email);
  validatePasswordField(password);
  validateIsVendor(isVendor);
  verifyEmailAvaibility(isEmailAvaible);
};
