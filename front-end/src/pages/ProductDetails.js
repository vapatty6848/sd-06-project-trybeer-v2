import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import DetailCard from '../components/DetailCard';
import MenuTop from '../components/MenuTop';
import { getSaleByID } from '../services/salesServices';

function ProductDetails({ match }) {
  const history = useHistory();

  const { id } = match.params;
  const [sale, setSale] = useState([]);
  const [date, setDate] = useState('');
  const [total, setTotal] = useState('');

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));

    if (!storageUser) {
      history.push('/login');
    }
  };

  const handle = (result) => {
    const five = 5;
    const minusfourteen = -14;
    if (result.length > 0) {
      setTotal(result[0].total);
      let correctDate = result[0].saleDate.slice(five, minusfourteen);
      const arrayDate = correctDate.split('-');
      correctDate = `${arrayDate[1]}/${arrayDate[0]}`;
      setDate(correctDate);
    }
  };

  const getSale = async () => {
    const result = await getSaleByID(id);
    setSale(result);
    handle(result);
  };

  useEffect(() => {
    auxFunc();
    getSale();
  }, []);

  return (
    <div>
      <MenuTop title="Detalhes de Pedido" />
      <div className="checkout-container">
        <div className="order-head-info">
          <p className="order-number" data-testid="order-number">{`Pedido ${id}`}</p>
          <p className="order-date" data-testid="order-date">{date}</p>
          {sale.length > 0 ? <p>{sale[0].Status}</p> : null}
        </div>
        { sale.map((prod, index) => (
          <DetailCard
            key={ index }
            index={ index }
            quantity={ prod.quantidade }
            name={ prod.product }
            price={ prod.price }
          />)) }
        <p
          className="total-checkout"
          data-testid="order-total-value"
        >
          {`Total: R$ ${total.replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default ProductDetails;
