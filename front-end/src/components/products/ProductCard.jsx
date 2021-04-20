import React from 'react';
import PropTypes from 'prop-types';

import { FiPlus, FiMinus } from 'react-icons/fi';

import '../../styles/products/ProductCard.css';

const ProductCard = ({ product, index, plusItemCart, minusItemCart, handleQuantity }) => (
  <div className="movie-card">
    <div>
      <img
        alt={ `Cerveja ${product.name}` }
        data-testid={ `${index}-product-img` }
        className="cardImage"
        src={ product.urlImage }
      />
    </div>
    <div>
      <span
        data-testid={ `${index}-product-price` }
      >
        { `R$ ${product.price.replace('.', ',')}` }
      </span>
    </div>
    <div>
      <span
        data-testid={ `${index}-product-name` }
      >
        { product.name }
      </span>
    </div>
    <div className="buttons-card">
      <div>
        <button
          type="button"
          name={ product.name }
          data-testid={ `${index}-product-plus` }
          onClick={ () => plusItemCart(product) }
        >
          <FiPlus />
        </button>
      </div>
      <div>
        <span
          data-testid={ `${index}-product-qtd` }
        >
          { handleQuantity(product) }
        </span>
      </div>
      <div>
        <button
          type="button"
          data-testid={ `${index}-product-minus` }
          onClick={ () => minusItemCart(product) }
        >
          <FiMinus />
        </button>
      </div>
    </div>
  </div>
);

ProductCard.propTypes = ({
  index: PropTypes.number.isRequired,
  product: PropTypes.objectOf(Object).isRequired,
  plusItemCart: PropTypes.func.isRequired,
  minusItemCart: PropTypes.func.isRequired,
  handleQuantity: PropTypes.func.isRequired,
});
// Pesquisar a maneira certa de validar função

export default ProductCard;
