import React from 'react';
import PropTypes from 'prop-types';

import S from './styles';

const CardAdminProduct = ({ product, index }) => (
  <S.Container>

    <S.Products>

      <S.Image>
        <img src={ product.urlImage } alt={ product.name } />
      </S.Image>

      <S.DescriptionProducts>
        <div className="content-left-product">
          <span data-testid={ `${index}-product-name` }>
            {product.name}
          </span>

          <p data-testid={ `${index}-order-unit-price` }>
            {`(R$ ${Number(product.price).toFixed(2).replace('.', ',')})`}
          </p>
        </div>

        <div className="content-right-product">
          <span data-testid={ `${index}-product-qtd` }>
            {product.sales_products.quantity}
          </span>
          -
          <p data-testid={ `${index}-product-total-value` }>
            {`R$ ${(Number(product.price) * Number(product.sales_products.quantity))
              .toFixed(2)
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

CardAdminProduct.defaultValue = {
  quantity: '',
};

CardAdminProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.string,
    sales_products: PropTypes.instanceOf(Object),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardAdminProduct;
