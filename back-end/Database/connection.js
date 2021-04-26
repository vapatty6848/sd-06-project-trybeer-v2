require('dotenv').config();

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'Trybeer',
});

module.exports = { connection };
