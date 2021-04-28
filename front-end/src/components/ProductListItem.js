import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { RiDeleteBin5Line } from 'react-icons/ri';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import './ProductListItem.scss';

const ProductListItem = ({ index, id, name, quantity, price }) => {
  const totalPrice = (quantity * price).toFixed(2);
  const { removeItemCart } = useContext(TrybeerContext);

  return (
    <div className="product-item">
      <div className="column">
        <p data-testid={ `${index}-product-qtd-input` }>{quantity} - {name}</p>
        <p data-testid={ `${index}-product-total-value` }>TOTAL: {formatedPrice(totalPrice)}</p>
        <p data-testid={ `${index}-product-unit-price` }>
          UNIT PRRICE: {`(${formatedPrice(price)} un)`}
        </p>
      </div>
      <div className="column">
        <IconContext.Provider value={{size: "2em"}} >
          <RiDeleteBin5Line
            data-testid={ `${index}-removal-button` }
            type="button"
            onClick={ () => removeItemCart(id) }
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

ProductListItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductListItem;
