const getCurrentHour = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

module.exports = getCurrentHour;
