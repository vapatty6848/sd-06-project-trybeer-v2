import React, { useState } from 'react';
import { createNewProduct } from '../services/api';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import './ProductAdminInsert.css';

function ProductAdminInsert() {
  const [product, setProduct] = useState({ name: '', price: 0 });

  function handleChange(event) {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  }

  async function hanldeRegisterProduct() {
    const formData = new FormData();
    const imageFile = document.getElementById('product-image');

    formData.append('image', imageFile.files[0]);
    formData.append('name', product.name);
    formData.append('price', product.price);
    await createNewProduct(formData);
    setProduct({ name: '', price: '' });
    imageFile.value = [];
  }

  return (
    <div className="div-main">
      <SideBarAdmin />
      <div className="div-filha">
        <h1 className="title">Cadastrar Produto</h1>
        <label htmlFor="product-name">
          Nome do produto
          <br />
          <input
            className="productInsert"
            id="product-name"
            type="text"
            value={ product.name }
            name="name"
            placeholder="Nome do produto"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="product-name">
          Preço
          <br />
          <input
            className="productInsert"
            id="product-price"
            type="number"
            name="price"
            value={ product.price }
            placeholder="Preço"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <br />
        <label htmlFor="product-image">
          Imagem do produto
          <br />
          <input
            className="inputFile"
            id="product-image"
            type="file"
            name="image"
          />
        </label>
        <button
          className="buttonInsert"
          type="submit"
          onClick={ hanldeRegisterProduct }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default ProductAdminInsert;
