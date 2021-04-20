const visibilityBtnRegister = async (newUser, setValid) => {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(newUser.email);
  const validNome = /^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(newUser.name);
  const minPassword = 6;
  const password = newUser.senha.length >= minPassword;
  const minCharacters = 12;
  const nome = newUser.name.length >= minCharacters;
  if (validNome && regexEmail && password && nome) {
    setValid(false);
  } else {
    setValid(true);
  }
};

module.exports = { visibilityBtnRegister };
