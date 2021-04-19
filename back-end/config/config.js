require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
    define: { timeStamps: false },
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
    define: { timeStamps: false },
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
    define: { timeStamps: false },
  },
};
