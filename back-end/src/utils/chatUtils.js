const getTime = () => {
  const date = new Date();
  const hour = date.toLocaleTimeString('pt-BR', { 
    hour12: false,
    timeStyle: 'short',
   });
  return hour;
};

module.exports = { getTime };