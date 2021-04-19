const express = require('express');
const { Router } = require('express');
const { salesProducts, sale, product } = require('./models');

const app = express();
const port = 3001;

const teste = async () => {
  const result = await salesProducts.findAll({
    include: [{ model: sale, as: 'sale' }, { model: product, as: 'product' }],
  });

  return result;
};

app.get('/', (_req, res) => teste().then((result) => res.status(200).json(result)));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
