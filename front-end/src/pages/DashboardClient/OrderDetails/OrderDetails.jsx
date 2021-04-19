import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import './OrderDetails.css';
import { getSalesById } from '../../../services/Sales';
import { correctDate, parseCartPrice } from '../../../utils/parseValues';
import { verifyUser } from '../../../store/LocalStorage/actions';

/**
 * Soma o total do pedido (quantidade * preco)
 * @param {String} products
 * @returns String contendo a soma dos itens teste teste
 */
const soma = (products) => {
  let totalVenda = 0;
  products.forEach((e) => {
    totalVenda += Number(e.quantity) * Number(e.price);
  });
  return totalVenda;
};

export default function Orders({ match: { params: { id } } }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
  }, [history]);

  useEffect(() => {
    const getOrderDetails = async () => {
      const [result] = await getSalesById(id);
      setOrderDetails(result);
    };
    getOrderDetails();
  }, [id]);

  return (
    <div className="body">
      <div>
        <Header title="Detalhes de Pedido" user="client" />
      </div>
      {orderDetails.map((details, index) => (
        <div className="geral" key={ index }>
          { index === 0 && (
            <div className="title">
              <div className="pedido">
                <h2 h2 data-testid="order-number">{`Pedido ${details.idSales}`}</h2>
              </div>
              <div className="data">
                <h2>Data</h2>
                <h2 data-testid="order-date">{ correctDate(details.dateSale) }</h2>
              </div>
            </div>
          )}
          <div className="detalhes" key={ index }>
            <p className="quantidade" data-testid={ `${index}-product-qtd` }>
              { details.quantity }
            </p>
            <p className="nome" data-testid={ `${index}-product-name` }>
              { details.productName }
            </p>
            <p className="preço">{ parseCartPrice(details.price) }</p>
            <p
              className="subtotal"
              data-testid={ `${index}-product-total-value` }
            >
              {
                parseCartPrice(details.quantity * details.price)
              }
            </p>
          </div>
        </div>
      ))}
      <div className="resumo">
        <h2>total</h2>
        <h2 data-testid="order-total-value">
          { parseCartPrice(soma(orderDetails)) }
        </h2>
      </div>
    </div>
  );
}

Orders.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
