import React, { useState } from 'react';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import { hanldeRegisterProduct, handleChange } from '../services/ProductInsertService';
import './ProductAdminInsert.css';

function ProductAdminInsert() {
  const [product, setProduct] = useState({ name: '', price: 0 });

  return (
    <div className="div-main">
      <SideBarAdmin />
      <div className="div-filha">
        <h1 className="title">Cadastra Produto</h1>
        <label htmlFor="product-name">
          Nome do produto
          <input
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
          <input
            id="product-price"
            type="number"
            name="price"
            value={ product.price }
            placeholder="Preço"
            onChange={ (event) => handleChange(event, product, setProduct) }
          />
        </label>
        <label htmlFor="product-image">
          Imagem do produto
          <input
            id="product-image"
            type="file"
            name="image"
          />
        </label>
        <button
          type="submit"
          onClick={ () => hanldeRegisterProduct(product, setProduct) }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default ProductAdminInsert;
