const visibilityBtnLogin = (user, setValid) => {
  const emailRegex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const email = emailRegex.test(user.email);
  const minLength = 6;
  const senha = user.password.length >= minLength;
  if (senha && email) {
    setValid(false);
  } else {
    setValid(true);
  }
};

module.exports = { visibilityBtnLogin };
