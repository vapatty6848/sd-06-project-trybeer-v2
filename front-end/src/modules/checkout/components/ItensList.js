import React, { useContext } from 'react';
import GlobalContext from '../../../context/Context';
import ItemCard from './ItemCard';

function ItensList() {
  const { cartItems } = useContext(GlobalContext);

  const total = cartItems.reduce((acc, item) => {
    const result = (acc + item.quantity * item.price);
    return result;
  }, 0);

  const totalPrice = total.toFixed(2).replace('.', ',');

  return (
    <div className="flex flex-col space-y-2 w-full">
      { cartItems.length > 0 && cartItems.map((item, index) => (
        <ItemCard key={ index } item={ item } index={ index } />
      )) }
      <div
        className="flex items-center space-x-2 border-primary border
          rounded-md overflow-hidden justify-between p-2"
      >
        <p>Total:</p>
        <p data-testid="order-total-value">{ `R$ ${totalPrice}` }</p>
      </div>
      { cartItems.length === 0 && (
        <div>
          <p>Empty</p>
          <p className="text-opacity-100">Não há produtos no carrinho</p>
        </div>
      )}
    </div>
  );
}

export default ItensList;
