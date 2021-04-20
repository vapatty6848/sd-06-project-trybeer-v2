import React from 'react';
import PropTypes from 'prop-types';

function RenderOrder({ productDetail }) {
  return (
    <div>
      {productDetail.map(({ productQuantity, productName, productPrice }, index) => (
        <div
          key={ index }
        >
          <span
            data-testid={ `${index}-product-qtd` }
          >
            { `${productQuantity} - ` }
          </span>
          <span
            data-testid={ `${index}-product-name` }
          >
            { productName }
          </span>
          <span
            data-testid={ `${index}-product-total-value` }
          >
            {`R$ ${(productPrice * productQuantity)
              .toFixed(2).replace('.', ',')}`}
          </span>
          <span
            data-testid={ `${index}-order-unit-price` }
          >
            {`(R$ ${productPrice.replace('.', ',')})`}
          </span>
        </div>
      ))}
      <p
        data-testid="order-total-value"
      >
        {`Total: R$ ${productDetail[0]
          ? productDetail[0].totalPrice.replace('.', ',')
          : true}`}
      </p>
    </div>
  );
}

RenderOrder.propTypes = {
  productDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderOrder;
