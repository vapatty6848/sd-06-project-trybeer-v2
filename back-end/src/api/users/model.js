const { users } = require('../../database/sequelize/models');

const findOne = (property, value) => users.findOne({ where: { [property]: value } });

const create = ({ name, email, password, role }) => users.create({ name, email, password, role });

module.exports = {
  findOne,
  create,
};
