import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { HeaderComponent, CostumerOrdersDetailsCardsComponent } from '../components';
import BeersAppContext from '../context/BeersAppContext';
import '../style/CostumerOrderDetails.css';

function CostumerOrdersDetailsPage() {
  const history = useHistory();
  const { id } = useParams();
  const {
    user,
  } = useContext(BeersAppContext);

  if (!user.token) history.push('/login');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    }).then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const totalPrice = orders
    .reduce((total, element) => {
      const price = parseFloat(total) + parseFloat(element.productPrice);
      return price.toFixed(2);
    }, 0);

  const parseDate = (saleDate) => {
    const dateAsString = new Date(saleDate);
    const dateOk = dateAsString.toLocaleDateString('pt-BR');
    const five = 5;
    const justMonthAndYear = dateOk.substring(0, five);
    return justMonthAndYear;
  };

  const date = () => {
    if (orders.length !== 0) {
      const { saleDate } = orders[0];
      return parseDate(saleDate);
    }
    return '';
  };

  const commaAmount = (price) => `${price}`.replace('.', ',');

  return (
    <div>
      <HeaderComponent text="Detalhes de Pedido" id="top-title" />
      <div className="order-list">
        <div className="order-list-title">
          <h1 data-testid="order-number">{`Pedido ${id}`}</h1>
          <h1 data-testid="order-date">{ date() }</h1>
        </div>
        <div className="order-list-list">
          {orders.map((element, index) => (
            <div key={ index }>
              <CostumerOrdersDetailsCardsComponent
                element={ element }
                index={ index }
              />
            </div>
          ))}
        </div>
        <div className="order-list-price">
          <p data-testid="order-total-value">{`Total: R$ ${commaAmount(totalPrice)}`}</p>
        </div>
      </div>
    </div>
  );
}

export default CostumerOrdersDetailsPage;
