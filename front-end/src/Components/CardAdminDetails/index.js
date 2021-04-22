import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { GlobalContext } from '../../Contexts/GlobalContext';
import { getAdminOrderById, updateStatus } from '../../Services/Apis';

import CardAdminProduct from '../CardAdminProduct';

import S from './styles';

const modifyStatus = async (setPending, id) => {

  setPending(false);

  await updateStatus(id);
};

const CardAdminDetails = () => {
  const [orders, setOrders] = useState();
  const [pending, setPending] = useState(true);

  const { stateDetailsSale } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const fetchData = await getAdminOrderById(id);
      setOrders(fetchData);

      if (fetchData.status === 'Pendente') {
        setPending(true);
      } else {
        setPending(false);
      }
    };

    fetchMyOrders();
  }, [id]);

  console.log('console orders', orders);
  return (
    <S.Container pending={ pending }>
      <S.ColorStatus pending={ pending } />
      <S.ColorStatusBottom pending={ pending } />

      {orders && (
        <S.Content>
          <S.ContentLeft pending={ pending }>
            <div>
              <h1 data-testid="order-number">
                {`Pedido ${orders.id}`}
              </h1>

              <h2 data-testid="order-status">
                {pending ? 'Pendente' : 'Entregue'}
              </h2>
            </div>

            <h3>{`${orders.deliveryAddress}, ${orders.deliveryNumber}`}</h3>
          </S.ContentLeft>

          {orders.products.map((product, index) => (
            <CardAdminProduct
              key={ index }
              product={ product }
              index={ index }
            />
          ))}

          <S.ContentRight>
            <h1 data-testid="order-total-value">
              <span>Valor total:</span>
              {' '}
              R$
              {' '}
              {(!orders.totalPrice ? '' : orders.totalPrice).replace('.', ',')}
            </h1>

            <S.ConfirmButton
              type="button"
              pending={ pending }
              data-testid="mark-as-delivered-btn"
              onClick={ () => modifyStatus(setPending, id) }
            >
              Marcar como entregue
            </S.ConfirmButton>
          </S.ContentRight>
        </S.Content>
      )}

    </S.Container>
  );
};
export default CardAdminDetails;
