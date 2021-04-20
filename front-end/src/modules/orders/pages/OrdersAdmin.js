import React from 'react';
import Gallery from '../components/Gallery';
import PaperContainer from '../../../design-system/containers/PaperContainer';

const OrdersAdmin = () => (
  <PaperContainer>
    <p className="hidden" data-testid="top-title">Admin - Pedidos</p>
    <p>My orders</p>
    <Gallery />
  </PaperContainer>
);

export default OrdersAdmin;
