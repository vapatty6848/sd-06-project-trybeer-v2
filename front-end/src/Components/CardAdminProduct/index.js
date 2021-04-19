import React from 'react';
import PropTypes from 'prop-types';

import S from './styles';

const CardAdminProduct = ({ product, index }) => (
  <S.Container>

    <S.Products>
      <img src="/images/image-heineken.png" alt="Heineken 600ml" />

      <S.DescriptionProducts>
        <div className="content-left-product">
          <span data-testid={ `${index}-product-name` }>
            {product.description}
          </span>

          <p data-testid={ `${index}-order-unit-price` }>
            {`(R$ ${(product.valueTotal).replace('.', ',')})`}
          </p>
        </div>

        <div className="content-right-product">
          <span data-testid={ `${index}-product-qtd` }>
            {product.quantity}
          </span>
          -
          <p data-testid={ `${index}-product-total-value` }>
            {`R$ ${((product.valueTotal * product.quantity)
              .toFixed(2))
              .replace('.', ',')}`}
          </p>
        </div>

      </S.DescriptionProducts>

      <S.ButtonProduct
        type="button"
      >
        Ver Produto
      </S.ButtonProduct>
    </S.Products>

  </S.Container>
);

CardAdminProduct.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
    valueTotal: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardAdminProduct;
