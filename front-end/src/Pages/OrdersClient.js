import React, { useContext} from 'react';
import Context from '../Context/Context';
import { MenuTop } from '../components';
import OrderCard from '../components/OrderCard';

function OrdersClient() {
  const {} = useContext(Context)
  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <OrderCard />
    </div>
  );
}

export default OrdersClient;


// indexId: propTypes.number.isRequired,
// orderId: propTypes.number.isRequired,
// date: propTypes.string.isRequired,
// totalValue: propTypes.number.isRequired,
// // onClick: propTypes.func.isRequired,
// };