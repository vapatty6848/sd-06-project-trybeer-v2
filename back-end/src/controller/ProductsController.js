const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const ProductService = require('../service/ProductService');

const router = new Router();

const OK = 200;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', rescue(async (req, res) => {
  const products = await ProductService.getAll();
  return res.status(OK).json(products);
}));

router.post('/new', upload.single('image'), rescue(async (req, res) => {
  const { name, price } = req.body;
  const { filename } = req.file;
  const urlImage = `http://localhost:3001/images/${filename}`;
  await ProductService.create(name, price, urlImage);
  return res.status(OK).json({ message: 'Produto criado com sucesso' });
}));

module.exports = router;
