const lengthName = 12;
const lengthPassword = 6;

const validateEmail = (email) => {
  const mailRegex = /^(?!_)\w+([.-]?\w+)*@(?!_)\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mailRegex.test(email);
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
  if (nameRegex.test(name)) return (name.length >= lengthName);

  return false;
};

const validatePassword = (password) => {
  if (password.length >= lengthPassword) return true;
};

const objFuncs = {
  validateEmail,
  validateName,
  validatePassword,
};

export default objFuncs;
