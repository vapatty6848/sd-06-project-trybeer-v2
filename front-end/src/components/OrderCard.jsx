import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import convertData from '../utils/convertData';
import currencyFormat from '../utils/currencyFormat';

// Material-ui 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function OrderCard({ order, orderIndex }) {
  const history = useHistory();
  return (
    <Card
      className="card-content"
      data-testid={`${orderIndex}-order-card-container`}
      key={`${orderIndex}`}
      type="button"
      onClick={() => history.push(`/orders/${orderIndex + 1}`)}
    >
      <CardContent>
        <Typography data-testid={`${orderIndex}-order-number`} color="textSecondary" gutterBottom>
          Pedido
          {' '}
          {orderIndex + 1}
        </Typography>
        <Typography data-testid={`${orderIndex}-order-status`} variant="h5" component="h2">
        Status:
          {' '}
        {order.status}
        </Typography>
        <Typography data-testid={`${orderIndex}-order-total-value`} color="textSecondary">
          Valor total:
          {' '}
          {currencyFormat(Number(order.totalPrice))}
        </Typography>
        <Typography data-testid={`${orderIndex}-order-date`} variant="body2" component="p">
          Data:
          {' '}
          {convertData(order.saleDate)}
        </Typography>
      </CardContent>
    </Card>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  orderIndex: PropTypes.number.isRequired,
};
