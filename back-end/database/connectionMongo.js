const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((err) => {
    console.log(`MongoDB deu merda na connect ${err}`);
  });
