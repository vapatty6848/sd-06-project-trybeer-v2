import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';

import { GlobalContext } from '../../Contexts/GlobalContext';
import { getOrderDetails } from '../../Services/Apis';

import S from './styles';

const OrderDetails = () => {
  const { stateSideBar } = useContext(GlobalContext);
  const { id } = useParams();
  const history = useHistory();

  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const fetchData = await getOrderDetails(id);
      setOrders(fetchData);
    };
    fetchMyOrders();
  }, [id]);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (!userStorage) history.push('/login');
  }, [history]);

  return (
    <S.Container>

      <MenuTop />

      <SideBar />
      <S.ContainerOrder stateSideBar={ stateSideBar }>
        {console.log(orders)}

        {orders && (
          (orders.products.length > 0)
            ? (
              <>
                <S.TopInfos>
                  <h2 data-testid="order-number">
                    {`Pedido ${id} `}
                  </h2>
                  <h2 data-testid="order-status">
                    {`Pedido ${orders.status} `}
                  </h2>
                  <span data-testid="order-date">
                    {(moment(orders.saleDate).format('DD/MM/YYYY'))}
                  </span>
                </S.TopInfos>

                <S.ContainerDescription>
                  <span>Qtd.</span>
                  <span>Produto</span>
                  <span>Valor</span>
                </S.ContainerDescription>

                { orders.products.map((product, index) => (
                  <S.ContainerInfos key={ index }>
                    <span
                      className="quantity"
                      data-testid={ `${index}-product-qtd` }
                    >
                      {product.quantity}
                    </span>
                    <span
                      className="description"
                      data-testid={ `${index}-product-name` }
                    >
                      {product.name}
                    </span>
                    <span data-testid={ `${index}-product-total-value` }>
                      R$
                      {' '}
                      {`${Number(product.price).toFixed(2).replace('.', ',')}`}
                    </span>
                  </S.ContainerInfos>
                ))}

                <S.Total data-testid="order-total-value">
                  R$
                  {' '}
                  {Number(orders.valueTotal).toFixed(2).replace('.', ',')}
                </S.Total>
              </>
            )
            : <span>Pedido vazio ou inexistente</span>)}
      </S.ContainerOrder>
    </S.Container>
  );
};

export default OrderDetails;
