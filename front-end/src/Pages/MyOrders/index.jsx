import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';

import S from './styles';
import { getAllOrders } from '../../Services/Apis';

const MyOrders = () => {
  const { stateSideBar } = useContext(GlobalContext);
  const history = useHistory();
  const [orders, setOrders] = useState();
  const [userState, setUserState] = useState();

  useEffect(() => {
    if (userState) {
      const fetchMyOrders = async () => {
        const { email } = userState;
        const fetchData = await getAllOrders(email);
        setOrders(fetchData);
      };

      fetchMyOrders();
    }
  }, [userState]);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (!userStorage) history.push('/login');
    if (userStorage) setUserState(userStorage);
  }, [history]);

  return (
    <S.Container>

      <MenuTop />

      <SideBar />

      <S.ContainerOrders stateSideBar={ stateSideBar }>
        {orders
          && (
            orders.map((order, index) => (
              <S.CardOrder
                key={ index }
                testid={ `${index}-order-card-container` }
                onClick={ () => history.push(`/orders/${order.id}`) }
              >

                <S.ColorStatus />

                <div>
                  <span
                    className="order-number"
                    data-testid={ `${index}-order-number` }
                  >
                    {`Pedido ${order.id}`}
                  </span>
                  <span data-testid={ `${index}-order-date` }>
                    {order.date}
                  </span>
                </div>
                <p data-testid={ `${index}-order-total-value` }>
                  {`R$ ${Number(order.valueTotal).toFixed(2).replace('.', ',')}`}
                </p>
              </S.CardOrder>
            ))
          )}
      </S.ContainerOrders>

    </S.Container>
  );
};

export default MyOrders;
