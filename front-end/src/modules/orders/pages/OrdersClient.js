import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import Gallery from '../components/Gallery';

const OrdersClient = () => (
  <PaperContainer>
    <p className="hidden" data-testid="top-title">Meus Pedidos</p>
    <p>My orders</p>
    <Gallery />
  </PaperContainer>
);

export default OrdersClient;

//
