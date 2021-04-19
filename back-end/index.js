const express = require('express');
const path = require('path');
const cors = require('cors');
const Rescue = require('express-rescue');
const { handleError } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use('/', Rescue(routes));
app.use(handleError);

app.listen(port, () => console.log('Port Running'));

// const teste = async () => {
//   const result = await salesProducts.findAll({
//     include: [{ model: sale, as: 'sale' }, { model: product, as: 'product' }],
//   });

//   return result;
// };

// app.get('/', (_req, res) => teste().then((result) => res.status(200).json(result)));
