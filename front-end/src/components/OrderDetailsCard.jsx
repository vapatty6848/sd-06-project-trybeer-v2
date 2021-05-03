import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import currencyFormat from '../utils/currencyFormat';
import convertData from '../utils/convertData';
import MenuTop from '../components/MenuTop';

// Material-ui 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function OrderDetailsCard({ orderDetails }) {
  if (orderDetails.length > 0) {
    return (
      <Card style={{textAlign:"center"}}>
        <MenuTop title="TryBeer" />
        <CardContent>

          <Typography data-testid="order-number" color="textSecondary" gutterBottom>
            {`Pedido ${orderDetails[0].saleId}`}
          </Typography>

          <Typography data-testid="order-date" variant="h5" component="h2">
            Data do Pedido:
          {convertData(orderDetails[0].saleDate)}
          </Typography>

          <ProductCard product={orderDetails}/>
          
          <Typography  data-testid="order-total-value" variant="h5" component="h2">
            Status:
            {' '}
            {orderDetails[0].status}
          </Typography>
          <Typography data-testid="order-total-value" variant="h5" component="h2">
            Total do Pedido:
          {' '}
            {currencyFormat(Number(orderDetails.reduce(
              ((acc, cur) => acc + cur.totalPrice), 0,
            )))}
            {' '}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return <p>...loading </p>;
}

OrderDetailsCard.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OrderDetailsCard;
