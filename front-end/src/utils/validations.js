const validateEmail = (email) => {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]{0,2})?$/;
  return regexEmail.test(email.toLowerCase());
};

const validatePassword = (password) => {
  const regexPassword = /[a-z0-9]+/;
  const minLength = 6;
  return (regexPassword.test(password) && password.length >= minLength);
};

const validateName = (name) => {
  const regexName = /[^a-zA-Z ]+/;
  const minLength = 12;
  return ((!regexName.test(name)) && name.length >= minLength);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
