const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL, DB_NAME } = process.env;

const connection = () => MongoClient.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

module.exports = connection;
