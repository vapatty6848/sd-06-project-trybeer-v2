import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header/Header';
import { getAdminSaleDetails, fullfilSale } from '../../../services/Sales';
import capitalize from '../../../utils/capitalize';
import { parseCartPrice } from '../../../utils/parseValues';
import './AdminOrdersDetail.css';

export default function AdminOrdersDetail({ match: { params: { id } } }) {
  const [saleDetails, setSaleDetails] = useState({});

  useEffect(() => {
    const fetchSale = async () => {
      const sale = await getAdminSaleDetails(id);
      console.log(sale, 'sale');
      setSaleDetails(sale);
    };
    fetchSale();
  }, [id]);

  const fullfilOrder = async () => {
    const newState = {
      ...saleDetails,
      sale: { ...saleDetails.sale, status: 'entregue' },
    };
    setSaleDetails(newState);
    await fullfilSale(id);
  };

  const { saleProducts, sale } = saleDetails;

  return (

    <div>
      <Header title="TryBeer" user="admin" />
      {saleProducts && (
        <>
          <h1>
            <span data-testid="order-number">
              {`Pedido ${id}`}
            </span>
            <span data-testid="order-status">{sale && capitalize(sale.status)}</span>
          </h1>
          <div className="sale-details">
            <ul>
              {saleProducts.map(({ quantity, name, price }, index) => (
                <li key={ index }>
                  <p data-testid={ `${index}-product-qtd` }>
                    {quantity}
                  </p>
                  <p data-testid={ `${index}-product-name` }>
                    {name}
                  </p>
                  <p data-testid={ `${index}-order-unit-price` }>
                    {`(${parseCartPrice(price)})`}
                  </p>
                  <p data-testid={ `${index}-product-total-value` }>
                    {parseCartPrice(price * quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <h2 data-testid="order-total-value">
              {sale && parseCartPrice(sale.total_price)}
            </h2>
          </div>
          {sale && sale.status === 'pendente' && (
            <button
              type="button"
              data-testid="mark-as-delivered-btn"
              onClick={ fullfilOrder }
            >
              Marcar como entregue
            </button>
          )}
        </>
      )}
    </div>
  );
}

AdminOrdersDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
