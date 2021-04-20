const changeName = require('../model/changeNameModel');

const changeNameService = (name, email) => changeName(name, email);

module.exports = changeNameService;
