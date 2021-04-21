import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from '../context/app.context';

import { getProductInfo, calcProductTotal } from '../utils';

export default function OrderCard({ product, index }) {
  const {
    productsContext: { products },
    tokenContext: { token },
  } = useContext(AppContext);

  if (!products) return 'Loading ...';

  return (
    <section key={ index } className="order-details-product">
      <span data-testid={ `${index}-product-qtd` }>
        { product.sale.quantity }
      </span>
      <span data-testid={ `${index}-product-name` } className="product-name">
        { getProductInfo(product.id, products, 'name') }
      </span>
      { (token.role === 'administrator') && (
        <span data-testid={ `${index}-order-unit-price` }>
          { `(R$ ${getProductInfo(product.id, products, 'price')
            .replace('.', ',')})` }
        </span>
      ) }
      <span data-testid={ `${index}-product-total-value` }>
        { `R$ ${calcProductTotal(product.id, product.sale.quantity, products)
          .replace('.', ',')}` }
      </span>
    </section>
  );
}

OrderCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number.isRequired,
};

OrderCard.defaultProps = {
  product: {},
};
