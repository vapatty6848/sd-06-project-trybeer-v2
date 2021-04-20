import React from 'react';
import PaperContainer from '../../../design-system/containers/PaperContainer';
import DetailedOrderCard from '../components/DetailedOrderCard';

const DetailedOrder = () => (
  <PaperContainer>
    <p className="hidden" data-testid="top-title">Meus pedidos</p>
    <p>Order</p>
    <DetailedOrderCard />
  </PaperContainer>
);

export default DetailedOrder;
