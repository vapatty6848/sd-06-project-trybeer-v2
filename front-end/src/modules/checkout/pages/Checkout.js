import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import CheckoutCard from '../components/CheckoutCard';

function Checkout() {
  return (
    <PaperContainer>
      <h1 data-testid="top-title">Checkout</h1>
      <CheckoutCard />
    </PaperContainer>
  );
}

export default Checkout;
