require('dotenv').config();

let config;
const dialect = process.env.DIALECT || 'mysql';

if (dialect === 'mysql') config = {
    development: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'mysql',
      logging: false,
    },
    test: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'mysql',
      logging: false,
    },
    production: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'mysql',
      logging: false,
    },
  };

if (dialect === 'postgres') config = {
    development: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'postgres',
      port: 5432,
      logging: false,
    },
    test: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'postgres',
      port: 5432,
      logging: false,
    },
    production: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER,
      database: process.env.SCHEMA,
      host: process.env.HOSTNAME,
      dialect: 'postgres',
      port: 5432,
      logging: false,
    },
  };

module.exports = config;
