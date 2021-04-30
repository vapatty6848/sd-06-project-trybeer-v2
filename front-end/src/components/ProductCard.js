import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { GiBeerBottle } from 'react-icons/gi';
import { IconContext } from "react-icons";
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import './ProductCard.scss';

const ProductCard = ({ index, id, name, price, url_image: urlImage }) => {
  const [quantity, setQuantity] = useState(0);
  const { cart, updateProductQuantity } = useContext(TrybeerContext);
  // const formatedPrice = price.replace('.', ',');

  useEffect(() => {
    const productById = cart.find((item) => item.id === id);
    if (productById !== undefined) {
      setQuantity(productById.quantity);
    }
  }, [cart, id]);

  const increaseQuantity = () => {
    const result = quantity + 1;
    setQuantity(result);
    updateProductQuantity(id, name, result, price);
  };

  const decreaseQuantity = () => {
    if (quantity !== 0) {
      const result = quantity - 1;
      setQuantity(result);
      updateProductQuantity(id, name, result, price);
    }
  };

  return (
    <div className="product-card">
      <div className="price-title">
        <p data-testid={ `${index}-product-name` }>{name}</p>
      </div>
      <img
        data-testid={ `${index}-product-img` }
        className="product-card-image"
        alt={ name }
        src={ urlImage }
      />
      <div className="price">
        <IconContext.Provider value={{size: "2em", className: "icon"}}>
          <MdAttachMoney />
        </IconContext.Provider>
        <p data-testid={ `${index}-product-price` }>{formatedPrice(price)}</p>
      </div>
      {/* <p data-testid={ `${index}-product-price` }>{`R$ ${formatedPrice}`}</p> */}
      <div className="quantity-controller">
        <IconContext.Provider value={{size: "2em", className: "icons"}}>
          <FiMinusSquare
            onClick={ decreaseQuantity }
            data-testid={ `${index}-product-minus` }
            type="button"
          />
          <p data-testid={ `${index}-product-qtd` }>{quantity}</p>
          <FiPlusSquare
            onClick={ increaseQuantity }
            data-testid={ `${index}-product-plus` }
            type="button"
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  url_image: PropTypes.string.isRequired,
};

export default ProductCard;
