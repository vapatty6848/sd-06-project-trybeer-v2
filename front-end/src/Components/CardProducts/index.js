import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../Contexts/GlobalContext';

import S from './styles';

const verifyQuantityZero = (cartList, setCartList) => {
  const productQuantity = cartList.filter((item) => item.quantity !== 0);

  setCartList(productQuantity);
};

const handleCartList = ({
  id,
  price,
  quantity,
  value,
  name,
  image,
}, cartList, setCartList) => {
  if (value === 'plus') quantity += 1;
  else quantity -= 1;

  const product = cartList.find((item) => item.id === id);

  if (!product || product === undefined) {
    setCartList([...cartList, { id, name, price, quantity, imageUrl: image }]);
  } else if (product && product.id === id) {
    product.quantity = quantity;
  } else {
    setCartList([...cartList, product]);
  }

  const productZeroQuantity = cartList.find((item) => item.quantity === 0);

  if (productZeroQuantity) verifyQuantityZero(cartList, setCartList);
};

const handleCounter = (
  { value }, {
    quantity,
    setQuantity,
    stateSumPrice,
    setStateSumPrice,
    id,
    name,
    price,
    image,
    cartList,
    setCartList,
  },
) => {
  const product = { id, price, quantity, value, name, image };

  if (value === 'plus') {
    setQuantity(quantity + 1);
    setStateSumPrice(stateSumPrice + Number(price));
    handleCartList(product, cartList, setCartList);
    localStorage.setItem('total', JSON.stringify(stateSumPrice + Number(price)));
  }
  if (value === 'minus' && quantity > 0) {
    setQuantity(quantity - 1);
    setStateSumPrice(stateSumPrice - Number(price));
    handleCartList(product, cartList, setCartList);
    localStorage.setItem('total', JSON.stringify(stateSumPrice - Number(price)));
  }
};

const CardProducts = ({ product }) => {
  const { id, price, name, url_image: urlImage } = product;

  const image = urlImage.replace('/images', '');

  const {
    stateSumPrice,
    setStateSumPrice,
    cartList,
    setCartList,
  } = useContext(GlobalContext);

  const [quantity, setQuantity] = useState(0);

  const stateProps = {
    quantity,
    setQuantity,
    stateSumPrice,
    setStateSumPrice,
    id,
    name,
    price,
    image,
    cartList,
    setCartList,
  };

  return (
    <S.Container id={ `${id - 1}-product-container` }>
      <S.Image>
        <img
          data-testid={ `${id - 1}-product-img` }
          src={ image }
          alt={ name }
        />
      </S.Image>

      <S.Price>
        <span data-testid={ `${id - 1}-product-price` }>
          {`R$ ${price.replace('.', ',')}`}
        </span>
      </S.Price>

      <S.Description>
        <span data-testid={ `${id - 1}-product-name` }>
          {name}
        </span>
      </S.Description>

      <S.Counter>
        <button
          className="minus"
          type="button"
          value="minus"
          onClick={ ({ target }) => handleCounter(target, stateProps) }
          data-testid={ `${id - 1}-product-minus` }
        >
          -
        </button>
        <div data-testid={ `${id - 1}-product-qtd` }>
          {quantity}
        </div>
        <button
          type="button"
          value="plus"
          onClick={ ({ target }) => handleCounter(target, stateProps) }
          data-testid={ `${id - 1}-product-plus` }
        >
          +
        </button>
      </S.Counter>
    </S.Container>
  );
};

CardProducts.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProducts;
