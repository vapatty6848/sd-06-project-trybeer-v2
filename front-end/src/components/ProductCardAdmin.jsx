import React from 'react';
import PropTypes from 'prop-types';
import '../css/ProductCardAdmin.css';

function ProductCardAdmin(props) {
  const { product, index } = props;
  const { productName, productPrice, quantity } = product;
  const productTotal = parseFloat(productPrice) * parseFloat(quantity);

  return (
    <div className="admin-container-card">
      <section className="admin-product-info">
        <div>
          <span data-testid={ `${index}-product-qtd` }>{ quantity }</span>
          <span data-testid={ `${index}-product-name` }>{ ` - ${productName}` }</span>
        </div>
        <div>
          <span
            data-testid={ `${index}-product-total-value` }
          >
            {`R$ ${productTotal.toFixed(2).toString().replace('.', ',')}`}
          </span>

          <span
            data-testid={ `${index}-order-unit-price` }
          >
            {`(R$ ${productPrice.replace('.', ',')})`}
          </span>
        </div>
      </section>
    </div>
  );
}

ProductCardAdmin.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCardAdmin;
