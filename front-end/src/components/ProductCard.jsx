import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addProduct, reduceProduct } from '../services/index';
import '../css/ProductCard.css';

function ProductCard(props) {
  const { product, setTotal, index } = props;
  const quantityStorage = localStorage.getItem(product.name);
  const [quantity, setQuantity] = useState(0);
  const { id, name, price, url_image: urlImage } = product;
  const params = { quantity, setQuantity, name, setTotal, price, id };

  useEffect(() => {
    if (JSON.parse(quantityStorage) !== null) {
      const obj = JSON.parse(quantityStorage);
      setQuantity(obj.total);
    }
  }, [quantityStorage]);

  return (
    <div className="card-container">
      <div>
        <img
          src={ `${urlImage}` }
          alt="imagem cerveja"
          data-testid={ `${index}-product-img` }
        />
      </div>
      <section className="product-info">
        <p data-testid={ `${index}-product-price` }>
          R$
          { ` ${price.replace('.', ',')}` }
        </p>
        <p data-testid={ `${index}-product-name` }>{ product.name }</p>
        <section>
          <button
            data-testid={ `${index}-product-minus` }
            type="button"
            onClick={ () => reduceProduct(params) }
          >
            -
          </button>
          <span data-testid={ `${index}-product-qtd` }>{quantity}</span>
          <button
            data-testid={ `${index}-product-plus` }
            type="button"
            onClick={ () => addProduct(params) }
          >
            +
          </button>
        </section>
      </section>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  setTotal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
