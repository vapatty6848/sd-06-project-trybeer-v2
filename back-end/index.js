const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { LoginController } = require('./controllers');
const { error } = require('./services');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

app.use('/login', LoginController);

app.use(error);
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
