import React from 'react';
import PropTypes from 'prop-types';

function RenderOrder({ productDetail }) { 
  return (
    <div>
      {productDetail  && productDetail.products.map((product, index) => (
        <div
          key={ index }
        >
          <span
            data-testid={ `${index}-product-qtd` }
          >
            { `${product.salesProducts.quantity} - ` }
          </span>
          <span
            data-testid={ `${index}-product-name` }
          >
            { product.name }
          </span>
          <span
            data-testid={ `${index}-product-total-value` }
          >
            {`R$ ${(product.price * product.salesProducts.quantity)
              .toFixed(2).replace('.', ',')}`}
          </span>
          <span
            data-testid={ `${index}-order-unit-price` }
          >
           {`(R$ ${product.price.replace('.', ',')})`}
          </span>
        </div>
      ))}
      <p
        data-testid="order-total-value"
      >
        {`Total: R$ ${productDetail
          ? productDetail.totalPrice.replace('.', ',')
          : true}`}
      </p>
    </div>
  );
}

RenderOrder.propTypes = {
  productDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderOrder;
