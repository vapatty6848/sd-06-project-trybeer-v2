import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../../context/Context';
import RemoveConfirmation from './RemoveConfirmation';

const ButtonRemove = ({ index, item }) => {
  const [open, setOpen] = useState(false);
  const { id } = item;

  const { cartItems, setCartItems } = useContext(GlobalContext);

  const initialValue = -1;

  const position = cartItems.reduce((acc, product, idx) => {
    if (product.id === id) return idx;
    return acc;
  }, initialValue);

  const quantity = (position === initialValue) ? 0 : cartItems[position].quantity;

  // const handleRemoveConfirmation = () => setOpen(true);

  function handleRemove() {
    return setCartItems((prev) => (
      [
        ...prev.slice(0, position),
        ...prev.slice(position + 1),
      ]
    ));
  }

  return (
    <div className="flex items-center space-x-1">
      <RemoveConfirmation
        item={ item }
        open={ open }
        setOpen={ setOpen }
        handleRemove={ handleRemove }
      />
      <button
        data-testid={ `${index}-removal-button` }
        className="bg-gray-200 mr-2 w-6 h-6 flex items-center justify-center rounded-full"
        type="button"
        name="remove"
        // onClick={ () => handleRemoveConfirmation() }
        onClick={ () => handleRemove() }
        disabled={ quantity === 0 }
      >
        X
      </button>
    </div>
  );
};

ButtonRemove.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
    urlImage: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ButtonRemove;
