import React from 'react';
import PropTypes from 'prop-types';
import '../../css/CardDetailsOrder.css';

function ClientDetailsOrder(props) {
  const { product, index } = props;
  return (
    <div className="client-details-card">
      <p data-testid={ `${index}-product-qtd` }>
        { `Quantidade: ${product.quantity}` }
      </p>
      <h1 data-testid={ `${index}-product-name` }>{ product.productName }</h1>
      <p data-testid={ `${index}-product-total-value` }>
        { `R$ ${product.productPrice.toString().replace('.', ',')}` }
      </p>

    </div>
  );
}

ClientDetailsOrder.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ClientDetailsOrder;
