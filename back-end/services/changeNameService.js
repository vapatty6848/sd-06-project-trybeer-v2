const changeName = require('../models/changeNameModel');

const changeNameService = (name, email) => changeName(name, email);

module.exports = changeNameService;
