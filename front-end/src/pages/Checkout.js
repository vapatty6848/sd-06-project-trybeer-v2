import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { RiTruckFill } from 'react-icons/ri';
import { ProductListItem, TopMenu, AddressForm } from '../components';
import './Checkout.scss';

function Checkout() {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [purchaseMade, isPurchaseMade] = useState(false);
  const history = useHistory();
  const {
    user, cart, getTotalPriceCart, cleanShoppingCart,
  } = useContext(TrybeerContext);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const TITLE_MENU_CHECKOUT = 'Finalizar Pedido';
  const TIME_TO_REDIRECT = 3000;
  const cartHasProducts = cart.length > 0;

  useEffect(() => {
    if (!user.token) {
      history.push('/login');
    }
  }, [cart, setIsFormFilled, history, user.token]);

  const handleCheckOut = async () => {
    const totalValue = getTotalPriceCart();
    const salesTable = {
      totalPrice: totalValue,
      deliveryAddress: street,
      deliveryNumber: number,
      userId: user.id,
      cart,
    };

    await fetchFunctions.post('orders', salesTable);
    isPurchaseMade(true);
    cleanShoppingCart();
    setTimeout(() => history.push('products'), TIME_TO_REDIRECT);
  };

  return (
    <div>
      <TopMenu titleMenu={ TITLE_MENU_CHECKOUT } />
      <br />
      <br />
      <h2 className="products-title">Produtos</h2>
      <div className="product-container">
        {cartHasProducts ? cart.map(({ id, name, quantity, price }, index) => (
          <ProductListItem
            key={ index }
            name={ name }
            index={ index }
            id={ id }
            quantity={ quantity }
            price={ price }
          />
        )) : <h3>Não há produtos no carrinho</h3>}
      </div>
      <p
        data-testid="order-total-value"
        className="total-checkout"
      >
          Total:
          {formatedPrice(getTotalPriceCart())}
      </p>
      <AddressForm
        street={ street }
        number={ number }
        setStreet={ setStreet }
        setNumber={ setNumber }
        setIsFormFilled={ setIsFormFilled }
      />
      <h3>{ purchaseMade ? 'Compra realizada com sucesso!' : ''}</h3>
      <button
        className="checkout-btn"
        type="button"
        data-testid="checkout-finish-btn"
        disabled={ !(isFormFilled && cartHasProducts) }
        onClick={ handleCheckOut }
      >
        Finalizar pedido <RiTruckFill />
      </button>
    </div>
  );
}

export default Checkout;
