import React from 'react';
import ItensList from './ItensList';
import Form from './Form';

function CheckoutCard() {
  return (
    <div className="flex flex-col items-center">
      <ItensList />
      <Form />
    </div>
  );
}

export default CheckoutCard;
